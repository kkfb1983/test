<?php
define('DB_TYPE','mysql');					// 数据库类型
define('DB_HOST','localhost');				// 数据库服务器地址
define('DB_HOST_MAIN','localhost');				// 数据库服务器地址
define('DB_NAME','hotel');			// 数据库名
define('DB_USER','root');					// 数据库用户名
define('DB_PWD','');						// 数据库密码
define('DB_PREFIX','myshow_');			// 数据库表前缀
define('DB_CHARSET','utf8');				// 数据库编码
/**
 * 数据操作对象
 * @author Ejx
 */
class mydb {
    //变量
    private $_db;
    private $_sql;
    private $_db_main;
    static $_instance;
    private $_inset = "INSERT INTO %s(%s) VALUES(%s)";
    private $_update = "UPDATE %s SET %s WHERE %s";
    private $_delete = "DELETE FROM %s WHERE %s";
    /**
     * 构造方法
     */
    private function __construct() {
    	try {
    		$this->_db = new PDO ( 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PWD );
    		$this->_db_main = new PDO ( 'mysql:host=' . DB_HOST_MAIN . ';dbname=' . DB_NAME, DB_USER, DB_PWD );
    		$this->_db->exec ( "SET NAMES " . DB_CHARSET . ";" );
			$this->_db_main->exec ( "SET NAMES " . DB_CHARSET . ";" );
    	} catch (PDOException $e) {
    		echo 'Connection failed: ' . $e->getMessage();
    	}
		
	}
    /**
     * 克降方法
     */
    private function __clone(){}
    
    public static function getInstance() {
        if( ! (self::$_instance instanceof self) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    /**
     * 数据查询方法
     * @param 字段 $field
     * @param 表名 $table
     * @param 条件 $where
     * @param 关连表 $join
     */
    public function find($table=Null, $where=Null, $field='*', $join=Null, $order=Null) {
    	$this->_sql = "select ".$field." from";
    	if(empty($table)){
    		$result = "请正确添加参数";
    	}else{
    		$this->_sql .= " ".DB_PREFIX.$table;
    		if(!empty($join)){
    			$this->_sql .= " ".$join;
    		}
    		if(!empty($where)){
    			$this->_sql .= " where ".$where;
    		}
    		if(!empty($order)){
    			$this->_sql .= " ORDER BY ".$order;
    		}
    		$prepareObj = $this->_db->prepare($this->_sql);
    		$prepareObj->execute();
    		$result = $prepareObj->fetch(PDO::FETCH_ASSOC);
    	}
    	return $result;
    }
    /**
     * 数据查询方法
     * @param 字段 $field
     * @param 表名 $table
     * @param 条件 $where
     * @param order排序 $order
     * @param group排序 $group
     * @param 分页条件 $limit
     */
    public function query($table=Null, $where=Null, $field='*', $order=Null, $group=Null, $limit=Null, $join=Null) {
    	$this->_sql = "select ".$field." from";
    	if(empty($table)){
    		$result = "请正确添加参数";
    	}else{
    		$this->_sql .= " ".DB_PREFIX.$table;
    		if(!empty($join)){
    			$this->_sql .= " ".$join;
    		}
    		if(!empty($where)){
    			$this->_sql .= " where ".$where;
    		}
    		if(!empty($group)){
    			$this->_sql .= " GROUP BY ".$group;
    		}
    		if(!empty($order)){
    			$this->_sql .= " ORDER BY ".$order;
    		}
    		if(!empty($limit)){
    			$this->_sql .= " LIMIT ".implode(',', $limit);
    		}
    		$prepareObj = $this->_db->prepare($this->_sql);
	    	$prepareObj->execute();
	    	$result = $prepareObj->fetchAll(PDO::FETCH_ASSOC);
    	}
    	return $result;
    }
    /**
     * 数据总数查询方法
     * @param 字段 $field
     * @param 表名 $table
     * @param 条件 $where
     */
    public function count($table=Null, $where=Null, $field='*', $join=Null){
    	$result = 0;
    	$this->_sql = "select COUNT(".DB_PREFIX.$table.'.'.$field.") as Number from";
    	if(empty($table)){
    		$result = 0;
    	}else{
    		$this->_sql .= " ".DB_PREFIX.$table;
    		if(!empty($join)){
    			$this->_sql .= " ".$join;
    		}
    		if(!empty($where)){
    			$this->_sql .= " where ".$where;
    		}
    		$prepareObj = $this->_db->prepare($this->_sql);
	    	$prepareObj->execute();
	    	$coutn = $prepareObj->fetchAll(PDO::FETCH_ASSOC);
	    	if(is_numeric($coutn[0]['Number'])){
	    		$result = $coutn[0]['Number'];
	    	}
    	}
    	return $result;
    }
    /**
     * 添加数据
     * @param 表名 $table
     * @param 字段数组 $fieldArr
     */
    public function save($table=Null, $fieldArr=null){
    	$result = "";
    	if(empty($fieldArr) && empty($table)){
    		$result = "请正确添加参数";
    	}else{
    		$value  = array();
    		$key	= array();
    		foreach ($fieldArr as $keys => $val){
    			$key[]   = $keys;
    			$value[] = $val; 
    		}
    		if(!empty($key) && !empty($value)){
    			$this->_sql = "";
    			$this->_sql = sprintf($this->_inset, DB_PREFIX.$table, implode(",", $key), '"'.implode('","', $value).'"');
    		}else{
    			$result = "请正确添加参数";
    		}
    		if(empty($result)){
    			$this->_db_main->exec($this->_sql);
    			$result = $this->_db_main->lastInsertId();
    		}
    	}
    	return $result;
    }
    /**
     * 修改数据
     * @param 表名 $table
     * @param 字段数组 $fieldArr
     * @param 条件 $where
     */
    public function edit($table=Null, $fieldArr=Null, $where=Null){
    	$result = "";
    	if(empty($fieldArr) && empty($table)){
    		$result = "请正确添加参数";
    	}else{
    		foreach ($fieldArr as $key=>$val){
    			if(is_numeric($val)){
    				$values = "". $val ."";
    			}else{
    				$values = "'". $val ."'";
    			}
    			@$fild[] = $key ."=". $values;
    		}
    		$fildSet = @implode(",", $fild);
	    	if(!empty($where)){
	    		$this->_sql .= "where ".$where;
	    	}
    		$this->_sql = sprintf($this->_update, DB_PREFIX.$table, $fildSet, $where); 
    	}
    	if(empty($result)){
    		$result = $this->_db_main->exec($this->_sql);
    	}
    	return $result;
    }
    /**
     * 清除数据
     * @param 表名 $table
     * @param 条件 $where
     */
    public function delete($table=Null, $where=Null){
    	$result = "";
    	if(empty($fieldArr) && empty($table)){
    		$result = "请正确添加参数";
    	}else{
	    	if(!empty($where)){
	    		$this->_sql .= "where ".$where;
	    	}
    		$this->_sql = sprintf($this->_delete, DB_PREFIX.$table, $where); 
    	}
    	if(empty($result)){
    		$result = $this->_db_main->exec($this->_sql);
    	}
    	return $result;
    }
    /**
     * 返回SQL语句
     */
    public function getSql(){
    	return $this->_sql;
    }
}

?>
