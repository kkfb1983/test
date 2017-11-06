<?php
$postArr = array('access_token'=>'2.00EqfmLGL_R6MC4ebadbcd5b2xKw8D');
$curlObj = curl_init();

curl_setopt($curlObj, CURLOPT_POSTFIELDS, $postArr);
curl_setopt($curlObj, CURLOPT_URL, "https://api.weibo.com/oauth2/get_token_info");
curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, true);
$jsonArr = curl_exec($curlObj);
curl_close($curlObj);

echo "<pre>";
print_r($jsonArr);
exit;
?>
