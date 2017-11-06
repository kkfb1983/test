<?php
$n = array(2,4,5,6,8,10,12,14,16,18,20,22);

class btree{
    private $_arr;
    private $_ret;
    public function __construct($param=array()){
        $this->_arr = $param;
    }

    public function main(){
        foreach ($this->_arr as $key=>$val){
            if($this->_empty($this->_ret)){
                $this->_ret[][] = $val;
            }else{
                $this->_addLeaf($val);
            }
//            print_r($this->_ret);
//            exit;
        }
    }
    public function _addLeaf($value){

    }
    public function _empty($value){
        return empty($value);
    }
}
$o = new btree($n);
$o ->main();

