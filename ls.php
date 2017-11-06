<?php
$str = 'hello world.';
// 返转字符串
echo strrev($str);
// 修改SESSION的过期时间
session_set_cookie_params(3600);
session_start();
// 传值和传引用的区别
function func1($a) {
	$a = $a + 1;
}
function func2(&$a) {
	$a = $a + 1;
}
$sample = 1;
func1($sample);
echo $sample; // 输出 1

$sample = 1;
func2($sample);
echo $sample; // 输出 2
// error_reporting用来设置PHP应该报告诉何种错误的级别
// error_reporting(0);

// foo 和 @foo()的区别
// foo();
// @foo();

// == 和 === 区别
$a = 1;
$b = '1';
echo "<br>";
if($a == $b){
	echo "a";
}
if($a === $b){
	echo "b";
}

// PHP 邮件正则
$reg = '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/';
$reg = '/1(3|4|5|8)\d{9}/';
$text = '6503611@qq.com';
preg_match($reg,$text,$result);

// 生声一个没有法方和属性的类
class myclass{}

// 客户端与服务器端的IP
$_SERVER['REMOTE_ADDR']; // 客户端
$_SERVER["SERVER_ADDR"]; // 服务器端

// arsort、sort、asort和ksort区别
// arsort — 对数组进行逆向排序并保持索引关系
// sort — 对数（一维）组排序
// asort — 对数组进行排序并保持索引关系
// ksort — 对数组按照键名排序

// 如何获取数组中的交集
// array_intersect — 计算数组的交集

// php中写一个函数，能够遍历一个文件夹下的所有文件和子文件夹
function my_scandir($dir) {
	$files = array ();
	if ($handle = opendir ( $dir )) {
		while ( ($file = readdir ( $handle )) !== false ) {
			if ($file != ".." && $file != ".") {
				if (is_dir ( $dir . "/" . $file )) {
					$files [$file] = my_scandir ( $dir . "/" . $file );
				} else {
					$files [] = $file;
				}
			}
		}
		closedir ( $handle );
		return $files;
	}
}

/***DATA BASE**/
// mysql_connect — 打开一个到 MySQL 服务器的连接
$link = mysql_connect('localhost', 'mysql_user', 'mysql_password');
// mysql_pconnect和mysql_connect的区别
// cgi方式运行时pconnect和connect是基本没有区别,apache模块方式运行时一个httpd进程结束后pconnect打开的的那个mysql连接资源不被释放

// MyISAM InnoDB 区别
// InnoDB 不支持事物 myisam支持,但是有BUG。innodb更快一些。

// mysql 慢查询日志
// 分析日志，排查错误，找出瓶颈使用

// show processlist命令
// 显示哪些线程正在运行

/** HTML **/
// HTML <meta> 标签
// <meta> 元素可提供有关页面的元信息

// 1000个苹果
// 几个盒子依次放1，2，4，8，16，32，64，128，256，489。
// 顾客要任意的个数, 换成2进制是1的就把对应的盒子里的苹果给他 ,0就不给









