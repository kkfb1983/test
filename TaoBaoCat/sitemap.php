<?php
error_reporting(0);
require_once 'inc/function.php';
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"> 
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>��վ��ͼ-<?php echo $sitetitle ?></title>
<meta name="keywords" content="��վ��ͼ,<?php echo $sitekey ?>" />
<meta name="description" content="��ӭ������վ��ͼ��<?php echo $sitedesc ?>" />
<link href="css/style.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div id="main">
<?php
include("header.php");
?>
	<div class="weizhi"><span>����λ�ã�</span><a href="/">��ҳ</a><a href="sitemap.php">��վ��ͼ</a></div>
	<div class="taoke_mainbox">
		<div class="clear"></div>
		<div class="taoke_mainboxl">
			<div class="taoke_left_catalogs">
				<h1><span>��վ��ͼ</span></h1>
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