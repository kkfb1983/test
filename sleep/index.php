<?php
/**
 * Created by PhpStorm.
 * User: Root
 * Date: 13-12-6
 * Time: 上午11:20
 */
public function a(){
    for($i=1;$i<10;$i++){
        M()->query("update tra_member set wait='".  rand(1111, 9999)."'");
        sleep(1);
    }
}
public function b(){
    echo rand(55, 99);
}
