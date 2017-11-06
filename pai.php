<?php
class poke{
    private $_poke; // 全部牌
    private $_user; // 手牌
    private $_maxPint; // 最大点数
    private $_pokeAllNumber;    // 总牌数
    private $_pokeUserNumber;   // 每人牌数
    public function __construct(){
        $this->_maxPint = 13;
        $flower = array(1,2,3,4); // 花色
        $this->_poke = array(
                0=>array(1,2)  // 大王、小王
                );
        $this->_pokeAllNumber = 54;
        $this->_pokeUserNumber = round(($this->_pokeAllNumber-3)/3);
        for($i=1;$i<=$this->_maxPint;$i++){  // A到K花色赋值
            $this->_poke[$i] = $flower;
        }
    }
    /**
     * 发牌
     */
    public function start(){
        $this->_user['one'] = self::deal();
//        $this->_user['tow'] = self::deal();
//        $this->_user['three'] = self::deal();
        return $this->_user;
    }
    /**
     * 发牌
     */
    private function deal(){
        $result = array();
        for($i=1;$i<=$this->_pokeUserNumber;$i++){
            $state = true;
            $userDeal = array();
            while($state) {
                $point = rand(0,$this->_maxPint-1);   // 随机点数
                $pointSum = array_sum($this->_poke[$point]);
                if($pointSum > 0){  // 点数是否被抽光
                    $flower = rand(0,count($this->_poke[$point]));
                    if(!empty($this->_poke[$point][$flower])){
                        $userDeal = array($point,$this->_poke[$point][$flower]);
                        $this->_poke[$point][$flower] = 0;
                        $state = false;
                    }
                }
            }
            $result[] = array(
                'point' => $userDeal[0],
                'flower' => $userDeal[1]
            );
        }
        return $result;
    }
}

function dump($array=array()){
    echo "<pre>";
    print_r($array);
}

$obj = new poke();
$r = $obj -> start();
dump($r);