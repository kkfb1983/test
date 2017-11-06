<?php
$client = new Yar_Client("http://test/yar/serv.php");
$result = $client->api("parameter);


// $client = new Yar_Client('http://test/yar/api.php');
// //Set timeout to 1s
// $client->SetOpt(YAR_OPT_CONNECT_TIMEOUT, 1000);
// //Set packager to JSON
// $client->SetOpt(YAR_OPT_PACKAGER, "json");
// $result = $client->hello('你好。');
// print_r($result);