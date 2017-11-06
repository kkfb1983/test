<?php
error_reporting(0);
require_once 'inc/function.php';
$catIdArray = array(0=>"50020280",1=>"1801",2=>"50010788",3=>"16",4=>"30",5=>"50008090");
$taobaokeItemArray=array();
foreach($catIdArray as $catIdValue) 
{
	$Taoapi->method = 'taobao.taobaoke.items.get';
	$Taoapi->fields = 'num_iid,title,nick,pic_url,price,click_url,commission,commission_rate,commission_num,commission_volume,seller_credit_score,shop_click_url';
	$Taoapi->nick = $usernick;
	$Taoapi->cid = $catIdValue;
	$Taoapi->page_no = '1';
	$Taoapi->page_size = '40';
	$Taoapi->sort = 'commissionNum_desc';
	$Taoapi->start_price = 10;
	$Taoapi->end_price = 5000;
	$TaoapiItems = $Taoapi->Send('get','xml')->getArrayData();
	$taobaokeItem = $TaoapiItems["taobaoke_items"]["taobaoke_item"];
	$taobaokeItemArray[$catIdValue] = $taobaokeItem;
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title><?php echo $sitetitle ?></title>
<meta name="keywords" content="<?php echo $sitekey ?>" />
<meta name="description" content="<?php echo $sitedesc ?>" />
<script src="css/base64.js" language="javascript"></script>
<script src="css/function.js" language="javascript"></script>
<link href="css/style.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div id="main">
<?php
include("header.php");
?>
	<div class="s_box">
		<div class="clear"></div>
		<div class="s_box_l">
			<div class="s_box1">
				<div class="s_box1_l">
					<h1><span>淘宝网热销商品推荐</span></h1>
					<ul>
						<?php for($i = 5; $i < 7; $i++) { ?>
						<li><a href="list.php?catid=1801" class="catname">[护肤]</a><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["1801"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["1801"][$i]["title"]) ?></a></li>
						<?php } ?>
						<?php for($i = 5; $i < 7; $i++) { ?>
						<li><a href="list.php?catid=50010788" class="catname">[彩妆]</a><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50010788"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50010788"][$i]["title"]) ?></a></li>
						<?php } ?>
						<?php for($i = 5; $i < 7; $i++) { ?>
						<li><a href="list.php?catid=16" class="catname">[女装]</a><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["16"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["16"][$i]["title"]) ?></a></li>
						<?php } ?>
						<?php for($i = 5; $i < 7; $i++) { ?>
						<li><a href="list.php?catid=30" class="catname">[男装]</a><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["30"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["30"][$i]["title"]) ?></a></li>
						<?php } ?>
						<?php for($i = 24; $i < 27; $i++) { ?>
						<li><a href="list.php?catid=50008090" class="catname">[数码]</a><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50008090"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50008090"][$i]["title"]) ?></a></li>
						<?php } ?>
						<?php for($i = 7; $i < 10; $i++) { ?>
						<li><a href="list.php?catid=50020280" class="catname">[减肥]</a><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50020280"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50020280"][$i]["title"]) ?></a></li>
						<?php } ?>
					</ul>
				</div>
				<div class="s_box1_r">
					<div class="zhuti"><a href="http://www.tmall.com/go/chn/tbk_channel/tmall_new.php?pid=<?php echo $userpid ?>&eventid=101334" target="_blank"><img src='img/mall.gif'></a></div>
					<div class="s_focus">
						<dl>
							<?php for($i = 3; $i < 5; $i++) { ?>
							<dt><div><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["16"][$i]["num_iid"]) ?>" target="_blank"><script language="javascript">setPic("<?php echo base64_encode($taobaokeItemArray["16"][$i]["pic_url"]."_100x100.jpg") ?>",0,0,"<?php echo iconv("UTF-8","GBK",$taobaokeItemArray["16"][$i]["title"]) ?>")</script></a></div>
							<p id="stitle"><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["16"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["16"][$i]["title"]) ?></a></p>
							</dt>
							<?php } ?>
							<?php for($i = 3; $i < 5; $i++) { ?>
							<dt><div><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["30"][$i]["num_iid"]) ?>" target="_blank"><script language="javascript">setPic("<?php echo base64_encode($taobaokeItemArray["30"][$i]["pic_url"]."_100x100.jpg") ?>",0,0,"<?php echo iconv("UTF-8","GBK",$taobaokeItemArray["30"][$i]["title"]) ?>")</script></a></div>
							<p id="stitle"><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["30"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["30"][$i]["title"]) ?></a></p>
							</dt>
							<?php } ?>
							<?php for($i = 3; $i < 5; $i++) { ?>
							<dt><div><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["1801"][$i]["num_iid"]) ?>" target="_blank"><script language="javascript">setPic("<?php echo base64_encode($taobaokeItemArray["1801"][$i]["pic_url"]."_100x100.jpg") ?>",0,0,"<?php echo iconv("UTF-8","GBK",$taobaokeItemArray["1801"][$i]["title"]) ?>")</script></a></div>
							<p id="stitle"><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["1801"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["1801"][$i]["title"]) ?></a></p>
							</dt>
							<?php } ?>
							<?php for($i = 3; $i < 5; $i++) { ?>
							<dt><div><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50010788"][$i]["num_iid"]) ?>" target="_blank"><script language="javascript">setPic("<?php echo base64_encode($taobaokeItemArray["50010788"][$i]["pic_url"]."_100x100.jpg") ?>",0,0,"<?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50010788"][$i]["title"]) ?>")</script></a></div>
							<p id="stitle"><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50010788"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50010788"][$i]["title"]) ?></a></p>
							</dt>
							<?php } ?>
						</dl>
					</div>
				</div>
			</div>
			<div class="s_box2">
				<h2></h2>
				<dl>
					<?php for($i = 0; $i < 7; $i++) { ?>
					<dt><span><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50020280"][$i]["num_iid"]) ?>" target="_blank"><script language="javascript">setPic("<?php echo base64_encode($taobaokeItemArray["50020280"][$i]["pic_url"]."_sum.jpg") ?>",0,0,"<?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50020280"][$i]["title"]) ?>")</script></a></span>
					<p id="ltitle"><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50020280"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50020280"][$i]["title"]) ?></a></p>
					<p id="lprice"><em><?php echo $taobaokeItemArray["50020280"][$i]["price"] ?></em></p>
					</dt>
					<?php } ?>
				</dl>
			</div>
			<div class="s_box3">
				<div class="clear"></div>
				<div class="s_box3_l">
					<h1><span>美容护肤</span><a href="list.php?catid=1801" target="_blank">更多</a></h1>
					<dl>
						<?php for($i = 0; $i < 3; $i++) { ?>
						<dt><span><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["1801"][$i]["num_iid"]) ?>" target="_blank"><script language="javascript">setPic("<?php echo base64_encode($taobaokeItemArray["1801"][$i]["pic_url"]."_100x100.jpg") ?>",0,0,"<?php echo iconv("UTF-8","GBK",$taobaokeItemArray["1801"][$i]["title"]) ?>")</script></a></span>
						<p id="gtitle"><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["1801"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["1801"][$i]["title"]) ?></a></p>
						<p id="gprice"><b>￥</b><em><?php echo $taobaokeItemArray["1801"][$i]["price"] ?></em>元</p>
						</dt>
						<?php } ?>
					</dl>
					<ul>
						<?php for($i = 0; $i < 3; $i++) { ?>
						<li><a href="javascript:void();" onclick="clickurl('<?php echo base64_encode($taobaokeItemArray["1801"][$i]["shop_click_url"]) ?>');return false;" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["1801"][$i]["nick"]) ?>【淘宝旗舰店铺】</a><img border="0" src="img/level_<?php echo $taobaokeItemArray["1801"][$i]["seller_credit_score"] ?>.gif"></li>
						<?php } ?>
					</ul>
					<div class="s_box3_cat">
						<a target="_blank" href="list.php?catid=14">数码相机</a>
						<a target="_blank" href="list.php?catid=1512">手机</a> 
						<a target="_blank" href="list.php?catid=1101">笔记本</a>
						<a target="_blank" href="list.php?catid=1201">MP3/MP4</a>
						<a target="_blank" href="list.php?catid=50012164">移动存储</a> 
						<a target="_blank" href="list.php?catid=50008090">数码配件</a>
					</div>
				</div>
				<div class="s_box3_r">
					<h1><span>彩妆香水</span><a href="list.php?catid=50010788" target="_blank">更多</a></h1>
					<dl>
						<?php for($i = 0; $i < 3; $i++) { ?>
						<dt><span><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50010788"][$i]["num_iid"]) ?>" target="_blank"><script language="javascript">setPic("<?php echo base64_encode($taobaokeItemArray["50010788"][$i]["pic_url"]."_100x100.jpg") ?>",0,0,"<?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50010788"][$i]["title"]) ?>")</script></a></span>
						<p id="gtitle"><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50010788"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50010788"][$i]["title"]) ?></a></p>
						<p id="gprice"><b>￥</b><em><?php echo $taobaokeItemArray["50010788"][$i]["price"] ?></em>元</p>
						</dt>
						<?php } ?>
					</dl>
					<ul>
						<?php for($i = 0; $i < 3; $i++) { ?>
						<li><a href="javascript:void();" onclick="clickurl('<?php echo base64_encode($taobaokeItemArray["50010788"][$i]["shop_click_url"]) ?>');return false;" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50010788"][$i]["nick"]) ?>【淘宝旗舰店铺】</a><img border="0" src="img/level_<?php echo $taobaokeItemArray["50010788"][$i]["seller_credit_score"] ?>.gif"></li>
						<?php } ?>
					</ul>
					<div class="s_box3_cat">
						<a target="_blank" href="list.php?catid=1801">护肤品</a> 
						<a target="_blank" href="list.php?catid=50010788">彩妆</a> 
						<a target="_blank" href="list.php?catid=50011998">手部保养</a> 
						<a target="_blank" href="list.php?catid=50011977">洁面</a> 
						<a target="_blank" href="list.php?catid=50011981">面膜</a> 
						<a target="_blank" href="list.php?catid=50011979">面部精华</a>
						<a target="_blank"  href="list.php?catid=50011983">身体护理</a>
					</div>
				</div>
				<div class="clear"></div>
			</div>
			<div class="s_box3">
				<div class="clear"></div>
				<div class="s_box3_l">
					<h1><span>时尚女装</span><a href="list.php?catid=16" target="_blank">更多</a></h1>
					<dl>
						<?php for($i = 0; $i < 3; $i++) { ?>
						<dt><span><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["16"][$i]["num_iid"]) ?>" target="_blank"><script language="javascript">setPic("<?php echo base64_encode($taobaokeItemArray["16"][$i]["pic_url"]."_100x100.jpg") ?>",0,0,"<?php echo iconv("UTF-8","GBK",$taobaokeItemArray["16"][$i]["title"]) ?>")</script></a></span>
						<p id="gtitle"><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["16"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["16"][$i]["title"]) ?></a></p>
						<p id="gprice"><b>￥</b><em><?php echo $taobaokeItemArray["16"][$i]["price"] ?></em>元</p>
						</dt>
						<?php } ?>
					</dl>
					<ul>
						<?php for($i = 0; $i < 3; $i++) { ?>
						<li><a href="javascript:void();" onclick="clickurl('<?php echo base64_encode($taobaokeItemArray["16"][$i]["shop_click_url"]) ?>');return false;" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["16"][$i]["nick"]) ?>【淘宝旗舰店铺】</a><img border="0" src="img/level_<?php echo $taobaokeItemArray["16"][$i]["seller_credit_score"] ?>.gif"></li>
						<?php } ?>
					</ul>
					<div class="s_box3_cat" id="s_box3_cat">
						<a target="_blank" href="list.php?catid=50008899">羽绒服</a> 
						<a target="_blank" href="list.php?catid=162103">毛衣</a> 
						<a target="_blank" href="list.php?catid=162205">牛仔裤</a>
						<a target="_blank" href="list.php?catid=50008900">棉衣</a> 
						<a target="_blank" href="list.php?catid=50000697">针织衫</a> 
						<a target="_blank" href="list.php?catid=50008904">女士皮衣</a> 
						<a target="_blank" href="list.php?catid=50008883">文胸套装</a> 
					</div>
				</div>
				<div class="s_box3_r">
					<h1><span>潮流男装</span><a href="list.php?catid=30" target="_blank">更多</a></h1>
					<dl>
						<?php for($i = 0; $i < 3; $i++) { ?>
						<dt><span><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["30"][$i]["num_iid"]) ?>" target="_blank"><script language="javascript">setPic("<?php echo base64_encode($taobaokeItemArray["30"][$i]["pic_url"]."_100x100.jpg") ?>",0,0,"<?php echo iconv("UTF-8","GBK",$taobaokeItemArray["30"][$i]["title"]) ?>")</script></a></span>
						<p id="gtitle"><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["30"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["30"][$i]["title"]) ?></a></p>
						<p id="gprice"><b>￥</b><em><?php echo $taobaokeItemArray["30"][$i]["price"] ?></em>元</p>
						</dt>
						<?php } ?>
					</dl>
					<ul>
						<?php for($i = 0; $i < 3; $i++) { ?>
						<li><a href="javascript:void();" onclick="clickurl('<?php echo base64_encode($taobaokeItemArray["30"][$i]["shop_click_url"]) ?>');return false;" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["30"][$i]["nick"]) ?>【淘宝旗舰店铺】</a><img border="0" src="img/level_<?php echo $taobaokeItemArray["30"][$i]["seller_credit_score"] ?>.gif"></li>
						<?php } ?>
					</ul>
					<div class="s_box3_cat" id="s_box3_cat">
						<a target="_blank" href="list.php?catid=50011740">流行男鞋</a> 
						<a target="_blank" href="list.php?catid=50010158">夹克</a> 
						<a target="_blank" href="list.php?catid=50011159">风衣</a> 
						<a target="_blank" href="list.php?catid=50011167">羽绒服</a> 
						<a target="_blank" href="list.php?catid=50011123">男士衬衫</a>
						<a target="_blank" href="list.php?catid=50010160">西服</a> 
						<a target="_blank" href="list.php?catid=50010167">牛仔裤</a>
					</div>
				</div>
				<div class="clear"></div>
			</div>
			<div class="s_box4">
				<div class="s_box4_title"></div>
				<div class="s_bod4_box">
					<h2></h2>
					<div class="leibiebox1">
						<div class="v1">
							<h1><span><a href="list.php?catid=16" target="_blank">女士服装</a>/<a href="list.php?catid=1625" target="_blank">内衣</a></span></h1>
							<p><a href="list.php?catid=50011277" target="_blank">外套</a>| <a href="list.php?catid=162105" target="_blank">小背心/小吊带</a>|<a href="list.php?catid=162116" target="_blank"><span>雪纺衫</span></a>| <a href="list.php?catid=162104" target="_blank">衬衫</a>| <a href="list.php?catid=50000697" target="_blank">针织衫</a>| <a href="list.php?catid=50010850" target="_blank"><span>连衣裙</span></a>| <a href="list.php?catid=50000671" target="_blank">T恤</a>| <a href="list.php?catid=50008901" target="_blank">风衣</a>| <a href="list.php?catid=162103" target="_blank">毛衣</a>| <a href="list.php?catid=1622" target="_blank"><span>打底裤</span></a>| <a href="list.php?catid=50008881" target="_blank">文胸</a>| <a href="list.php?catid=50008883" target="_blank"><span>文胸套装</span></a>| <a href="list.php?catid=50006846" target="_blank">女袜/男袜</a>| <a href="list.php?catid=50008890" target="_blank">肚兜</a>| <a href="list.php?catid=50010395" target="_blank">情侣内衣</a>| <a href="list.php?catid=50008886" target="_blank">家居服</a>| <a href="list.php?catid=50008885" target="_blank">保暖内衣</a>| <a href="list.php?catid=50008888" target="_blank"><span>抹胸/裹胸</span></a></p>
						</div>
						<div class="v2">
							<h1><span><a href="list.php?catid=50010404" target="_blank">帽子围巾</a>/<a href="list.php?catid=50006843" target="_blank">鞋包</a></span></h1>
							<p><a href="list.php?catid=50007003" target="_blank">围巾/丝巾</a>| <a href="list.php?catid=50009034" target="_blank">头巾</a>| <a href="list.php?catid=50009037" target="_blank">耳套</a>| <a href="list.php?catid=302909" target="_blank">袖扣</a>| <a href="list.php?catid=50009035" target="_blank">手帕</a>| <a href="list.php?catid=50010406" target="_blank"><span>鞋包/皮带配件</span></a>| <a href="list.php?catid=50009047" target="_blank">其他配件</a>| <a href="list.php?catid=50009032" target="_blank">腰带/腰链/腰饰</a>| <a href="list.php?catid=50010410" target="_blank">手套</a>| <a href="list.php?catid=302902" target="_blank">领带</a>| <a href="list.php?catid=50006843" target="_blank">女鞋</a>| <a href="list.php?catid=50012032" target="_blank">凉鞋</a>| <a href="list.php?catid=50012033" target="_blank">凉拖</a>| <a href="list.php?catid=50012052" target="_blank">编织鞋</a>| <a href="list.php?catid=50010388" target="_blank"><span>运动鞋</span></a>| <a href="list.php?catid=50012042" target="_blank">帆布鞋</a>| <a href="list.php?catid=50012055" target="_blank">增高鞋</a>| <a href="list.php?catid=50012028" target="_blank">靴子</a>| <a href="list.php?catid=50012035" target="_blank"><span>皮鞋</span></a></p>
						</div>
						<div class="v3">
								<h1><span><a href="list.php?catid=50010788" target="_blank">美容彩妆</a>/<a href="list.php?catid=1801" target="_blank">护肤</a></span></h1>
								<p><a href="list.php?catid=50010817" target="_blank">美容工具</a>| <a href="list.php?catid=50010797" target="_blank">眼线笔</a>| <a href="list.php?catid=50010812" target="_blank"><span>彩妆套装</span></a>| <a href="list.php?catid=50010808" target="_blank">唇膏/口红</a>| <a href="list.php?catid=50010810" target="_blank">指甲油</a>| <a href="list.php?catid=50010796" target="_blank">眼影</a>| <a href="list.php?catid=50011977" target="_blank">洁面</a>| <a href="list.php?catid=50011981" target="_blank">面膜</a> | <a href="list.php?catid=50011979" target="_blank"><span>面部精华</span></a>| <a href="list.php?catid=50011983" target="_blank">身体护理</a>| <a href="list.php?catid=50011984" target="_blank">隔离霜</a>| <a href="list.php?catid=50011997" target="_blank">去角质</a>| <a href="list.php?catid=50011994" target="_blank"><span>唇部护理</span></a>| <a href="list.php?catid=50011986" target="_blank">眼部护理</a>| <a href="list.php?catid=50011982" target="_blank"><span>面部防晒</span></a>| <a href="list.php?catid=50011980" target="_blank">面霜</a></p>
						</div>
					</div>
					<div class="leibiebox2">
						<div class="v1">
							<h1><span><a href="list.php?catid=30" target="_blank">男士服装</a>/<a href="list.php?catid=1705" target="_blank">饰品</a></span></h1>
							<p><a href="list.php?catid=50000436" target="_blank">T恤</a>| <a href="list.php?catid=50010402" target="_blank">Polo衫</a>| <a href="list.php?catid=50010159" target="_blank">卫衣</a>| <a href="list.php?catid=50011123" target="_blank">衬衫</a>| <a href="list.php?catid=50010167" target="_blank"><span>牛仔裤</span></a>| <a href="list.php?catid=3035" target="_blank">休闲裤</a>| <a href="list.php?catid=50011129" target="_blank">西裤</a>| <a href="list.php?catid=50011159" target="_blank"><span>风衣</span></a>| <a href="list.php?catid=50011165" target="_blank">棉衣</a>| <a href="list.php?catid=50011161" target="_blank"><span>皮衣</span></a>| <a href="list.php?catid=50011167" target="_blank"><span>羽绒服</span></a>| <a href="list.php?catid=50010160" target="_blank">西服</a>| <a href="list.php?catid=50010158" target="_blank">夹克</a>| <a href="list.php?catid=50011130" target="_blank">西服套装</a>| <a href="list.php?catid=50010393" target="_blank">男士内裤</a>| <a href="list.php?catid=50010394" target="_blank">背心</a>| <a href="list.php?catid=50011740" target="_blank"><span>流行男鞋</span></a>| <a href="list.php?catid=50011699" target="_blank">运动服/运动包/颈环</a></p>
						</div>
						<div class="v2">
							<h1><span><a href="list.php?catid=21" target="_blank">居家日用</a>/<a href="list.php?catid=50002711" target="_blank">收纳</a></span></h1>
							<p><a href="list.php?catid=50009287" target="_blank">完美日用</a>| <a href="list.php?catid=50010101" target="_blank">厨房用品</a> | <a href="list.php?catid=210207" target="_blank">驱蚊/驱虫</a>| <a href="list.php?catid=50011176" target="_blank"><span>清凉油/防暑贴/防暑用品</span></a>| <a href="list.php?catid=215206" target="_blank"><span>酒具/酒杯/酒壶</span></a>| <a href="list.php?catid=2132" target="_blank">卫浴用品</a>| <a href="list.php?catid=50000567" target="_blank">保鲜盒</a>| <a href="list.php?catid=50006885" target="_blank">杯具</a>| <a href="list.php?catid=2137" target="_blank">安利日用</a>| <a href="list.php?catid=50010464" target="_blank">风扇</a>| <a href="list.php?catid=50010895" target="_blank">纸巾/湿巾</a>| <a href="list.php?catid=50011684" target="_blank">冷水壶</a>| <a href="list.php?catid=50011174" target="_blank"><span>爽身粉</span></a>| <a href="list.php?catid=50003820" target="_blank"><span>女性用品</span></a></p>
						</div>
						<div class="v3">
							<h1><span><a href="list.php?catid=50002766" target="_blank">零食食品</a>/<a href="list.php?catid=50010443" target="_blank">茶叶</a></span></h1>
							<p><a href="list.php?catid=50008611" target="_blank"><span>铁观音</span></a>| <a href="list.php?catid=50008430" target="_blank">奶酪/乳制小吃</a>| <a href="list.php?catid=50008056" target="_blank">糖果/果冻</a>| <a href="list.php?catid=50008430" target="_blank"><span>饮料/乳饮品/酒</span></a>| <a href="list.php?catid=50012339" target="_blank">普通营养膳食食品</a>| <a href="list.php?catid=50008059" target="_blank">山核桃/坚果/炒货</a>| <a href="list.php?catid=50008920" target="_blank">火腿/腌腊制品</a>| <a href="list.php?catid=50010550" target="_blank">饼干/糕点</a>| <a href="list.php?catid=50009857" target="_blank">藕粉/麦片/冲饮品</a>| <a href="list.php?catid=50008055" target="_blank"><span>巧克力/DIY巧克力</span></a></p>
						</div>
					</div>
					<div class="leibiebox1">
						<div class="v1">
							<h1><span><a href="list.php?catid=50008163" target="_blank">床上用品</a>/<a href="list.php?catid=2128" target="_blank">家饰</a></span></h1>
							<p><a href="list.php?catid=210111" target="_blank">蚊帐</a>| <a href="list.php?catid=50001865" target="_blank">被套</a>| <a href="list.php?catid=50008246" target="_blank">凉席套件</a>| <a href="list.php?catid=50010888" target="_blank">枕套/枕巾</a>| <a href="list.php?catid=50002777" target="_blank"><span>保健枕</span></a>| <a href="list.php?catid=50008779" target="_blank">床品套件</a>| <a href="list.php?catid=210103" target="_blank">床单/床裙</a>| <a href="list.php?catid=50010103" target="_blank"><span>毛巾/浴巾</span></a>| <a href="list.php?catid=50002789" target="_blank">挂帘/门帘</a>| <a href="list.php?catid=213004" target="_blank"><span>布艺制品</span></a>| <a href="list.php?catid=50008247" target="_blank">儿童床品</a>| <a href="list.php?catid=50010358" target="_blank">刺绣</a>| <a href="list.php?catid=50009221" target="_blank">音乐盒</a>| <a href="list.php?catid=50010298" target="_blank">储蓄罐</a>| <a href="list.php?catid=50007255" target="_blank">品牌家饰</a>| <a href="list.php?catid=50008275" target="_blank">钟/闹钟/钟表</a></p>
						</div>
						<div class="v2">
							<h1><span><a href="list.php?catid=50008165" target="_blank">妈妈用品</a>/<a href="list.php?catid=35" target="_blank">婴儿</a></span></h1>
							<p><a href="list.php?catid=50012374" target="_blank">防辐射服</a>| <a href="list.php?catid=50012354" target="_blank"><span>孕妇装</span></a>| <a href="list.php?catid=50012423" target="_blank">亲子装</a>| <a href="list.php?catid=50010537" target="_blank">连身衣/爬服/哈衣</a>| <a href="list.php?catid=50005997" target="_blank"><span>妈妈营养保健品</span></a>| <a href="list.php?catid=50005772" target="_blank"><span>婴幼儿营养品</span></a>| <a href="list.php?catid=50006000" target="_blank">妈妈护理</a>| <a href="list.php?catid=50006003" target="_blank">妈妈化妆品护肤品</a>| <a href="list.php?catid=50004439" target="_blank">宝宝洗浴护肤品</a>| <a href="list.php?catid=50012227" target="_blank">尿布垫/布制尿裤</a>| <a href="list.php?catid=50010391" target="_blank">束腹</a>| <a href="list.php?catid=50011819" target="_blank">胎教</a></p>
						</div>
						<div class="v3">
							<h1><span><a href="list.php?catid=50005700" target="_blank">流行手表</a>/<a href="list.php?catid=50011397" target="_blank">珠宝</a></span></h1>
							<p><a href="list.php?catid=50011399" target="_blank">翡翠</a>| <a href="list.php?catid=50011398" target="_blank">钻石</a>| <a href="list.php?catid=50011400" target="_blank">黄金/K黄金</a>| <a href="list.php?catid=50011402" target="_blank">红蓝宝石/贵重宝石</a>| <a href="list.php?catid=50011663" target="_blank">专柜swarovski水晶</a>| <a href="list.php?catid=50011401" target="_blank">铂金/PT</a>| <a href="list.php?catid=50010368" target="_blank"><span>太阳眼镜</span></a>| <a href="list.php?catid=2908" target="_blank">ZIPPO</a>| <a href="list.php?catid=50000467" target="_blank">打火机</a>| <a href="list.php?catid=50013957" target="_blank">天然玉石</a>| <a href="list.php?catid=290601" target="_blank">瑞士军刀</a>| <a href="list.php?catid=2909" target="_blank"><span>烟具/酒具</span></a>| <a href="list.php?catid=50007281" target="_blank">流行眼镜</a>| <a href="list.php?catid=50013864" target="_blank">时尚饰品</a></p>
						</div>
					</div>
					<div class="leibiebox2">
						<div class="v1">
							<h1><span><a href="list.php?catid=34" target="_blank">影音制品</a>/<a href="list.php?catid=33" target="_blank">书籍</a></span></h1>
							<p><a href="list.php?catid=50008266" target="_blank"><span>乐器</span></a>| <a href="list.php?catid=3415" target="_blank">CD/DVD</a>| <a href="list.php?catid=50000201" target="_blank">电影</a>| <a href="list.php?catid=50003291" target="_blank">电视剧</a>| <a href="list.php?catid=50011257" target="_blank">教育音像</a>| <a href="list.php?catid=50003679" target="_blank">动画碟</a>| <a href="list.php?catid=50005273" target="_blank"><span>戏曲综艺</span></a>| <a href="list.php?catid=50005272" target="_blank">生活百科</a>| <a href="list.php?catid=3331" target="_blank">外语/语言文字</a>| <a href="list.php?catid=50004806" target="_blank">文化</a>| <a href="list.php?catid=3306" target="_blank"><span>计算机/网络</span></a>| <a href="list.php?catid=50000177" target="_blank">自然科学</a>| <a href="list.php?catid=50004893" target="_blank">政治军事</a>| <a href="list.php?catid=50004645" target="_blank"><span>娱乐时尚</span></a>| <a href="list.php?catid=50004849" target="_blank">育儿书籍</a>| <a href="list.php?catid=50011016" target="_blank">二手书</a></p>
						</div>
						<div class="v2">
							<h1><span><a href="list.php?catid=50007218" target="_blank">办公设备</a>/<a href="list.php?catid=11" target="_blank">电脑</a></span></h1>
							<p><a href="list.php?catid=110514" target="_blank">打印机</a>| <a href="list.php?catid=111202" target="_blank">传真机</a>| <a href="list.php?catid=111404" target="_blank">墨盒/墨水</a>| <a href="list.php?catid=50008336" target="_blank"><span>财会用品</span></a>| <a href="list.php?catid=110501" target="_blank"><span>扫描仪</span></a>| <a href="list.php?catid=50009120" target="_blank">笔/书写工具 </a>| <a href="list.php?catid=110202" target="_blank">内存</a>| <a href="list.php?catid=110207" target="_blank">硬盘</a>| <a href="list.php?catid=50012307" target="_blank">有线鼠标</a>| <a href="list.php?catid=110507" target="_blank">移动硬盘</a>| <a href="list.php?catid=50003848" target="_blank"><span>台机电源</span></a>| <a href="list.php?catid=110209" target="_blank">网卡</a>| <a href="list.php?catid=110212" target="_blank">光驱/刻录机/DVD</a>| <a href="list.php?catid=110216" target="_blank">电视卡/电视盒</a>| <a href="list.php?catid=110808" target="_blank">路由器</a></p>
						</div>
						<div class="v3">
							<h1><span><a href="list.php?catid=50008097" target="_blank">家用电器</a>/<a href="list.php?catid=50008164" target="_blank">家具</a></span></h1>
							<p><a href="list.php?catid=50002417" target="_blank">五金与工具</a>| <a href="list.php?catid=50009806" target="_blank">地板</a>| <a href="list.php?catid=50009807" target="_blank">瓷砖</a>| <a href="list.php?catid=50013219" target="_blank">套装门</a>| <a href="list.php?catid=50003532" target="_blank">水龙头</a>| <a href="list.php?catid=50013475" target="_blank">电热水器</a>| <a href="list.php?catid=2172" target="_blank"><span>灯饰灯具</span></a>| <a href="list.php?catid=50013320" target="_blank">涂料/油漆</a>| <a href="list.php?catid=50005973" target="_blank">电动工具 </a>| <a href="list.php?catid=50013323" target="_blank">墙纸/壁纸</a>| <a href="list.php?catid=50002409" target="_blank">厨房洁具</a>| <a href="list.php?catid=50013927" target="_blank">户外折叠床</a>| <a href="list.php?catid=50003823" target="_blank"><span>笔记本电脑桌</span></a>| <a href="list.php?catid=50003710" target="_blank">充气家具</a>| <a href="list.php?catid=50015771" target="_blank">成套家具</a></p>
						</div>
					</div>
					<div class="leibiebox1">
						<div class="v1">
							<h1><span><a href="list.php?catid=14" target="_blank">数码产品</a>/<a href="list.php?catid=1512" target="_blank">手机</a></span></h1>
							<p><a href="list.php?catid=1101" target="_blank"><span>笔记本电脑</span></a>| <a href="list.php?catid=140116" target="_blank">单反镜头</a>| <a href="list.php?catid=50003479" target="_blank">三脚架</a>| <a href="list.php?catid=2807" target="_blank">摄像服务</a>| <a href="list.php?catid=1402" target="_blank"><span>数码摄像机</span></a>| <a href="list.php?catid=1403" target="_blank"><span>数码相机</span></a>| <a href="list.php?catid=1410" target="_blank">闪存卡/U盘/移动存储</a>| <a href="list.php?catid=50008156" target="_blank">PSP电影/动画</a>| <a href="list.php?catid=50010981" target="_blank">游戏机/掌机</a>| <a href="list.php?catid=50003437" target="_blank">游戏软件</a>| <a href="list.php?catid=50003436" target="_blank">游戏配件</a>| <a href="list.php?catid=1201" target="_blank">MP3/MP4</a></p>
						</div>
						<div class="v2">
							<h1><span><a href="list.php?catid=50008090" target="_blank">3C数码配件市场</a></span></h1>
							<p><a href="list.php?catid=50008681" target="_blank">电池</a>| <a href="list.php?catid=1201" target="_blank">MP3/MP4配件</a>| <a href="list.php?catid=150704" target="_blank">保护套/硅胶套</a>| <a href="list.php?catid=140912" target="_blank">读卡器</a>| <a href="list.php?catid=50005266" target="_blank">专用线控耳机</a>| <a href="list.php?catid=50006247" target="_blank">LCD屏幕贴膜/保护膜</a>| <a href="list.php?catid=50005718" target="_blank">笔记本散热底座/降温卡</a>| <a href="list.php?catid=50003327" target="_blank">数据线</a>| <a href="list.php?catid=50008482" target="_blank">数码相框</a>| <a href="list.php?catid=50010018" target="_blank">数码清洁用品</a>| <a href="list.php?catid=110511" target="_blank">手写输入/绘图板</a></p>
						</div>
						<div class="v3">
							<h1><span><a href="list.php?catid=50008907" target="_blank">手机卡类</a>/<a href="list.php?catid=99" target="_blank">游戏币</a></span></h1>
							<p><a href="list.php?catid=50002402" target="_blank"><span>移动卡号</span></a>| <a href="list.php?catid=50002403" target="_blank">联通卡号</a>| <a href="list.php?catid=150403" target="_blank">IP电话卡</a>| <a href="list.php?catid=150404" target="_blank"><span>网络电话卡</span></a>| <a href="list.php?catid=50006853" target="_blank">GPRS/CDMA上网卡</a>| <a href="list.php?catid=50005109" target="_blank">Skype充值专区</a>| <a href="list.php?catid=50003313" target="_blank">影音娱乐充值</a>| <a href="list.php?catid=50003309" target="_blank">平台专项卡</a>| <a href="list.php?catid=50011754" target="_blank">游戏代练</a>| <a href="list.php?catid=50010916" target="_blank">网页游戏</a>| <a href="list.php?catid=50011753" target="_blank">游戏帐号</a>| <a href="list.php?catid=50011751" target="_blank"><span>游戏装备</span></a></p>
						</div>
					</div>
				</div>
			</div>
			<div class="s_box5">
				<h1><span>3C数码配件</span></h1>
				<dl>
					<?php for($i = 0; $i < 24; $i++) { ?>
					<dt><span><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50008090"][$i]["num_iid"]) ?>" target="_blank">
					<script language="javascript">setPic("<?php echo base64_encode($taobaokeItemArray["50008090"][$i]["pic_url"]."_sum.jpg") ?>",80,80,"<?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50008090"][$i]["title"]) ?>")</script></a></span>
					<p id="ftitle"><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50008090"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50008090"][$i]["title"]) ?></a></p>
					<p><img border="0" src="img/level_<?php if(in_array($taobaokeItemArray["50008090"][$i]["seller_credit_score"],array(5,10,15,20))){echo $taobaokeItemArray["50008090"][$i]["seller_credit_score"]-1;}else{echo $taobaokeItemArray["50008090"][$i]["seller_credit_score"];} ?>.gif" ></p>
					</dt>
					<?php } ?>
					<div class="clear"></div>
				</dl>
			</div>
		</div>
		<div class="s_box_r">
			<div class="cat_s cat_no_mt">
				<h3><span>护肤热卖</span><a href="list.php?catid=1801" target="_blank">更多>></a></h3>
				<dl>
					<dt><span><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["1801"][7]["num_iid"]) ?>" target="_blank"><script language="javascript">setPic("<?php echo base64_encode($taobaokeItemArray["1801"][7]["pic_url"]."_sum.jpg") ?>",80,80,"<?php echo iconv("UTF-8","GBK",$taobaokeItemArray["1801"][7]["title"]) ?>")</script></a></span>
					<em><h4><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["1801"][7]["num_iid"]) ?>"  target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["1801"][7]["title"]) ?></a></h4>
					<p><b>￥<?php echo $taobaokeItemArray["1801"][7]["price"] ?>元</b><br><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["1801"][7]["num_iid"]) ?>" target="_blank">[详细购买]</a></p>
					</em></dt>
				</dl>
				<ul>
					<?php for($i = 8; $i < 19; $i++) { ?>
					<li><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["1801"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["1801"][$i]["title"]) ?></a></li>
					<?php } ?>
				</ul>
			</div>
			<div class="cat_s">
				<h3><span>彩妆热卖</span><a href="list.php?catid=50010788" target="_blank">更多>></a></h3>
				<dl>
					<dt><span><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50010788"][7]["num_iid"]) ?>" target="_blank"><script language="javascript">setPic("<?php echo base64_encode($taobaokeItemArray["50010788"][7]["pic_url"]."_sum.jpg") ?>",80,80,"<?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50010788"][7]["title"]) ?>")</script></a></span>
					<em><h4><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50010788"][7]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50010788"][7]["title"]) ?></a></h4>
					<p><b>￥<?php echo $taobaokeItemArray["50010788"][7]["price"] ?>元</b><br><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50010788"][7]["num_iid"]) ?>" target="_blank">[详细购买]</a></p>
					</em></dt>
				</dl>
				<ul>
					<?php for($i = 8; $i < 19; $i++) { ?>
					<li><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50010788"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50010788"][$i]["title"]) ?></a></li>
					<?php } ?>
				</ul>
			</div>
			<div class="cat_s">
				<h3><span>女装热卖</span><a href="list.php?catid=16" target="_blank">更多>></a></h3>
				<dl>
					<dt><span><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["16"][7]["num_iid"]) ?>" target="_blank"><script language="javascript">setPic("<?php echo base64_encode($taobaokeItemArray["16"][7]["pic_url"]."_sum.jpg") ?>",80,80,"<?php echo iconv("UTF-8","GBK",$taobaokeItemArray["16"][7]["title"]) ?>")</script></a></span>
					<em><h4><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["16"][7]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["16"][7]["title"]) ?></a></h4>
					<p><b>￥<?php echo $taobaokeItemArray["16"][7]["price"] ?>元</b><br><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["16"][7]["num_iid"]) ?>" target="_blank">[详细购买]</a></p>
					</em></dt>
				</dl>
				<ul>
					<?php for($i = 8; $i < 19; $i++) { ?>
					<li><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["16"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["16"][$i]["title"]) ?></a></li>
					<?php } ?>
				</ul>
			</div>
			<div class="cat_s">
				<h3><span>男装热卖</span><a href="list.php?catid=30" target="_blank">更多>></a></h3>
				<dl>
					<dt><span><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["30"][7]["num_iid"]) ?>" target="_blank"><script language="javascript">setPic("<?php echo base64_encode($taobaokeItemArray["30"][7]["pic_url"]."_sum.jpg") ?>",80,80,"<?php echo iconv("UTF-8","GBK",$taobaokeItemArray["30"][7]["title"]) ?>")</script></a></span>
					<em><h4><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["30"][7]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["30"][7]["title"]) ?></a></h4>
					<p><b>￥<?php echo $taobaokeItemArray["30"][7]["price"] ?>元</b><br><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["30"][7]["num_iid"]) ?>" target="_blank">[详细购买]</a></p>
					</em></dt>
				</dl>
				<ul>
					<?php for($i = 8; $i < 19; $i++) { ?>
					<li><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["30"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["30"][$i]["title"]) ?></a></li>
					<?php } ?>
				</ul>
			</div>
			<div class="cat_s">
				<h3><span>减肥热卖</span><a href="list.php?catid=50020280" target="_blank">更多>></a></h3>
				<dl>
					<dt><span><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50020280"][7]["num_iid"]) ?>" target="_blank"><script language="javascript">setPic("<?php echo base64_encode($taobaokeItemArray["50020280"][7]["pic_url"]."_sum.jpg") ?>",80,80,"<?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50020280"][7]["title"]) ?>")</script></a></span>
					<em><h4><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50020280"][7]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50020280"][7]["title"]) ?></a></h4>
					<p><b>￥<?php echo $taobaokeItemArray["50020280"][7]["price"] ?>元</b><br><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50020280"][7]["num_iid"]) ?>" target="_blank">[详细购买]</a></p>
					</em></dt>
				</dl>
				<ul>
					<?php for($i = 8; $i < 19; $i++) { ?>
					<li><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50020280"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50020280"][$i]["title"]) ?></a></li>
					<?php } ?>
				</ul>
			</div>
			<div class="cat_s">
				<h3><span>数码热卖</span><a href="list.php?catid=50008090" target="_blank">更多>></a></h3>
				<dl>
					<dt><span><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50008090"][24]["num_iid"]) ?>" target="_blank"><script language="javascript">setPic("<?php echo base64_encode($taobaokeItemArray["50008090"][24]["pic_url"]."_sum.jpg") ?>",80,80,"<?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50008090"][24]["title"]) ?>")</script></a></span>
					<em><h4><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50008090"][24]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50008090"][24]["title"]) ?></a></h4>
					<p><b>￥<?php echo $taobaokeItemArray["50008090"][24]["price"] ?>元</b><br><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50008090"][24]["num_iid"]) ?>" target="_blank">[详细购买]</a></p>
					</em></dt>
				</dl>
				<ul>
					<?php for($i = 25; $i < 36; $i++) { ?>
					<li><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50008090"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50008090"][$i]["title"]) ?></a></li>
					<?php } ?>
				</ul>
			</div>
		</div>
		<div class="clear"></div>
	</div>
<?php
include("footer.php");
?>
</div>
</body>
</html>