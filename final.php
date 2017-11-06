<?php
class c1 {
	public $_val;
 	public function __construct(){
		$this->_val = 'construce';
	}
	public function f1(){
		return 1;
	}
	final public function f2(){
		return 2;
	}
}

class c2 extends c1{
	public function __construct(){
		parent::__construct();
		echo $this->_val;
		echo "<br>";
	}
	public function m(){
		echo self::f1();
		echo "<br>";
		echo self::f2();
	}
	public function f1(){
		return 3;
	}
	public function f2_2(){
		return 4;
	}
}

$o = new c2();
$o -> m();

$a = 1;
$b = "1";
echo "<hr>";
if($a === $b){
	echo 1;
}else{
	echo 2;
}
