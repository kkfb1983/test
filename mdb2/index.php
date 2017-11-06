<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<?php

require_once("MDB2.php");

$m = new MDB2(); //实例化
$m->raiseError(); //这样调用

$dsn = array('phptype' => "mysql", 'username' => 'root', 'password' => '',
        'hostspec' => 'localhost', 'port' => '3306', 'database' => '201208hotel', );
    $db = $m->connect($dsn);
    $db->query("SET NAMES 'utf8'");
    if($m->isError($db))
    {
        die($db->getMessage());
    }


$sql = 'SELECT * FROM 201208hotel_admin';
    	$array = $db->queryAll($sql);
    	if (!$m->isError($array))
    	{
    		echo $sql."<br>";
    	}
		echo "<pre>";
		print_r($array);

?>