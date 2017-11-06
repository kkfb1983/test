<?php
include_once( 'config.php' );
include_once( 'saetv2.ex.class.php' );

// define('WRW_WB_AKEY', '1625548073');
// 			define('WRW_WB_SKEY', '6605fde2e08fe644fcce7614a1416203');
// 			//define('WRW_WB_AKEY','37716167');
// 			#define('WRW_WB_SKEY','b7c1383f136b5f9d582f7534c5d99c2f');
// 			define('WRW_WB_CALLBACK_URL', 'http://www.weiq.com/media/sina/callback.html');
$sea = new SaeTClientV2(1625548073, '6605fde2e08fe644fcce7614a1416203');

$t = array('2.00JLs12CL_R6MC39c320b3fewmVLQE','2.006fhTDCL_R6MCfbe8aa362207SK4_','2.00YbjajCL_R6MC2a9658943b0mZ_zQ','2.00PuQAPCL_R6MCe35b0ea8d2gw1mcD','2.00sMIFYD0RhPYC8eab1c70c00ymHCy');
foreach($t as $v)
	$data = $sea->getTokeninfo($v);
	print_r($data);
	echo "<hr>";
	$data = '';
}


/*
$uid=1881285134;
$token = '2.00cMg_DC0RhPYCb564f5dbff0O5AHc';
$token = '2.00G5vDMB__dAmB7656bf09eauIzNLC';
# $sea = new SaeTClientV2(3833697866, 'a9ed5f0b5b1a91bf3d3ff0a887086bd3', $token);  // 抓数据
$sea = new SaeTClientV2('37716167', 'b7c1383f136b5f9d582f7534c5d99c2f', $token);    // wrw
// $weiboInfo = $sea->user_timeline_count($uid);
$userInfo = $sea->show_user_by_id($uid);
// $tokenstatus = $sea->getTokeninfo($token);
echo "<pre>";
print_r($userInfo);
*/
