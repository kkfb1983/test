<?php
/**
 * Created by PhpStorm.
 * User: EL
 * Date: 17/9/18
 * Time: 下午3:14
 */
echo "<pre>";
$data = array();
function fibonacci($n,&$r){
    if(empty($r)){
        $r[] = 1;
        $n--;
//        return $n;
    }else{
        $max = count($r);
        $left = empty($r[$max-2]) ? 0 : $r[$max-2];
        $regit = empty($r[$max-1]) ? 0 : $r[$max-1];
        $r[] = $left+$regit;
        $n--;
        return fibonacci($n,$r);
//        $left =fibonacci($n-1);
//        $right = fibonacci($n-2);
//        $ret = $left+$right;
//        echo "{$n}<br>";
//        echo $right."->".$left."<br>";
//        return $ret;
    }
}
fibonacci(10,$data);
print_r($r);


