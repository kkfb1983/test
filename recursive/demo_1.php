<?php
/**
 * Created by PhpStorm.
 * User: EL
 * Date: 17/9/18
 * Time: 下午2:54
 */
$a = 0;
function take($n,&$s){
    if($n <= 1){
        ++$s;
        echo "1->1<br>";
        return 1;
    }else{
        ++$s;
        $ret = $n * take($n-1,$s);
        echo "$n->$ret<br>";
        return $ret;
    }
}
echo 5*4*3*2*1;
echo "<hr>";
take(5,$a);
echo "<hr> s=>$a";
