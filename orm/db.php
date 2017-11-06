<?php
/**
 * Filename:db.class.php
 *
 * db class ,use PDO lib
 *
 * @author guisu.huang
 * @version 1.0
 *
 */
class Db {
    public static $db = null;
    private $_dbh = null;
    public static function getInstance()
    {
        if( self::$db == null ){
            self::$db = new self(BACKEND_DBHOST ,BACKEND_DBUSER ,BACKEND_DBPW ,BACKEND_DBNAME);
        }
        return self::$db;

    }

    private function __construct( $host ,$user ,$pass ,$dbname ){
        try {
            $this->_dbh = new PDO('mysql:dbname='.$dbname.';host='.$host,$user,$pass);
            $this->_dbh->query('SET NAMES '. BACKEND_DBCHARSET);
            $this->_dbh->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, true);
            $this->_dbh->setAttribute(PDO::ATTR_ERRMODE, true);
        } catch (PDOException $e) {
            throw new Exception('Can not connect db');
        }
    }

    private function getExecuteResult($sql, $sth){
        $type = strtolower(substr(trim($sql), 0,6));
        switch ($type) {
            case 'update': case 'delete':
            $result = $sth->rowcount();//返回影响的行数
            break;
            case 'insert':
                $result = $this->getLastId();
                break;
            case 'select':
                $result = $sth->fetchAll(PDO::FETCH_ASSOC);
                break;
            default:
                break;
        }
        return $result;
    }

    /**************************************sql ************************/

    public function getOne($sql){
        try {
            $rs = $this->_dbh->query($sql);
            $result = $rs->fetch(PDO::FETCH_ASSOC);
            if(!empty($result)) {
                return $result;
            }
        } catch (PDOException $e) {
            throw new Exception($this->_dbh->errorInfo());
        }
        return false;
    }

    public function getAll($sql){
        try {
            $rs = $this->_dbh->query($sql);
            $result = $rs->fetchAll(PDO::FETCH_ASSOC);
            if(!empty($result)) {
                return $result;
            }
        } catch (PDOException $e) {
            throw new Exception($this->_dbh->errorInfo());
        }
        return false;
    }

    public function exec($sql){
        try {
            $exec = $this->_dbh->exec($sql);
        } catch (PDOException $e){
            throw new Exception($this->_dbh->errorInfo());
        }
        return $exec;

    }
    /**
     * 不关注键值
     *  Execute a prepared statement by passing an array of values
    $sth = $dbh->prepare('SELECT name, colour, calories
    FROM fruit
    WHERE calories < ? AND colour = ?');
    $sth->execute(array(150, 'red'));
    $red = $sth->fetchAll();
    $sth->execute(array(175, 'yellow'));
    $yellow = $sth->fetchAll();

     * @param unknown_type $sql
     * @param unknown_type $arr
     * @return unknown
     */
    public function executeArr($sql, $arr){
        try {
            $sth = $this->_dbh->prepare($sql);
            $r = $sth->execute($arr);
            if ($r) {
                return  $this->getExecuteResult($sql, $sth);
            }
        } catch (PDOException $e){
            throw new Exception($e->getMessage() . $this->_dbh->errorInfo());
        }
    }
    /**
     * 关联数组:
     *  Execute a prepared statement by passing an array of values
    $sql = 'SELECT name, colour, calories
    FROM fruit
    WHERE calories < :calories AND colour = :colour';
    $sth = $dbh->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $sth->execute(array(':calories' => 150, ':colour' => 'red'));
    $red = $sth->fetchAll();
     *
     * @param unknown_type $sql
     * @param unknown_type $arr
     * @return unknown
     */
    public function executeAsoc($sql, $arr){
        try {
            $array = array();
            if ($arr) {
                foreach ($arr as $key=>$v) {
                    if (strpos($sql, ':' . $key )!==false) {
                        $array[':' . $key] = $v;
                    }
                }
            }
            $sth = $this->_dbh->prepare($sql);
            $r = $sth->execute($array);
            if ($r) {
                return  $this->getExecuteResult($sql, $sth);
            }
        } catch (PDOException $e){
            throw new Exception($e->getMessage() . $this->_dbh->errorInfo());
        }
    }

    public function beginTransaction(){
        return $this->_dbh->beginTransaction();
    }

    public function commit(){
        return $this->_dbh->commit();
    }

    public function rollBack(){
        return $this->_dbh->rollBack();
    }

    public function getLastId()
    {
        return $this->_dbh->lastInsertId();
    }



}

?> 