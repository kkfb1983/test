<?php
$postArr = array('access_token'=>'2.00EqfmLGL_R6MC4ebadbcd5b2xKw8D');
$curlObj = curl_init();

curl_setopt($curlObj, CURLOPT_POSTFIELDS, $postArr);
curl_setopt($curlObj, CURLOPT_URL, "http://cache.video.qiyi.com/vd/0/4cdfd085ed54469dadcfa52dc4d3cabc/");
curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, true);
// curl_setopt($curlObj, CURLOPT_SSL_VERIFYPEER, FALSE);	// 支持HTTPS
// curl_setopt($curlObj, CURLOPT_SSL_VERIFYHOST, FALSE);
$jsonArr = curl_exec($curlObj);
curl_close($curlObj);
echo $jsonArr;exit;
echo "<pre>";
print_r($jsonArr);
exit;
?>
