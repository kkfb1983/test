<?php
// $content = file_get_contents('php://input');
$content = date("Y-m-d H:i:s").PHP_EOL;
// $json_data .= file_get_contents('php://input');
// $json_data .= json_decode($_POST,TURE).PHP_EOL;
file_put_contents("/var/tmp/test_log_".date("Ymd").".log",$content."->".json_encode($_POST).PHP_EOL);
