<?php
class poke{
    private $_poke; // 全部牌
    private $_user; // 手牌
    private $_maxPint; // 最大点数
    private $_pokeAllNumber;    // 总牌数
    private $_pokeUserNumber;   // 每人牌数
    public function __construct(){
        $this->_maxPint = 13;
        $this->_pokeAllNumber = 54;
        $this->_pokeUserNumber = round(($this->_pokeAllNumber-3)/3);
        for($i=1;$i<=$this->_pokeAllNumber;$i++){  // A到K花色赋值
            $this->_poke[] = $i;
        }
    }
    /**
     * 开始
     */
    public function start(){
        $result = array();
        for($j=0;$j<3;$j++){
            $result[$i] =  '<img src="poke/'.self::deal().'.jpg" width="63" height="80" style="float:left;">';
            $showTitle =
        }

    }
    /**
     * 发牌
     */
    private function deal(){
        $point = 0;
        for($i=0;$i<$this->_pokeUserNumber;$i++){
            foreach($this->_poke as $key=>$val){
                $key = rand(0,$this->_pokeAllNumber-1);   // 随机点数
                if(!empty($this->_poke[$key])){
                    $point = $this->_poke[$key];
                    $this->_poke[$key] = 0;
                    return $point;
                }
            }
        }
        return $point;
    }
}

function dump($array=array()){
    echo "<pre>";
    print_r($array);
}

$obj = new poke();
$r = $obj -> start();
dump($r);