<?php
include "TopSdk.php";
date_default_timezone_set('Asia/Shanghai');

$c = new TopClient;
$c->appkey = '23620900';
$c->secretKey = '81715e36876d7179ca5042cba8c1c11a';

// 列表数据
$req = new TbkItemGetRequest;
$req->setFields("num_iid,title,pict_url,small_images,reserve_price,zk_final_price,user_type,provcity,item_url,seller_id,volume,nick");
$req->setQ("手机壳6");
//$req->setCat("16,18");
//$req->setItemloc("杭州");
//$req->setSort("tk_rate_des");
//$req->setIsTmall("false");
//$req->setIsOverseas("false");
//$req->setStartPrice("10");
//$req->setEndPrice("10");
//$req->setStartTkRate("123");
//$req->setEndTkRate("123");
//$req->setPlatform("1");
//$req->setPageNo("123");
//$req->setPageSize("20");
$resp = $c->execute($req,'6200604b85a3ZZ24cf1df558a6475ac90648713d0388462640424736');

##################################################################################

// 详细数据
//$req = new TbkItemInfoGetRequest;
//$req->setFields("num_iid,title,pict_url,small_images,reserve_price,zk_final_price,user_type,provcity,item_url");
//$req->setPlatform("1");
//$req->setNumIids("542871467812");
//$resp = $c->execute($req);

#####################

// 优惠券
//$req = new TbkItemCouponGetRequest;
//$req->setPlatform("1");
//$req->setCat("16,18");
//$req->setPageSize("1");
//$req->setQ("女装");
//$req->setPageNo("1");
//$req->setPid("mm_121561183_21212816_71516871");
//$resp = $c->execute($req);

##########################

// 短链接转换
$req = new TbkItemConvertRequest;
$req->setFields("num_iid,click_url");
$req->setNumIids("27421496188");
$req->setAdzoneId("21212816");
//$req->setPlatform("123");
//$req->setUnid("demo");
$resp = $c->execute($req);


####################################

// 短链转长链
//$req = new TbkItemClickExtractRequest;
//$req->setClickUrl("https://s.click.taobao.com/YwCim7x");
//$resp = $c->execute($req);

echo "<pre>";
print_r($resp);

?>