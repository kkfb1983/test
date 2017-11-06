<?php
echo "<pre>";
$redis = new Redis();
$redis->connect('127.0.0.1', 6379) or die ('redis connect fail.');
$redis->flushAll();

/* String */
//$key = "test_redis_key";
//$redis->set($key, time());
//echo $redis->get($key);


/* List */
//$redis->lPush("lists","v1","v2","v3","v4");
//$redis->lPush("lists",'v5');
//$max = $redis->lLen("lists");
////var_dump($redis->lRange("lists",0,-1));
////echo "<br>";
////$redis->lPop("lists");
////$redis->rPop("lists");
////echo $redis->lLen("lists");
////echo "<br>";
////echo "<pre>";
////var_dump($redis->lRange("lists",0,-1));
//
//for($i=0;$i<$max;$i++){
//    var_dump($redis->rPop("lists"));
//    echo "<br>";
//    sleep(5);
//}

/* Object */
//$redis->sAdd("k1","v1","v2","v3","v4");
//$redis->sAdd("k2","v_2","v_1","v_5");
//$redis->zAdd("k3","v10","v9","v8");
//$data = $redis->sMembers("k1");
//$data_ = $redis->sMembers("k2");
//$data__ = $redis->zRange("k3",0,-1);
//var_dump($data);
//var_dump($data_);
//var_dump($data__);

$redis->zAdd('z', 1, 'v2', 2, 'v2', 3, 'v3', 4, 'v4' );  // int(2)
//$redis->zRem('z', 'v2', 'v3');                           // int(2)
var_dump( $redis->zRange('z', 0, -1) );

