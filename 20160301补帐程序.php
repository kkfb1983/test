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
    private $_date = '2016-03-01';
    function __construct() {
        parent::__construct ();
        $this->_db = Core::getPdb();
        $this->_debug = true;
        $this->_userId = "521,812,882,887,904,3109,3314,3588,14894,15900,15999,17636,17907,18782,18841,19315,19371,19723,19809,19861,20240,21922,21954,23042,23747,24658,25164,25278,25367,25412,26944,27918,27977,28142,29402,30280,30294,30448,30775,31104,31105,31106,31194,31195,31365,31437,31559,31671,31852,32348,32832,32854,33882,34085,34176,34862,35800,36218,36899,37463,37498,37667,37942,38319,39176,39731,40136,40829,41287,41599,42198,42550,43341,43352,43483,43601";
    }
    function run() {
        self::logs('++++++++++++ begin '.date('Y-m-d H:i:s').' +++++++++++++');
        // 2016-03-01 跑未结算的收入
        // payeeuid in(521,812,882,887,904,3109,3314,3588,9622,14894,15900,15999,17636,17681,17907,18782,18841,19315,19371,19723,19809,19814,19861,20240,21922,21954,23042,23747,24658,25164,25278,25367,25412,26944,27918,27977,28142,29402,30280,30294,30448,30775,31104,31105,31106,31194,31195,31365,31437,31559,31671,31852,32348,32832,32854,33882,34085,34176,34862,35800,36218,36899,37463,37498,37667,37942,38319,39176,39731,40136,40829,41287,41599,41947,42198,42550,43341,43352,43483,43601)
        self::exec20160301();
        self::logs('++++++++++++ end '.date('Y-m-d H:i:s').' +++++++++++++');
    }
    function exec20160301(){
        $incomeArr = self::getOrderIncome('weiq_order_income','id,payeeuid,round(sum(income)*0.7) as total_price '); // 读取20160301号未结数据\
        if(!empty($incomeArr)){
            foreach($incomeArr as $key=>$val){
                self::logs("order income({$val['payeeuid']}):".json_encode($val));
                try {
                    $this->_db->beginTransaction (); // 开启事务处理
                    $userInfo = array();
                    $userInfo = self::getUserInfo($val['payeeuid']);
                    $dailyInfo = self::getPayDailyInfo($val['payeeuid']);
                    $cptAccountMediaInfo = self::getCptAccountMediaInfo($val['payeeuid']);
                    if(empty($userInfo)){
                        throw new Exception ("is not userid".$val['payeeuid']);
                    }
                    // 处理帐户余额
                    self::upUserBalance($val,$userInfo);
                    // 处理日结
                    if(empty($dailyInfo)){
                        $newPayDailyId = self::setPayDaily($val,$userInfo);
                    }else{
                        self::upPayDaily($this->_daily,$val,$dailyInfo);
                    }
                    if(empty($cptAccountMediaInfo)){
                        self::setCptLog($val,$userInfo,$newPayDailyId);
                    }else{
                        self::upCptLog($val,$cptAccountMediaInfo);
                    }
                    self::upOrderIncome($val['payeeuid'],$this->_date);
                    $this->_db->commit();
//                    if(empty($dailyInfo)) {
//                        // 修改写入流水日结ID问题
//                        $dailyArr = self::getPayDailyInfo($val['payeeuid']);
//                        self::upCptLogPayDailyId($val,$dailyArr);
//                    }
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
     * 更新未提现
     * @param array $param
     */
    private function upUserBalance($param=array(),$userInfo=array()){
        if(!empty($param)){
            $set = array('recharge'=>$param['total_price']+$userInfo['recharge'],'balance'=>$param['total_price']+$userInfo['balance']);
            $where = 'id='.$param['payeeuid'];
            $result = self::edit($this->_user,$set,$where);
        }
    }

    /**
     * 日结详细
     * @param $date
     * @param $payeeuid
     * @return mixed
     */
    private function getPayDailyInfo($payeeuid=0){
        return self::fetch($this->_daily,'*',"payeeuid={$payeeuid} and paydate='{$this->_date}'");
    }
    /**
     * 更新未提现
     * @param array $param
     */
    private function upPayDaily($tbl='',$param=array(),$payDailyArr=array()){
        $set = array('payee_fee'=>$payDailyArr['payee_fee']+$param['total_price']);
        $where = 'id in('.$payDailyArr['id'].')';
        $result = self::edit($tbl,$set,$where);
    }
    /**
     * 写入用户日结表
     * @param array $payDailyArr
     */
    private function setPayDaily($payDailyArr=array(),$payeeUserInfo){
        $set = array();
        // 获取接单人信息
        if(!empty($payeeUserInfo)){
            $set = array(
                "payeeuid" => $payeeUserInfo['id'],                     // 用户ID
                "paydate" => $this->_date,                              // 结算日期
                "payee_fee" => $payDailyArr['total_price'],                          // 帐号实收
                "payee_id" => $payeeUserInfo['idcard']                  // 帐号身份证号
            );
            // 写入用户日结表
            return self::save($this->_daily,$set);
        }
    }
    /**
     * 记录收入日志
     * @param array $param
     * @param array $userInfo
     * @param int $source
     */
    private function setCptLog($param=array(),$userInfo=array(),$dailyId=0){
        $set = array(
            'userid' => $param['payeeuid'],  // 自媒体主编号，weiq_user
            'paydate' => $this->_date,     // 操作日期,
            'createtime' => time(),         // 操作时间
            'sourcetype' => 1,         // 收入来源类型，默认：0,1：任务广场收入,2：cpt微信收入,3：cpt微博收入,4：cpt朋友圈收入,5：cpm收入
            'recharge' => $userInfo['recharge'],                  // 总的收入(本操作前)：分
            'balance' => $userInfo['balance'],                  // 余额（本操作前）：分
            'fee' => $param['total_price'],                  // 本次操作金额：分
            'sourceone' => $dailyId
        );
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
            'fee' => $cptMediaLogArr['fee']+$param['total_price']
        );
        $where = 'userid = '.$param['payeeuid'].' and sourcetype=1 and paydate="'.$this->_date.'"';
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
            $result = self::fetch($this->_user,'id,username,alipay,alipay_name,agent,idcard,recharge,balance,freeze',"id={$userId}");
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
        return self::fetch($this->_cptMediaAccountLog,'*',"userid={$userId} and paydate='{$paydate}'");
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
            self::logs($_sql);
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
                self::logs($_sql);
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
    /**
     * 20160301未结列表
     * @param string $table
     * @param string $filed
     * @param string $limit
     * @return array
     */
    private function getOrderIncome($table='', $filed='*', $limit=''){
        $result = array();
        $_sql = '';
        $_sql .= 'select ';
        $_sql .= $filed;
        $_sql .= 'from '.$table.' ';
            $_sql .= "where payeeuid in({$this->_userId}) and paytime = 0 and feedday='2016-03-01' ";
        $_sql .= ' group by payeeuid ';
        self::logs($_sql);
        $stmt = $this->_db->query ( $_sql );
        $result = $stmt->fetchAll ( PDO::FETCH_ASSOC );
        return $result;
    }
    /**
     * 记录详细
     * @param $date
     * @param $payeeuid
     * @return mixed
     */
    private function getCptAccountMediaInfo($payeeuid=0){
        return self::fetch($this->_cptMediaAccountLog,'*',"userid={$payeeuid} and paydate='{$this->_date}'");
    }

    /**
     * 修正CPT流水表中日结ID无法写入
     * @param $param
     * @param $dailyArr
     */
    private function upCptLogPayDailyId($param,$dailyArr){
        $set = array(
            'sourceone' => $dailyArr['id']
        );
        $where = 'userid = '.$param['payeeuid'].' and sourcetype=1 and paydate="'.$this->_date.'"';
        self::edit($this->_cptMediaAccountLog,$set,$where);
    }
}

//$main = new Main();
//$main->run();