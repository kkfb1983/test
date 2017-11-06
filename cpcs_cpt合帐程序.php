<?php
/**
 * crontab test files
 */
require_once dirname ( __FILE__ ) . '/crontab_base.php';
class Main extends Crontab_Base {
    private $_db;
    private $_user = "weiq_user";
    private $_activity = "weiq_activity_income";
    private $_daily = "weiq_pay_daily";
    private $_cptMediaAccountLog = "weiq_cpt_mediaaccountlog";
    private $_orderIncome = "weiq_order_income";
    private $_userBalanceIncome;
    private $_debug;
    private $_userId;
    function __construct() {
        parent::__construct ();
        $this->_db = Core::getPdb();
        $this->_debug = false;
        $this->_userId = "39124,725,24658,518";
    }
    function run() {
        self::logs('++++++++++++ begin '.date('Y-m-d H:i:s').' +++++++++++++');
        // 活动收入
        self::execActivity();
        // CPCS收入
        self::execDaily();
        self::logs('++++++++++++ end '.date('Y-m-d H:i:s').' +++++++++++++');
    }
    /**
     * 写入活动收入
     */
    private function execActivity(){
        $incomeArr = self::getUserIncome($this->_activity,'paydate,paystatus,payeeuid,income as fee_total,id as ids ');
        if(!empty($incomeArr)){
            foreach($incomeArr as $key=>$val){
                try {
                    $this->_db->beginTransaction (); // 开启事务处理
                    $userInfo = array();
                        $userInfo = self::getUserInfo($val['payeeuid']);
                        if(empty($userInfo)){
                            throw new Exception ("is not userid".$val['payeeuid']);
                        }
                        if($val['paystatus'] != 'S'){
                            self::upUserBalance($val,$userInfo);
                        }else{
                            self::upUserFreeze($val,$userInfo);
                        }
                        self::upPayStatus($this->_activity,$val);
                        $mediaLogArr = self::getCptMediaLog($val['payeeuid'],$val['paydate']);
                        if(empty($mediaLogArr)){
                            self::setCptLog($val,$userInfo,6);    // add activity log
                        }else{
                            self::upCptLog($val,$mediaLogArr);  // update activity log
                        }
                    self::logs("activity income({$val['payeeuid']}):".json_encode($val));
                    $this->_db->commit();
                } catch ( PDOException $e ) {
                    $this->_db->rollBack ();  //回滚事务
                    $this->logs($e->getMessage().' line:'.$e->getLine());
                } catch ( Exception $e){
                    $this->_db->rollBack ();
                    $this->logs($e->getMessage());
                }
            }
        }

    }
    /**
     * 写入订单收入
     */
    private function execDaily(){
        $incomeArr = self::getUserIncome($this->_daily,'paydate,paystatus,payeeuid,payee_fee as fee_total,id as ids ');
        if(!empty($incomeArr)){
            foreach($incomeArr as $key=>$val){
                try {
                    $this->_db->beginTransaction (); // 开启事务处理
                    $userInfo = array();
                        $userInfo = self::getUserInfo($val['payeeuid']);
                        if(empty($userInfo)){
                            throw new Exception ("is not userid".$val['payeeuid']);
                        }
                        if($val['paystatus'] != 'S'){
                            self::upUserBalance($val,$userInfo);
                        }else{
                            self::upUserFreeze($val,$userInfo);
                        }
                        self::upPayStatus($this->_daily,$val);
                        self::setCptLog($val,$userInfo,1);
                        self::upOrderIncome($val['payeeuid'],$val['paydate']);
                    $this->_db->commit();
                    self::logs("order income({$val['payeeuid']}):".json_encode($val));
                } catch ( PDOException $e ) {
                    $this->_db->rollBack ();  //回滚事务
                    $this->logs($e->getMessage().' line:'.$e->getLine());
                } catch ( Exception $e){
                    $this->_db->rollBack ();
                    $this->logs($e->getMessage());
                }
            }
        }
    }
    /**
     * 获取收入列表
     * @param string $table
     * @param string $filed
     * @param string $limit
     * @return array
     */
    private function getUserIncome($table='', $filed='*', $limit=''){
        $result = array();
        $_sql = '';
        $_sql .= 'select ';
        $_sql .= $filed;
        $_sql .= 'from '.$table.' ';
        if($this->_debug){
            $_sql .= "where payeeuid in({$this->_userId}) ";
        }else{
            $_sql .= "where payeeuid not in({$this->_userId}) ";
        }
        $stmt = $this->_db->query ( $_sql );
        $result = $stmt->fetchAll ( PDO::FETCH_ASSOC );
        return $result;
    }

    /**
     * 更新未提现
     * @param array $param
     */
    private function upUserBalance($param=array(),$userInfo=array()){
        if(!empty($param)){
            $set = array('recharge'=>$param['fee_total']+$userInfo['recharge'],'balance'=>$param['fee_total']+$userInfo['balance']);
            $where = 'id='.$param['payeeuid'];
            $result = self::edit($this->_user,$set,$where);
        }
    }
    /**
     * 更新已提现
     * @param array $param
     */
    private function upUserFreeze($param=array(),$userInfo=array()){
        if(!empty($param)){
            $set = array('recharge'=>$param['fee_total']+$userInfo['recharge'],'freeze'=>$param['fee_total']+$userInfo['freeze']);
            $where = 'id='.$param['payeeuid'];
            $result = self::edit($this->_user,$set,$where);
        }
    }
    /**
     * 更新未提现
     * @param array $param
     */
    private function upPayStatus($tbl='',$param=array()){
        if(!empty($tbl) && !empty($param)){
            $set = array('auditstatus'=>2,'paystatus'=>'S');
            $where = 'id in('.$param['ids'].')';
            $result = self::edit($tbl,$set,$where);
        }
    }

