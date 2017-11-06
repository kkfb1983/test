<?php
// php /svr/www.weiq.com/manageglht/cron_test/crontab_today_order_statistics.php > /var/tmp/today_order_statistics.log 2>&1 &

$file = file_get_contents('order_income_log/order_income_d5r0_'.date('Ymd').'.log');

preg_match("/warning to url orderid:5229796, payeeid:\d+, platid:\d+, followers_count:\d+, click_count:\d+, short_url_clicks:(\d+)/",$file,$a);

// warning to url order_id:5196637, followers_count:581827, click_count:149, short_url_clicks:312
// warning to url order_id:5199067, click_count:3, short_url_clicks:5
// preg_match("/warning to url order_id:5196637(.+)short_url_clicks:(\d.+)/",$file,$a);

// preg_match("/warning to url order_id:5199067(.+)short_url_clicks:(\d.+)/",$file,$b);

// preg_match_all("/warning to new order_id:5202708, task_id:\d.+, payee_id:\d.+, payer_id:\d.+, read_count:(\d.+), click_price:\d.+, click_count:\d.+->/",$file, $orderArr);

// foreach($orderArr[0] as $val){

// if(preg_match("/order#(\d.+) real click api response#*/", $val, $orderId)){
// 	echo $orderId[1]."<br>";

// }

//                         if (preg_match("/{.+}/", $val, $clickArr)) {
//                         	// print_r($clickArr);
//                         	// exit;
                            
//                         }
//                     }

echo "<pre>";
print_r($a);
// print_r($b);