<?php
/**
 * Created by PhpStorm.
 * User: EL
 * Date: 16/9/18
 * Time: 下午1:29
 */
$r = json_encode($_FILES);
file_put_contents('upfile.log',$r);
//$r = array('data'=>'test.jpg');
echo $r;