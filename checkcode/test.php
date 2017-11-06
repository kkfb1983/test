<?php
// 建立一幅 100X30 的图像
$im = imagecreate(100, 30);

// 白色背景和蓝色文本
$bg = imagecolorallocate($im, 255, 255, 255);
$textcolor = imagecolorallocate($im, 0, 0, 255);

// 把字符串写在图像左上角
imagestring($im, 5, 0, 0, "Hello world!", $textcolor);

// 输出图像
header("Content-type: image/png");
imagepng($im);
?> 