    /**
     * 记录收入日志
     * @param array $param
     * @param array $userInfo
     * @param int $source
     */
    private function setCptLog($param=array(),$userInfo=array(),$source=1){
        $set = array(
            'userid' => $param['payeeuid'],  // 自媒体主编号，weiq_user
            'paydate' => $param['paydate'],     // 操作日期,
            'createtime' => time(),         // 操作时间
            'sourcetype' => $source,         // 收入来源类型，默认：0,1：任务广场收入,2：cpt微信收入,3：cpt微博收入,4：cpt朋友圈收入,5：cpm收入
            'recharge' => $userInfo['recharge'],                  // 总的收入(本操作前)：分
            'balance' => $userInfo['balance'],                  // 余额（本操作前）：分
            'fee' => $param['fee_total']                   // 本次操作金额：分
        );
        if($source == 1){
            $set['sourceone'] = $param['ids'];
        }else{
            $set['sourcethree'] = $param['ids'];
        }
        self::save($this->_cptMediaAccountLog,$set);
    }
    /**
     * 更新记录收入日志
     * @param array $param
     * @param array $userInfo
     * @param int $source
     */
    private function upCptLog($param=array(),$cptMediaLogArr=array()){
        $set = array(
            'fee' => $cptMediaLogArr['fee']+$param['fee_total'],                   // 本次操作金额：分
            'sourcethree'=> $cptMediaLogArr['sourcethree'].','.$param['ids']
        );
        $where = 'userid = '.$param['payeeuid'].' and sourcetype=6 and paydate="'.$param['paydate'].'"';
        self::edit($this->_cptMediaAccountLog,$set,$where);
    }
    /**
     * 更新每日收入支付状态
     * @param int $userId
     */
    private function upOrderIncome($userId=0,$paydate=''){
        if(!empty($userId)){
            $set = array('paytime'=>time(),'paystatus'=>2);
            $where = "payeeuid={$userId} and paystatus != 2 and feedday='{$paydate}'";
            $result = self::edit($this->_orderIncome,$set,$where);
        }
    }

    /**
     * 用户详细信息
     * @param int $userId
     * @return array|mixed
     */
    private function getUserInfo($userId=0){
        $result = array();
        if(!empty($userId)){
            $result = self::fetch($this->_user,'recharge,balance,freeze',"id={$userId}");
        }
        return $result;
    }

    /**
     * 获取帐户日期下活动收入日志
     * @param int $userId
     * @param string $paydate
     * @return mixed
     *
     */
    private function getCptMediaLog($userId=0,$paydate=''){
        return self::fetch($this->_cptMediaAccountLog,'*',"userid={$userId} and paydate={$paydate}");
    }
    /**
     * 查询详细
     * @param string $table
     * @param string $filed
     * @param string $where
     * @param string $order
     * @return mixed
     */
    private function fetch ($table='', $filed='*', $where='1'){
        $result = array();
        $_select = "SELECT %s FROM %s WHERE %s ";
        $_sql = sprintf($_select, $filed, $table, $where);
        $stmt = $this->_db->query ( $_sql );
        $result = $stmt->fetch ( PDO::FETCH_ASSOC );
        return $result;
    }
    /**
     * 修改数据
     * @param 表名 $table
     * @param 字段数组 $fieldArr
     * @param 条件 $where
     */
    private function edit($table='', $fieldArr='', $where=''){
        $result = 0;
        $_update = "UPDATE %s SET %s WHERE %s";
        if(!empty($fieldArr) && !empty($table)){
            foreach ($fieldArr as $key=>$val){
                $values = is_numeric($val) ? $val : "'". $val ."'";
                @$fild[] = $key ."=". $values;
            }
            $fildSet = @implode(",", $fild);
            $_sql = sprintf($_update, $table, $fildSet, $where);
            $result = $this->_db->exec($_sql);
        }
        return $result;
    }
    /**
     *  插入数据
     * @param array $data 数据的键值对
     * @param string $tbl 表名
     * @return array array('err'=>int, 'data'=>int) <br/>
     * err 表示成功与否 0-OK，非零表示失败 <br/>
     * data 如果插入成功，返回新增的id（如果有）
     */
    private function save($tbl, $fieldArr) {
        $result = 0;
        $_inset = "INSERT INTO %s(%s) VALUES(%s)";
        if(!empty($fieldArr) && !empty($tbl)){
            $value  = array();
            $key	= array();
            foreach ($fieldArr as $keys => $val){
                $key[]   = $keys;
                $value[] = $val;
            }
            if(!empty($key) && !empty($value)){
                $_sql = sprintf($_inset, $tbl, implode(",", $key), '"'.implode('","', $value).'"');
                $result = $this->_db->exec($_sql);
            }
        }
        $result = $this->_db->lastInsertId();
        return $result;
    }
    /**
     * 打印日志
     * @param $params
     */
    private function logs($params){
        if(is_array($params)){
            echo json_encode($params).PHP_EOL;
        }else{
            echo $params.PHP_EOL;
        }
    }
}

$main = new Main();
$main->run();