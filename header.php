<?php

// header('HTTP/1.1 200 OK'); // ok 正常访问
// header('HTTP/1.1 404 Not Found'); //通知浏览器 页面不存在
// header('HTTP/1.1.301 Moved Permanently'); //设置地址被永久的重定向 301
// header('Location: http://www.ithhc.cn/'); //跳转到一个新的地址
// header('Refresh: 10; url=http://www.ithhc.cn/'); //延迟转向 也就是隔几秒跳转
// header('X-Powered-By: PHP/6.0.0'); //修改 X-Powered-By信息
// header('Content-language: en'); //文档语言
// header('Content-Length: 1.34'); //设置内容长度
// header('Last-Modified: '.gmdate('D, d M Y H:i:s', $time).' GMT'); //告诉浏览器最后一次修改时间
// header('HTTP/1.1.304 Not Modified'); //告诉浏览器文档内容没有发生改变
  
###内容类型###
// header('Content-Type: text/html; charset=utf-8'); //网页编码
// header('Content-Type: text/plain'); //纯文本格式
// header('Content-Type: image/jpeg'); //JPG、JPEG
// header('Content-Type: application/zip'); // ZIP文件
// header('Content-Type: application/pdf'); // PDF文件
// header('Content-Type: audio/mpeg'); // 音频文件
// header('Content-type: text/css'); //css文件
// header('Content-type: text/javascript'); //js文件
// header('Content-type: application/json'); //json
header('Content-type: application/pdf'); //pdf
// header('Content-type: text/xml'); //xml
// header('Content-Type: application/x-shockw**e-flash'); //Flash动画

echo file_get_contents('http://c.xinstatic.com/o/20190912/1849/5d7a22b8980f4978866.pdf');



