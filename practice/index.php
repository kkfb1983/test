<html xmlns="http://www.w3.org/1999/xhtml"><head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<?php
$str = "我的名字是？一般人我不告诉他！"; //加密内容
$key = "key:111"; //密钥
$cipher = MCRYPT_DES; //密码类型
$modes = MCRYPT_MODE_ECB; //密码模式
$iv = mcrypt_create_iv(mcrypt_get_iv_size($cipher,$modes),MCRYPT_RAND);//初始化向量
echo "加密明文：".$str."<p>";
$str_encrypt = mcrypt_encrypt($cipher,$key,$str,$modes,$iv); //加密函数
echo "加密密文：".$str_encrypt." <p>";
$str_decrypt = mcrypt_decrypt($cipher,$key,$str_encrypt,$modes,$iv); //解密函数
echo "还原：".$str_decrypt;

exit;
$dmcryptText = "dummy";
$key = "foobar";
$size = mcrypt_get_iv_size(MCRYPT_BLOWFISH,MCRYPT_MODE_ECB);
 
$iv = mcrypt_create_iv($size);  //注意这里
 
$m = mcrypt_ecb(MCRYPT_BLOWFISH, $key, $dmcryptText, MCRYPT_DECRYPT, $iv);
var_dump($m);

exit;
$dbh = new PDO('mysql:host=localhost;dbname=test', "test");
 
$query = <<<QUERY
  INSERT INTO `user` (`username`, `password`) VALUES (:username, :password);
QUERY;
$statement = $dbh->prepare($query);
 
$bind_params = array(':username' => "laruence", ':password' => "weibo");
foreach( $bind_params as $key => $value ){
    $statement->bindParam($key, $value);
}
$statement->execute();