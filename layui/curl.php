<?php
// http://www.layui.com/demo/table/user/
$postArr = array('access_token'=>'2.00EqfmLGL_R6MC4ebadbcd5b2xKw8D');
$curlObj = curl_init();

// curl_setopt($curlObj, CURLOPT_POSTFIELDS, $postArr);
curl_setopt($curlObj, CURLOPT_URL, "http://www.layui.com/demo/table/user");
curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, true);
// curl_setopt($curlObj, CURLOPT_SSL_VERIFYPEER, FALSE);	// 支持HTTPS
// curl_setopt($curlObj, CURLOPT_SSL_VERIFYHOST, FALSE);
$jsonArr = curl_exec($curlObj);
curl_close($curlObj);
echo $jsonArr;exit;
$arr = json_decode($jsonArr,true);
print_r($arr['data']);