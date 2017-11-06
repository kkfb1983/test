<?php
$price = 1001;
echo sprintf("%01.2f", $price);
exit;
$a=new stdClass;
   $a->b=new stdClass;
   $a->b->c="Hello World!\n";

   $reductionPath=array("b","c");

   print_r(
     array_reduce(
       $reductionPath,
       function($result, $item){
         return $result->$item;
       },
       $a
     )
   );

exit;
// $value = 0;
//      $fn = function &() use (&$value) { return $value; };

//      $x =& $fn();
//      var_dump($x, $value);        // 'int(0)', 'int(0)'
//      ++$x;
//      var_dump($x, $value);        // 'int(1)', 'int(1)' 

// $param = 0;
// $fn = function &() use (&$param){
//   return $param;
// };
// $newFun = $fn;
// echo $fn(1);

// echo "<br>";
// $newFun = 100;
// echo $newFun;
// exit;


class Example {
     public $blah;
     function foo() {
         $that = $this;
         $tmp = function() use ($that) {
              return $that->blah;
          };
         $fun = $tmp();
         return $fun;
     }
 }

$example = new Example();
$example->blah = "whatever - ".date('Y-m-d H:i:s');
echo $example->foo(); // prints "whatever" 

exit;


function &watch_functions_tick($do_tick=true) {
   static $funcs = array();
   static $last_func;
   
   if ($do_tick) {
       $trace = debug_backtrace();
       $func = $trace[1]['function'];
       if ($trace[1]['class']) $func = $trace[1]['class'].$trace[1]['type'].$func;

       if ($func != $last_func && $func !== 'watch_functions_tick' && $func != 'unknown' && $func) {
           $funcs[$func]++;
           $last_func = $func;
       } elseif (!$func || $func = 'unknown') {
           $last_func = '';
       }
       $funcs['__TICK_COUNT__']++;
   } else {
       return $funcs;
   }
}
declare (ticks=1);
?>

Script #2:
<?
print_r(watch_functions_tick(false));
exit;
?>

<?php

declare(ticks=1);

// A function called on each tick event
function tick_handler()
{
    echo "tick_handler() called\n";
}

register_tick_function('tick_handler');

$a = 1;

if ($a > 0) {
    $a += 2;
    print($a);
}

exit;


class Base {
    public function sayHello() {
        echo 'Hello ';
    }
}

trait SayWorld {
    public function sayHello() {
        parent::sayHello();
        echo 'World!';
    }
}

class MyHelloWorld extends Base {
    use SayWorld;
}

$o = new MyHelloWorld();
$o->sayHello();
?> 