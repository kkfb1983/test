<?php
date_default_timezone_set("Asia/Shanghai");
header("Content-Type:text/html;charset=utf-8");
$postArr = 'm=1&c=2&jaingxi=67';
$url = 'http://test/curl/log.php';
$headers[] = 'Accept:application/json;charset=utf-8';
        $headers[] = 'Content-Type:application/json;charset=utf-8';
        $headers[] = 'appkey:ABCD_1234';
        $headers[] = 'ts:'.substr(date('YmdHisu'),0,-3);


$curlObj = curl_init();
// curl_setopt($curlObj, CURLOPT_PUT, true);
// curl_setopt($curlObj, CURLOPT_POST, true);
// curl_setopt($curlObj, CURLOPT_POSTFIELDS, $data); //设置请求体，提交数据包
curl_setopt($curlObj, CURLOPT_CUSTOMREQUEST, 'PUT');

curl_setopt($curlObj, CURLOPT_POSTFIELDS, $postArr);
curl_setopt($curlObj, CURLOPT_URL, $url);
curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curlObj, CURLOPT_HTTPHEADER, $headers);
$jsonArr = curl_exec($curlObj);
curl_close($curlObj);
echo $jsonArr;
echo "<pre>";
print_r($jsonArr);
exit;
?>