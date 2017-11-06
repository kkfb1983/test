<?php
error_reporting(0);
require_once 'inc/function.php';
$catid = !($_GET['catid'])?'16':intval($_GET['catid']);
$catid = getnochengrencid($catid);
$page = !($_GET['page'])?'0':intval($_GET['page']);
$sort = !($_GET['sort'])?'commissionNum_desc':$_GET['sort'];
$sp = !($_GET['sp']) ? '1' : $_GET['sp'];
$ep = !($_GET['ep']) ? '10000' : $_GET['ep'];
$catid = htmlspecialchars($catid);
$page = htmlspecialchars($page);
$sort = htmlspecialchars($sort);
$sp = htmlspecialchars($sp);
$ep = htmlspecialchars($ep);

$cat_name = iconv("GBK","UTF-8","所有分类");
$is_parent = "false";
if($catid != 0)
{
	$Taoapi->method = 'taobao.itemcats.get';
	$Taoapi->fields = 'cid,name,parent_cid,is_parent';
	$Taoapi->cids = $catid;
	$TaoapiCat = $Taoapi->Send('get','xml')->getArrayData();
	$result_cat = $TaoapiCat["item_cats"]["item_cat"];
	$cat_name = $result_cat["name"];
	$is_parent = $result_cat["is_parent"];
}

if($is_parent == "true")
{
	$Taoapi->method = 'taobao.itemcats.get';
	$Taoapi->fields = 'cid,name,parent_cid';
	$Taoapi->parent_cid = $catid;
	$TaoapiSubCats = $Taoapi->Send('get','xml')->getArrayData();
	$result_subcats = $TaoapiSubCats["item_cats"]["item_cat"];
}

