<?php

/*********************************************************
* DB extends class
* connect to primary database & slave database
*
*	liuyang
*	liuyang5@staff.sina.com.cn
**********************************************************/
//require_once("D:/AppServ/config/allvic/config.php");
require_once ('MDB2.php');

//Connecting primary database;
/*function &open_pdb()
{
$dsn = array(
'phptype'  => "mysql",
'username' => $_SERVER['SINASRV_DB3_USER'],
'password' => $_SERVER['SINASRV_DB3_PASS'],
'hostspec' => $_SERVER['SINASRV_DB3_HOST'],
'port'     => $_SERVER['SINASRV_DB3_PORT'],
'database' => $_SERVER['SINASRV_DB3_NAME'],
);
$db = MDB2::connect($dsn);
//      $db->query("SET NAMES 'utf8'");
if(MDB2::isError($db))
{
die($db->getMessage());
}
return $db;
}
*/
//Connecting slave database;
/*function &open_sdb()
{
$dsn = array(
'phptype'  => "mysql",
'username' => $_SERVER['SINASRV_DB3_USER_R'],
'password' => $_SERVER['SINASRV_DB3_PASS_R'],
'hostspec' => $_SERVER['SINASRV_DB3_HOST_R'],
'port'     => $_SERVER['SINASRV_DB3_PORT_R'],
'database' => $_SERVER['SINASRV_DB3_NAME_R'],
);
$db = MDB2::connect($dsn);
//      $db->query("SET NAMES 'utf8'");
if(MDB2::isError($db))
{
die($db->getMessage());
}
return $db;
}*/
function &open_sdb()
{
    $dsn = array('phptype' => "mysql", 'username' => 'root', 'password' => '',
        'hostspec' => 'localhost', 'port' => '3306', 'database' => '201208hotel', );
    $db = MDB2::connect($dsn);
    $db->query("SET NAMES 'utf8'");
    if(MDB2::isError($db))
    {
        die($db->getMessage());
    }
    return $db;
}
function &open_pdb()
{
    $dsn = array('phptype' => "mysql", 'username' => 'root', 'password' => '',
        'hostspec' => 'localhost', 'port' => '3306', 'database' => '201208hotel', );
    $db = MDB2::connect($dsn);
    $db->query("SET NAMES 'utf8'");
    if(MDB2::isError($db))
    {
        die($db->getMessage());
    }
    return $db;
}
//Disconnecting a database
function close_db(&$dbh)
{
    if(is_object($dbh))
    {
        $dbh->disconnect();
        $dbh = "";
    }
}

?>