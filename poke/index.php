<?php

class{
    private $_pai;
    public funtion __construct(){

    }
    public function start(){
        $maxNumber = 54;
        for($i=1;$i<=$maxNumber;$i++){
            echo srand($i,$maxNumber);
        }
    }
}