$Taoapi->method = 'taobao.taobaoke.items.get';
$Taoapi->fields = 'num_iid,title,nick,pic_url,price,click_url,commission,commission_rate,commission_num,commission_volume,seller_credit_score,shop_click_url';
$Taoapi->nick = $usernick;
$Taoapi->cid = $catid;
$Taoapi->page_no = $page;
$Taoapi->page_size = '32';
$Taoapi->sort = $sort;
$Taoapi->start_price = $sp;
$Taoapi->end_price = $ep;
$TaoapiItems = $Taoapi->Send('get','xml')->getArrayData();
$taobaokeItem = $TaoapiItems["taobaoke_items"]["taobaoke_item"];
$totalResults = $TaoapiItems["total_results"];
if($totalResults == 1)
{
	$taobaokeItem = array(0=>$taobaokeItem);
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"> 
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title><?php echo iconv("UTF-8","GBK",$cat_name) ?>-<?php echo $sitetitle ?></title>
<meta name="keywords" content="<?php echo iconv("UTF-8","GBK",$cat_name) ?>,<?php echo $sitekey ?>" />
<meta name="description" content="欢迎选购<?php echo iconv("UTF-8","GBK",$cat_name) ?>类商品。<?php echo $sitedesc ?>" />
<script src="css/base64.js" language="javascript"></script>
<script src="css/function.js" language="javascript"></script>
<link href="css/style.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div id="main">
<?php
include("header.php");
?>
	<div class="weizhi"><span>您的位置：</span><a href="/">首页</a><a href="list.php">全部分类</a><a href="list.php?catid=<?php echo $catid ?>"><?php echo iconv("UTF-8","GBK",$cat_name) ?></a></div>
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
			<?php if($is_parent == "true") { ?>
			<div class="taoke_right_catalogs">
				<ul>
					<div class="clear"></div>
					<?php foreach ($result_subcats as $row){ if(!ischengrencid($row["cid"])) { ?>
					<li><a href="list.php?catid=<?php echo $row["cid"] ?>"><?php echo iconv("UTF-8","GBK",$row["name"]) ?></a></li>
					<?php } } ?>
					<div class="clear"></div>
				</ul>
			</div>
			<?php } ?>
			<div class="taoke_choose">
				<ul>
					<li<?php if($sort == commissionNum_desc) { echo ' id="this_choose"';} ?>><a href="list.php?catid=<?php echo $catid; ?>&sort=commissionNum_desc">销量从高到低</a></li>
					<li<?php if($sort == credit_desc) { echo ' id="this_choose"';} ?>><a href="list.php?catid=<?php echo $catid; ?>&sort=credit_desc">信用从高到低</a></li>
					<li<?php if($sort == price_desc) { echo ' id="this_choose"';} ?>><a href="list.php?catid=<?php echo $catid; ?>&sort=price_desc">价格从高到低</a></li>
					<li<?php if($sort == price_asc) { echo ' id="this_choose"';} ?>><a href="list.php?catid=<?php echo $catid; ?>&sort=price_asc">价格从低到高</a></li>
					<li<?php if($sort == delistTime_desc) { echo ' id="this_choose"';} ?>><a href="list.php?catid=<?php echo $catid; ?>&sort=delistTime_desc">时间从高到低</a></li>
					<li<?php if($sort == commissionRate_desc) { echo ' id="this_choose"';} ?>><a href="list.php?catid=<?php echo $catid; ?>&sort=commissionRate_desc">比率从高到低</a></li>
				</ul>
			</div>
			<div class="condition">
				<ul>
					<li class="tilist"><b>价格区间排列：</b></li>
					<li class='by-price'>
						<a href="list.php?catid=<?php echo $catid ?>&sort=<?php echo $sort ?>&sp=1&ep=100">1～100元</a>
						<a href="list.php?catid=<?php echo $catid ?>&sort=<?php echo $sort ?>&sp=100&ep=200">100～200元</a>
						<a href="list.php?catid=<?php echo $catid ?>&sort=<?php echo $sort ?>&sp=200&ep=500">200～500元</a>
						<a href="list.php?catid=<?php echo $catid ?>&sort=<?php echo $sort ?>&sp=500&ep=1000">500～1000元</a>
						<a href="list.php?catid=<?php echo $catid ?>&sort=<?php echo $sort ?>&sp=1000&ep=2000">1000～2000元</a>
						<a href="list.php?catid=<?php echo $catid ?>&sort=<?php echo $sort ?>&sp=2000&ep=5000">2000～5000元</a>
						<a href="list.php?catid=<?php echo $catid ?>&sort=<?php echo $sort ?>&sp=5000&ep=10000">5000元以上</a>
					</li>
				</ul>
			</div>
			<div class="taoke_listbox">
				<dl>
					<?php for($i = 0; $i < count($taobaokeItem); $i++) { ?>
					<dt><em><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItem[$i]["num_iid"]) ?>" target="_blank"><script language="javascript">setPic("<?php echo base64_encode($taobaokeItem[$i]["pic_url"]."_160x160.jpg") ?>",0,0,"<?php echo iconv("UTF-8","GBK",$taobaokeItem[$i]["title"]) ?>")</script></a></em>
					<p class="taoke_title"><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItem[$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItem[$i]["title"]) ?></a></p>
					<p>卖家信用：<img src="img/level_<?php echo $taobaokeItem[$i]["seller_credit_score"] ?>.gif"></p>
					<p class="taoke_price">淘宝价：<b><?php echo $taobaokeItem[$i]["price"] ?></b>元</p>
					<p class="taoke_sales">销售量：<b><?php echo $taobaokeItem[$i]["commission_num"] ?></b>件</p>
					<p class="taoke_nick">掌柜：<a href="javascript:void();" onclick="clickurl('<?php echo base64_encode($taobaokeItem[$i]["shop_click_url"]) ?>');return false;" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItem[$i]["nick"]) ?></a></p>
					</dt>
					<?php } ?>
				</dl>
			</div>
			<div id="pages">
				<?php require_once("pages.php");
				$page_size=28;
				$nums=$totalResults;
				$sub_pages=10;
				$pageCurrent=$page;
				$subPages=new SubPages($page_size,$nums,$pageCurrent,$sub_pages,"list.php?catid=".$catid."&sort=".$sort."&sp=".$sp."&ep=".$ep."&page=",2);
				?>
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