<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<?php


$info = array('coffee', 'brown', 'caffeine');

// Listing all the variables
list($drink, $color, $power) = $info;

var_dump($info);
echo "<br>".$drink ."<br>".$color.'<br>'.$power;
exit;

$n = $b = $c = 1;

echo $n ."<br>".$b.'<br>'.$c;
exit;


class test{
// 	public $_value;
	private function __construct(){
// 		$this->_value = date('Y-m-d H:i:s');
	}
	static function fun(){
		return __CLASS__.' : '.date('Y-m-d H:i:s');
	}
}

// echo test::fun();
$t = new test();

exit;



class cls extends p_cls{
	public $_val;
	public function __construct(){
		$this->_val = '私有变量';
		parent::__construct();
	}
	public function fun (){
		return __CLASS__ .' : '.$this->_param;
	}
}

class p_cls {
	public $_param;
	
	public function __construct(){
		$this->_param = time();
	}
}


$obj = new cls();
$cobj = clone $obj;
echo $obj->fun();
echo "<hr>";
echo $cobj->fun();
echo "<br>";
echo $cobj->_param;
echo "<br>";
echo $cobj->_val;


// try {
// // 	$error_code = $x;
// 	$error = 'Always throw this error';
// // 	throw new Exception($error);
// 	echo "Never executed";
// 	echo $error_code;
// } catch (Exception $e){
// 	echo "Caught exception: ".$e->getMessage();
// 	echo "<hr>";
// 	echo $e->getCode();
// }
?>
