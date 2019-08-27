<?php
// 建立一幅 100X30 的图像
$im = imagecreate(100, 30);
        $width = 50;
        //验证码图片的高度
        $height = 25;
// 白色背景和蓝色文本
$bg = imagecolorallocate($im, 255, 255, 255);
$textcolor = imagecolorallocate($im, 0, 0, 255);

  //背景色
  $bg = imagecolorallocate($im, 0xFF, 0xFF, 0xFF);
  //模糊点颜色
//   $pix = imagecolorallocate($im, 203, 230, 247);
  //字体色
  $textcolor = imagecolorallocate($im, 179, 17, 14);

// 把字符串写在图像左上角
imagestring($im, 5, 0, 0, "Hello world!", $textcolor);
// imagerectangle($im, 0, 0, $width - 1, $height - 1, $textcolor);
imagepng($im);
imagedestroy($im);
// 输出图像
header("Content-type: image/png");
imagepng($im);
?>