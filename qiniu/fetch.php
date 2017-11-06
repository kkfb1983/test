<?php
function qiniuFetch($url){
    $encodedURL = str_replace(array('+', '/'), array('-', '_'), base64_encode($url));
    $encodedEntryURI = str_replace(array('+', '/'), array('-', '_'), base64_encode(C('QINIU_BUCKET')));
    $url = '/fetch/' . $encodedURL . '/to/' . $encodedEntryURI;
    $sign = hash_hmac('sha1', $url . "\n", C('QINIU_SK'), true);
    $token = C('QINIU_AK') . ':' . str_replace(array('+', '/'), array('-', '_'), base64_encode($sign));
    $header = array('Host: iovip.qbox.me', 'Content-Type:application/x-www-form-urlencoded', 'Authorization: QBox ' . $token);
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, trim('http://iovip.qbox.me' . $url, '\n'));
    curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, "");
    $result = json_decode(curl_exec($curl), true);
    curl_close($curl);
    return $result['key'] ? C('QINIU_HOST') . $result['key'] : false;
}