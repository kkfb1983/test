<?php
$str = "a中:/";
echo strlen($str)."<br>";
$str = iconv('utf-8', 'gbk', $str);
echo strlen($str)."<br>";
echo mb_strlen($str,'gbk');

for($i=0; $i<strlen($str); $i++){
	$ch = substr($string,$a,1);
	if (ord($ch) >= HexDec("0x81") && ord($ch2) >= HexDec("0x40")) {
		$a += 2;
	} else {
		$a++;
	}
}


