<?php
error_reporting(0);
require_once 'inc/function.php';
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"> 
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>网站地图-<?php echo $sitetitle ?></title>
<meta name="keywords" content="网站地图,<?php echo $sitekey ?>" />
<meta name="description" content="欢迎进入网站地图。<?php echo $sitedesc ?>" />
<link href="css/style.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div id="main">
<?php
include("header.php");
?>
	<div class="weizhi"><span>您的位置：</span><a href="/">首页</a><a href="sitemap.php">网站地图</a></div>
	<div class="taoke_mainbox">
		<div class="clear"></div>
		<div class="taoke_mainboxl">
			<div class="taoke_left_catalogs">
				<h1><span>网站地图</span></h1>
			</div>
		</div>
		<div class="taoke_mainboxr">
			<div class="taoke_right_catalogs">
				<ul>
					<div class="clear"></div>
					<?php foreach ($result_cats as $row){ if(!ischengrencid($row["cid"])) { ?>
					<li><a href="list.php?catid=<?php echo $row["cid"] ?>"><?php echo iconv("UTF-8","GBK",$row["name"]) ?></a></li>
					<?php } } ?>
					<div class="clear"></div>
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