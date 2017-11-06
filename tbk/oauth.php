<?php
/*测试时，需把test参数换成自己应用对应的值*/

// https://oauth.taobao.com/authorize?response_type=code&client_id=23620900&redirect_uri= http://wrw.ppe.appinside.com/taskv2

$url = 'https://oauth.taobao.com/token';
$postfields= array('grant_type'=>'authorization_code',
    'client_id'=>'23620900',
    'client_secret'=>'81715e36876d7179ca5042cba8c1c11a',
//    'response_type' => 'code',
    'code'=>'test',
    'redirect_uri'=>'http://wrw.ppe.appinside.com/taskv2/oauth.php');
$post_data = '';

echo $url;exit;

foreach($postfields as $key=>$value){
    $post_data .="$key=".urlencode($value)."&";}
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt ($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt ($ch, CURLOPT_SSL_VERIFYHOST, 0);

//指定post数据
curl_setopt($ch, CURLOPT_POST, true);

//添加变量
curl_setopt($ch, CURLOPT_POSTFIELDS, substr($post_data,0,-1));
$output = curl_exec($ch);
$httpStatusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
echo $httpStatusCode;
curl_close($ch);
var_dump($output);

?>