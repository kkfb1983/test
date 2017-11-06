<?php

$postArr = array('username'=>'admin');
$host = array("Host: act.qzone.qq.com","appkey: abcd_1234");  
$data = 'user=xxx&qq=xxx&id=xxx&post=xxx';  
$url = 'http://test/curl/log.php';  


$headers = array();
// $headers[] = 'X-Apple-Tz: 0';
// $headers[] = 'X-Apple-Store-Front: 143444,12';
// $headers[] = 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';
// $headers[] = 'Accept-Encoding: gzip, deflate';
// $headers[] = 'Accept-Language: en-US,en;q=0.5';
// $headers[] = 'Cache-Control: no-cache';
// $headers[] = 'Content-Type: application/x-www-form-urlencoded; charset=utf-8';
// $headers[] = 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:28.0) Gecko/20100101 Firefox/28.0';
// $headers[] = 'X-MicrosoftAjax: Delta=true';
$headers[] = '"Accept:application/json;charset=utf-8"';
$headers[] = '"Content-Type:application/json;charset=utf-8"';
$headers[] = 'APPKEY: ABCD_1234';


$curlObj = curl_init();

curl_setopt($curlObj, CURLOPT_POSTFIELDS, $data);
curl_setopt($curlObj, CURLOPT_URL, $url);
curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curlObj, CURLOPT_HTTPHEADER,$headers);
$jsonArr = curl_exec($curlObj);
curl_close($curlObj);
echo $jsonArr;exit;
echo "<pre>";
print_r($jsonArr);
exit;






 
  
/*  
* 提交请求  
* @param $host array 需要配置的域名 array("Host: act.qzone.qq.com");  
* @param $data string 需要提交的数据 'user=xxx&qq=xxx&id=xxx&post=xxx'....  
* @param $url string 要提交的url 'http://192.168.1.12/xxx/xxx/api/';  
**/  
 function curl_post($host,$data,$url)  
    {  
       $ch = curl_init();  
       $res= curl_setopt ($ch, CURLOPT_URL,$url);  
       var_dump($res);  
       curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);  
       curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);  
       curl_setopt ($ch, CURLOPT_HEADER, 0);  
       curl_setopt($ch, CURLOPT_POST, 1);  
       curl_setopt($ch, CURLOPT_POSTFIELDS, $data);  
       curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);  
       curl_setopt($ch,CURLOPT_HTTPHEADER,$host);  
       $result = curl_exec ($ch);  
       curl_close($ch);  
       if ($result == NULL) {  
           return 0;  
       }  
       return $result;  
    } 

    var_export( curl_post($host, $data,$url) );  