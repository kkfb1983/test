<?php

header("Content-type:text/html;charset=utf-8");
$postArr = array(
    'email' => '554201463@qq.com',
    'password' => md5('123'),
    'ip' => '127.0.0.1'
);
$url = "http://www.mnssr.com/index.php?app=home&mod=Api&act=login&email=6503611@qq.com&password=" . md5('testroot') . "&ip=127.0.0.1";
// 1. 初始化
$ch = curl_init();
// 2. 设置选项，包括URL
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HEADER, 0);
// 3. 执行并获取HTML文档内容
$output = curl_exec($ch);
echo "<pre>";
print_r($output);
// 4. 释放curl句柄
curl_close($ch);

class test {

    /**
     * 
     * @param type $t
     */
    public function t($t = 1) {
        //alsjdflajsdfljasd;lfj
        echo $t
    }
    /**
     * 
     * @param type $t
     */
    public function t2($t = 2) {
        
    }

}