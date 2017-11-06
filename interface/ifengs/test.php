<?php
require_once("./RestRequest.inc.php"); //提供的SDK，以便于进行POST或者其他形式的请求
$arr = array(
		'appkey'=>'2010010018'
		,'app_secret'=>'BuUZf6zi'
		,'apply'=>'user'
		,'method'=>'update'
		,'format'=>'formatjson' //以json形式返回
		,'email'=>'kkfb1983' //传递用户填写的用户名
		,'password'=>'1231312' //传递用户填写的密码
		,'ip_address'=>'172.16.10.3' //传递用户的IP
		,'return_cyid'=>2 //返回cyid和user_name两个字段
);
$request = new RestRequest('http://api.cyworld.ifensi.com/services/sysrest/', 'POST',$arr);
$request->execute();
$res = $request->getresponseBody();
$res = json_decode($res); //接收的是JSON形式的返回需要使用json_decode还原成数组
echo "<pre>";
print_r($res);
exit;
$login_id = $res['user']['cyid']; //返回的用户ID
$user_name = $res['user']['user_name']; //返回的用户名
