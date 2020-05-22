<?php
$redis = new Redis();
$redis->connect('127.0.0.1', 6379);

/* String */
$key = hash("crc32",date("Ymd"));
$rs = $redis->get($key);
if(empty($rs)){
        echo "exit";
        exit;
}
$r = json_decode($rs,true);
foreach($r as $k=>$v){
        echo $k."->".json_encode($v);
        echo PHP_EOL;
}

