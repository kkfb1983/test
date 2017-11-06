<?php
echo "result<hr>";
// $bash = exec('grep "Process end" order_income_d5r?_20160805.log',$text);
// system('grep "Process end" order_income_d5r?.log',$bash);
// $last_line = system('ls order_income_d5r?.log',$bash);
exec('grep "Process end" order_income_d5r?_20160805.log',$text);
echo "<hr><pre>";

// var_dump($bash);

// var_dump($text);


print_r($text);
echo count($text);
