<?php
error_reporting(0);
require_once 'inc/function.php';
$num_iid = $_GET['num_iid'];
$pat_num_iid = "/^[0-9]+$/i";
if(!preg_match($pat_num_iid,$num_iid))
{
	$num_iid = url_base64_decode($num_iid);
}
$num_iid = htmlspecialchars($num_iid);

$Taoapi->method = 'taobao.taobaoke.items.detail.get';
$Taoapi->fields = 'cid,title,nick,post_fee,express_fee,ems_fee,pic_url,price,num,desc,list_time,delist_time,location.state,location.city,click_url,shop_click_url,seller_credit_score,props';
$Taoapi->nick = $usernick;
$Taoapi->num_iids = $num_iid;
$TaoapiItem = $Taoapi->Send('get','xml')->getArrayData();
$result_item = $TaoapiItem["taobaoke_item_details"]["taobaoke_item_detail"];

$click_url = $result_item["click_url"];
$shop_click_url = $result_item["shop_click_url"];
$seller_credit_score = $result_item["seller_credit_score"];
$title = $result_item["item"]["title"];
$nick = $result_item["item"]["nick"];
$post_fee = $result_item["item"]["post_fee"];
$express_fee = $result_item["item"]["express_fee"];
$ems_fee = $result_item["item"]["ems_fee"];
$catid = $result_item["item"]["cid"];
$desc = $result_item["item"]["desc"];
$num = $result_item["item"]["num"];
$price = $result_item["item"]["price"];
$pic_url = $result_item["item"]["pic_url"];
$list_time = $result_item["item"]["list_time"];
$delist_time = $result_item["item"]["delist_time"];
$state = $result_item["item"]["location"]["state"];
$city = $result_item["item"]["location"]["city"];
$props = $result_item["item"]["props"];

if(is_array($click_url))
{
	$click_url = "http://search8.taobao.com/browse/search_auction.htm?q=".urlencode(iconv("UTF-8","GBK",$title))."&pid=".$userpid."&search_type=auction&commend=all&at_topsearch=1";
}
if(is_array($shop_click_url))
{
	$shop_click_url = "http://search8.taobao.com/browse/search_auction.htm?q=".urlencode(iconv("UTF-8","GBK",$title))."&pid=".$userpid."&search_type=auction&commend=all&at_topsearch=1";
}

$Taoapi->method = 'taobao.itempropvalues.get';
$Taoapi->cid = $catid;
$Taoapi->fields = 'prop_name,name_alias,name,status,sort_order';
$Taoapi->pvs = $props;
$Taoapiprops = $Taoapi->Send('get','xml')->getArrayData();
$result_props = $Taoapiprops['prop_values']['prop_value'];

