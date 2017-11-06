<?php 
// file_put_contents("header.log", $_SERVER);
// file_put_contents("header.log", PHP_EOL);
// file_put_contents("header.log", implode('##',$_POST));
// print_r($_SERVER);
// echo PHP_EOL;
// echo PHP_EOL;
// print_r($_REQUEST);


$type = $_SERVER['REQUEST_METHOD'];
parse_str(file_get_contents('php://input'), $data);
// $data = array_merge($_GET, $_POST, $data); 
// $data = file_get_contents('php://input');

file_put_contents("header.log", implode(PHP_EOL, $_SERVER));

file_put_contents("header.log", PHP_EOL."#############".PHP_EOL);

file_put_contents("header.log", json_encode($data));



// print_r($data);
