<?php
/**
 * Created by PhpStorm.
 * User: EL
 * Date: 17/5/31
 * Time: 下午7:33
 */
function callback($ret, $callinfo) {
    echo $callinfo['method'] , " result: ", $ret , "\n";
}
$url = 'http://test/yar/call_api.php';
/* 注册一个异步调用 */
Yar_Concurrent_Client::call($url, "add", array(1, 2), "callback");
Yar_Concurrent_Client::call($url, "sub", array(2, 1), "callback");
Yar_Concurrent_Client::call($url, "mul", array(2, 2), "callback");

/* 发送所有注册的调用, 等待返回, 返回后Yar会调用callback回掉函数 */
Yar_Concurrent_Client::loop("callback");