$cat_name = iconv("GBK","UTF-8","所有分类");
if($catid != 0)
{
	$Taoapi->method = 'taobao.itemcats.get';
	$Taoapi->fields = 'cid,name,parent_cid,is_parent';
	$Taoapi->cids = $catid;
	$TaoapiCat = $Taoapi->Send('get','xml')->getArrayData();
	$result_cat = $TaoapiCat["item_cats"]["item_cat"];
	$cat_name  = $result_cat["name"];
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"> 
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title><?php echo iconv("UTF-8","GBK",$title) ?>-<?php echo iconv("UTF-8","GBK",$cat_name) ?>-<?php echo $sitetitle ?></title>
<meta name="keywords" content="<?php echo iconv("UTF-8","GBK",$title) ?>,<?php echo iconv("UTF-8","GBK",$cat_name) ?>,<?php echo $sitekey ?>" />
<meta name="description" content="欢迎查看<?php echo iconv("UTF-8","GBK",$title) ?>商品详情。欢迎选购<?php echo iconv("UTF-8","GBK",$cat_name) ?>类商品。<?php echo $sitedesc ?>" />
<script src="css/base64.js" language="javascript"></script>
<script src="css/function.js" language="javascript"></script>
<link href="css/style.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div id="main">
<?php
include("header.php");
?>
	<div class="weizhi"><span>您的位置：</span><a href="/">首页</a><a href="list.php">所有分类</a><a href="list.php?catid=<?php echo $catid ?>"><?php echo iconv("UTF-8","GBK",$cat_name) ?></a></div>
	<div class="taoke_mainbox">
		<div class="clear"></div>
		<div class="taoke_mainboxl">
			<div class="taoke_left_catalogs">
				<h1><span>商品分类</span></h1>
				<ul>
					<?php foreach ($result_cats as $row){ if(!ischengrencid($row["cid"])) { ?>
						<li class="cat_<?php echo $row["cid"] ?>"><a href="list.php?catid=<?php echo $row["cid"] ?>"><?php echo iconv("UTF-8","GBK",$row["name"]) ?></a></li>
					<?php } } ?>
				</ul>
			</div>
		</div>
		<div class="taoke_mainboxr">
			<div class="titems_title"><h1><?php echo iconv("UTF-8", "GBK",$title) ?></h1></div>
			<div class="titemsbox">
				<div class="titemsbox_l">
				<a href="javascript:void();" onclick="clickurl('<?php echo base64_encode($click_url) ?>');return false;" target="_blank"><script language="javascript">setPic("<?php echo base64_encode($pic_url."_310x310.jpg") ?>",0,0,"<?php echo iconv("UTF-8","GBK",$title) ?>")</script></a>
				</div>
				<div class="titemsbox_r">
					<ul>
					<li class="price">淘 宝 价：<b><?php echo $price; ?></b>元</li>
					<li>宝贝运费：<span>平邮：<?php echo $post_fee; ?>元</span><span>快递：<?php echo $express_fee; ?>元</span><span>EMS：<?php echo $ems_fee; ?>元</span></li>
					<li>掌柜名称：<a target="_blank" href="javascript:void();" onclick="clickurl('<?php echo base64_encode($shop_click_url) ?>');return false;"><?php echo iconv("UTF-8", "GBK",$nick) ?></a></li>
					<li>卖家信用：<img src="img/level_<?php echo $seller_credit_score; ?>.gif"></li>
					<li>所在地区：<?php echo iconv("UTF-8", "GBK",$state) ?>-<?php echo iconv("UTF-8", "GBK",$city) ?></li>
					<li>上架时间：<?php echo $list_time; ?></li>
					<li>下架时间：<?php echo $delist_time; ?></li>
					<li class="num">商品数量：<b><?php echo $num; ?></b>件</li>
					</ul>
					<div class="go_buy">
						<a target="_blank" href="javascript:void();" onclick="clickurl('<?php echo base64_encode($click_url) ?>');return false;"><img src="img/buy.gif"></a>
						<a target="_blank" href="javascript:void();" onclick="clickurl('<?php echo base64_encode($shop_click_url) ?>');return false;"><img src="img/shop.gif"></a>
					</div>
				</div><div class="clear"></div>
			</div>
			<div class="titems_info">
				<div class="ti_box">
					<div class="ti_1">
						<li class="ti_nav">宝贝详情</li>
					</div>
				</div>
				<div class="product_props">
					<ul>
						<?php for($i = 0; $i < count($result_props); $i++) { ?>
						<li><img src="img/doth.gif"/> <?php echo iconv("UTF-8", "GBK",$result_props[$i]["prop_name"]) ?>：<?php echo iconv("UTF-8", "GBK",$result_props[$i]["name"]) ?></li>
						<?php } ?>
					</ul>
				</div>
				<div id="titem_desc">
					<?php 
					$pat = "/<(\/?)(script|i?frame|style|html|body|title|link|a|meta|\?|\%)([^>]*?)>/isU";
					$descclear = preg_replace($pat,"",$desc);
					$descclear = iconv("UTF-8", "GBK",$descclear);
					$descclear_nohtml = strip_tags($descclear);
					echo $descclear_nohtml;
					$descclear = base64_encode($descclear);
					?>
					<script language="javascript" type="text/javascript">tihuan("<?php echo $descclear;?>");</script>
				</div>
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