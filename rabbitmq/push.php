<?php
/**
 * Created by PhpStorm.
 * User: EL
 * Date: 17/5/19
 * Time: 上午11:35
 */
date_default_timezone_set("PRC");
$conn_args = array(
    'host' => '127.0.0.1',
    'port' => '5672',
    'login' => 'guest',
    'password' => 'guest',
    'vhost'=>'/'
);

//创建连接和channel
$conn = new AMQPConnection($conn_args);
if (!$conn->connect()) {
    die("Cannot connect to the broker!\n");
}
$channel = new AMQPChannel($conn);
##3，exchange 与  routingkey ： 交换机 与 路由键##

$e_name = 'e_linvo'; //交换机名
$k_route = array(0=> 'key_1', 1=> 'key_2'); //路由key
//创建交换机
$ex = new AMQPExchange($channel);
$ex->setName($e_name);
$ex->setType(AMQP_EX_TYPE_DIRECT); //direct类型
$ex->setFlags(AMQP_DURABLE); //持久化
echo "Exchange Status:".$ex->declare()."\n";
for($i=0; $i<5; ++$i){
    echo "Send Message:".$ex->publish($message .'_'. date('H:i:s'), $k_route[$i%2])."\n";
}

