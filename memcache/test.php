<?php
class m {
	private $_m;
	private $_v;
	public function __construct(){
		$this->_m = Memcache();
		$this->_m -> connect("localhost", 11211);
	}
	public function set(){
		$mem->set('key','This is a test!', 0, 15);
	} 
	public function get(){
		$val = $mem->get('key');
		echo $val;
	}
}
$o = new m();
$o->set();
$o->get();