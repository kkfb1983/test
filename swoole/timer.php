<?php
/**
 * Created by PhpStorm.
 * User: EL
 * Date: 17/5/18
 * Time: 下午2:39
 */
//3000ms后执行此函数
echo "begin swoole timer:".PHP_EOL;

$http = new swoole_http_server("0.0.0.0", 9501);

$http->on('request', function ($request, $response) {
    var_dump($request->get, $request->post);
    $response->header("Content-Type", "text/html; charset=utf-8");
    $response->end("<h1>Hello Swoole. #".rand(1000, 9999)."</h1>");
});
swoole_timer_after(3000, function () {
    echo "after 3000ms.\n";
});
$http->start();
