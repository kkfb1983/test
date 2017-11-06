<?php
/**
 * 抽象数据映射
 *
 */
abstract  class Table{

    public function __call($method, $args) {
        if (preg_match('/^(get|set)(\w+)/', strtolower($method), $match)
            && $attribute = $this->validateAttribute($match[2])) {
            if ('get' == $match[1]) {
                return $this->$attribute;
            } else {
                $this->$attribute = $args[0];
            }
        }else {
            throw new Exception(
                'Call to undefined method ' . __CLASS__  . '::'.$method.'()');
        }
    }

    protected function validateAttribute($method) {
        if ( in_array(strtolower($method), array_keys(get_class_vars(get_class($this))))) {
            return strtolower($method);
        }

    }


}


/**
 * 数据映射到表
 * 一般根据表的结构由工具自动生成，
 * 要不然程序员经常得copy和修改这个类
 *
 */
class UserTable extends Table {
    /**
     * fields
     *
     * @var unknown_type
     */
    protected $uid = null;

    protected $username = null ;

    protected $level = null;

    protected $exp = null;

    protected $ctime = null;

    protected $mtime = null;
    /**
     * table
     *
     * @var unknown_type
     */
    public   $tableName = 'user';

    public  $primaryKey = 'uid';

    public  static $tablefileds = array(
        'uid',
        'username',
        'level',
        'exp',
        'ctime',
        'mtime',
    );

    /**
     * 对象生成数组
     *
     * @return array
     */
    function toArray(){
        $arr = array();
        foreach (UserTable::$tablefileds as $filed) {
            $getMethod  = 'get' .ucwords($filed);
            $value = $this->$getMethod();
            if ($value !== null) {
                $arr[$filed] = $value;
            }
        }
        return $arr;
    }

    /**
     * 数组生成对象
     *
     * @return array
     */
    function toObj($arr){
        if (!$arr) {
            return $this;
        }
        foreach (UserTable::$tablefileds as $filed) {
            $setMethod  = 'set' .ucwords($filed);
            $this->$setMethod($arr[$filed]);
        }
        return $this;
    }
}

/**
 *
 *
 */
class Mapper{

    protected  $conn = null;

    /**
     * 自动插入
     * 不想对某一列插入，把对应的属性设置成null就ok
     *
     * @param Table $table
     * @return unknown
     */
    function save(Table $table){
        $arr  =  $table->toArray();
        $set = '';
        if ($arr) {
            foreach ($arr as $field=> $v) {
                if ($set) $set .=',';
                $set .= $field . "='" . $v ."'";
            }
        }
        if ($set) {
            $this->conn->exec( 'insert into ' . $table->tableName . ' SET ' . $set);
            return $this->conn->getLastId();
        }


    }

    /**
     * 更新
     * 不想对某一列更新，把对应的属性设置成null就ok
     *
     * @param Table $table
     * @return unknown
     */
    function update(Table $table){
        $arr  =  $table->toArray();
        $set = '';
        if ($arr) {
            foreach ($arr as $field=> $v) {
                if ($set) $set .=',';
                $set .= $field . "='" . $v ."'";
            }
        }
        $primayGet = 'get'.ucwords($table->primaryKey);
        if ($set) {
            return $this->conn->exec( 'update ' . $table->tableName . ' SET ' . $set . ' where ' . $table->primaryKey ."='" . $table->$primayGet() . "'" );
        }
    }


}
class UserMapper extends Mapper {

    const INSERT_SQL = "insert into user (username, level,exp, ctime, mtime) values (:username, :level, :exp, now(), now())";
    const UPDATE_SQL = "update user SET username=:username, level=:level, exp=:exp WHERE uid=:uid ";
    const SELECT_SQL = "select * from user  WHERE uid=:uid ";
    const DELETE_SQL = "delete from user  WHERE uid=:uid ";

    function __construct(){
        $this->conn =  Db::getInstance();
    }
    /**
     * 我们可以实现覆盖save
     *
     * @param unknown_type $userTable
     */
    public function save2($userTable) {
        $rs =  Db::getInstance()->executeArr( self::INSERT_SQL, $userTable->toArray());
        return $rs;
    }

    /**
     * Enter description here...
     *
     * @param unknown_type $userTable
     */
    public function update2($userTable) {
        return $this->conn->execute(self::UPDATE_SQL, $userTable->toArray());
    }

    /**
     * Enter description here...
     *
     * @param unknown_type $arr
     */
    public function find($userTable) {
        $rs = $this->conn->executeAsoc( self::SELECT_SQL, $userTable->toArray());
        return $rs ? $userTable->toObj($rs[0]) : $userTable;
    }
}