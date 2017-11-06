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
					<h1><span>�Ա���������Ʒ�Ƽ�</span></h1>
					<ul>
						<?php for($i = 5; $i < 7; $i++) { ?>
						<li><a href="list.php?catid=1801" class="catname">[����]</a><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["1801"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["1801"][$i]["title"]) ?></a></li>
						<?php } ?>
						<?php for($i = 5; $i < 7; $i++) { ?>
						<li><a href="list.php?catid=50010788" class="catname">[��ױ]</a><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50010788"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50010788"][$i]["title"]) ?></a></li>
						<?php } ?>
						<?php for($i = 5; $i < 7; $i++) { ?>
						<li><a href="list.php?catid=16" class="catname">[Ůװ]</a><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["16"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["16"][$i]["title"]) ?></a></li>
						<?php } ?>
						<?php for($i = 5; $i < 7; $i++) { ?>
						<li><a href="list.php?catid=30" class="catname">[��װ]</a><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["30"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["30"][$i]["title"]) ?></a></li>
						<?php } ?>
						<?php for($i = 24; $i < 27; $i++) { ?>
						<li><a href="list.php?catid=50008090" class="catname">[����]</a><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50008090"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50008090"][$i]["title"]) ?></a></li>
						<?php } ?>
						<?php for($i = 7; $i < 10; $i++) { ?>
						<li><a href="list.php?catid=50020280" class="catname">[����]</a><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50020280"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50020280"][$i]["title"]) ?></a></li>
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
					<h1><span>���ݻ���</span><a href="list.php?catid=1801" target="_blank">����</a></h1>
					<dl>
						<?php for($i = 0; $i < 3; $i++) { ?>
						<dt><span><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["1801"][$i]["num_iid"]) ?>" target="_blank"><script language="javascript">setPic("<?php echo base64_encode($taobaokeItemArray["1801"][$i]["pic_url"]."_100x100.jpg") ?>",0,0,"<?php echo iconv("UTF-8","GBK",$taobaokeItemArray["1801"][$i]["title"]) ?>")</script></a></span>
						<p id="gtitle"><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["1801"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["1801"][$i]["title"]) ?></a></p>
						<p id="gprice"><b>��</b><em><?php echo $taobaokeItemArray["1801"][$i]["price"] ?></em>Ԫ</p>
						</dt>
						<?php } ?>
					</dl>
					<ul>
						<?php for($i = 0; $i < 3; $i++) { ?>
						<li><a href="javascript:void();" onclick="clickurl('<?php echo base64_encode($taobaokeItemArray["1801"][$i]["shop_click_url"]) ?>');return false;" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["1801"][$i]["nick"]) ?>���Ա��콢���̡�</a><img border="0" src="img/level_<?php echo $taobaokeItemArray["1801"][$i]["seller_credit_score"] ?>.gif"></li>
						<?php } ?>
					</ul>
					<div class="s_box3_cat">
						<a target="_blank" href="list.php?catid=14">�������</a>
						<a target="_blank" href="list.php?catid=1512">�ֻ�</a> 
						<a target="_blank" href="list.php?catid=1101">�ʼǱ�</a>
						<a target="_blank" href="list.php?catid=1201">MP3/MP4</a>
						<a target="_blank" href="list.php?catid=50012164">�ƶ��洢</a> 
						<a target="_blank" href="list.php?catid=50008090">�������</a>
					</div>
				</div>
				<div class="s_box3_r">
					<h1><span>��ױ��ˮ</span><a href="list.php?catid=50010788" target="_blank">����</a></h1>
					<dl>
						<?php for($i = 0; $i < 3; $i++) { ?>
						<dt><span><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50010788"][$i]["num_iid"]) ?>" target="_blank"><script language="javascript">setPic("<?php echo base64_encode($taobaokeItemArray["50010788"][$i]["pic_url"]."_100x100.jpg") ?>",0,0,"<?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50010788"][$i]["title"]) ?>")</script></a></span>
						<p id="gtitle"><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50010788"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50010788"][$i]["title"]) ?></a></p>
						<p id="gprice"><b>��</b><em><?php echo $taobaokeItemArray["50010788"][$i]["price"] ?></em>Ԫ</p>
						</dt>
						<?php } ?>
					</dl>
					<ul>
						<?php for($i = 0; $i < 3; $i++) { ?>
						<li><a href="javascript:void();" onclick="clickurl('<?php echo base64_encode($taobaokeItemArray["50010788"][$i]["shop_click_url"]) ?>');return false;" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50010788"][$i]["nick"]) ?>���Ա��콢���̡�</a><img border="0" src="img/level_<?php echo $taobaokeItemArray["50010788"][$i]["seller_credit_score"] ?>.gif"></li>
						<?php } ?>
					</ul>
					<div class="s_box3_cat">
						<a target="_blank" href="list.php?catid=1801">����Ʒ</a> 
						<a target="_blank" href="list.php?catid=50010788">��ױ</a> 
						<a target="_blank" href="list.php?catid=50011998">�ֲ�����</a> 
						<a target="_blank" href="list.php?catid=50011977">����</a> 
						<a target="_blank" href="list.php?catid=50011981">��Ĥ</a> 
						<a target="_blank" href="list.php?catid=50011979">�沿����</a>
						<a target="_blank"  href="list.php?catid=50011983">���廤��</a>
					</div>
				</div>
				<div class="clear"></div>
			</div>
			<div class="s_box3">
				<div class="clear"></div>
				<div class="s_box3_l">
					<h1><span>ʱ��Ůװ</span><a href="list.php?catid=16" target="_blank">����</a></h1>
					<dl>
						<?php for($i = 0; $i < 3; $i++) { ?>
						<dt><span><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["16"][$i]["num_iid"]) ?>" target="_blank"><script language="javascript">setPic("<?php echo base64_encode($taobaokeItemArray["16"][$i]["pic_url"]."_100x100.jpg") ?>",0,0,"<?php echo iconv("UTF-8","GBK",$taobaokeItemArray["16"][$i]["title"]) ?>")</script></a></span>
						<p id="gtitle"><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["16"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["16"][$i]["title"]) ?></a></p>
						<p id="gprice"><b>��</b><em><?php echo $taobaokeItemArray["16"][$i]["price"] ?></em>Ԫ</p>
						</dt>
						<?php } ?>
					</dl>
					<ul>
						<?php for($i = 0; $i < 3; $i++) { ?>
						<li><a href="javascript:void();" onclick="clickurl('<?php echo base64_encode($taobaokeItemArray["16"][$i]["shop_click_url"]) ?>');return false;" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["16"][$i]["nick"]) ?>���Ա��콢���̡�</a><img border="0" src="img/level_<?php echo $taobaokeItemArray["16"][$i]["seller_credit_score"] ?>.gif"></li>
						<?php } ?>
					</ul>
					<div class="s_box3_cat" id="s_box3_cat">
						<a target="_blank" href="list.php?catid=50008899">���޷�</a> 
						<a target="_blank" href="list.php?catid=162103">ë��</a> 
						<a target="_blank" href="list.php?catid=162205">ţ�п�</a>
						<a target="_blank" href="list.php?catid=50008900">����</a> 
						<a target="_blank" href="list.php?catid=50000697">��֯��</a> 
						<a target="_blank" href="list.php?catid=50008904">ŮʿƤ��</a> 
						<a target="_blank" href="list.php?catid=50008883">������װ</a> 
					</div>
				</div>
				<div class="s_box3_r">
					<h1><span>������װ</span><a href="list.php?catid=30" target="_blank">����</a></h1>
					<dl>
						<?php for($i = 0; $i < 3; $i++) { ?>
						<dt><span><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["30"][$i]["num_iid"]) ?>" target="_blank"><script language="javascript">setPic("<?php echo base64_encode($taobaokeItemArray["30"][$i]["pic_url"]."_100x100.jpg") ?>",0,0,"<?php echo iconv("UTF-8","GBK",$taobaokeItemArray["30"][$i]["title"]) ?>")</script></a></span>
						<p id="gtitle"><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["30"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["30"][$i]["title"]) ?></a></p>
						<p id="gprice"><b>��</b><em><?php echo $taobaokeItemArray["30"][$i]["price"] ?></em>Ԫ</p>
						</dt>
						<?php } ?>
					</dl>
					<ul>
						<?php for($i = 0; $i < 3; $i++) { ?>
						<li><a href="javascript:void();" onclick="clickurl('<?php echo base64_encode($taobaokeItemArray["30"][$i]["shop_click_url"]) ?>');return false;" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["30"][$i]["nick"]) ?>���Ա��콢���̡�</a><img border="0" src="img/level_<?php echo $taobaokeItemArray["30"][$i]["seller_credit_score"] ?>.gif"></li>
						<?php } ?>
					</ul>
					<div class="s_box3_cat" id="s_box3_cat">
						<a target="_blank" href="list.php?catid=50011740">������Ь</a> 
						<a target="_blank" href="list.php?catid=50010158">�п�</a> 
						<a target="_blank" href="list.php?catid=50011159">����</a> 
						<a target="_blank" href="list.php?catid=50011167">���޷�</a> 
						<a target="_blank" href="list.php?catid=50011123">��ʿ����</a>
						<a target="_blank" href="list.php?catid=50010160">����</a> 
						<a target="_blank" href="list.php?catid=50010167">ţ�п�</a>
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
							<h1><span><a href="list.php?catid=16" target="_blank">Ůʿ��װ</a>/<a href="list.php?catid=1625" target="_blank">����</a></span></h1>
							<p><a href="list.php?catid=50011277" target="_blank">����</a>| <a href="list.php?catid=162105" target="_blank">С����/С����</a>|<a href="list.php?catid=162116" target="_blank"><span>ѩ����</span></a>| <a href="list.php?catid=162104" target="_blank">����</a>| <a href="list.php?catid=50000697" target="_blank">��֯��</a>| <a href="list.php?catid=50010850" target="_blank"><span>����ȹ</span></a>| <a href="list.php?catid=50000671" target="_blank">T��</a>| <a href="list.php?catid=50008901" target="_blank">����</a>| <a href="list.php?catid=162103" target="_blank">ë��</a>| <a href="list.php?catid=1622" target="_blank"><span>��׿�</span></a>| <a href="list.php?catid=50008881" target="_blank">����</a>| <a href="list.php?catid=50008883" target="_blank"><span>������װ</span></a>| <a href="list.php?catid=50006846" target="_blank">Ů��/����</a>| <a href="list.php?catid=50008890" target="_blank">�Ƕ�</a>| <a href="list.php?catid=50010395" target="_blank">��������</a>| <a href="list.php?catid=50008886" target="_blank">�Ҿӷ�</a>| <a href="list.php?catid=50008885" target="_blank">��ů����</a>| <a href="list.php?catid=50008888" target="_blank"><span>Ĩ��/����</span></a></p>
						</div>
						<div class="v2">
							<h1><span><a href="list.php?catid=50010404" target="_blank">ñ��Χ��</a>/<a href="list.php?catid=50006843" target="_blank">Ь��</a></span></h1>
							<p><a href="list.php?catid=50007003" target="_blank">Χ��/˿��</a>| <a href="list.php?catid=50009034" target="_blank">ͷ��</a>| <a href="list.php?catid=50009037" target="_blank">����</a>| <a href="list.php?catid=302909" target="_blank">���</a>| <a href="list.php?catid=50009035" target="_blank">����</a>| <a href="list.php?catid=50010406" target="_blank"><span>Ь��/Ƥ�����</span></a>| <a href="list.php?catid=50009047" target="_blank">�������</a>| <a href="list.php?catid=50009032" target="_blank">����/����/����</a>| <a href="list.php?catid=50010410" target="_blank">����</a>| <a href="list.php?catid=302902" target="_blank">���</a>| <a href="list.php?catid=50006843" target="_blank">ŮЬ</a>| <a href="list.php?catid=50012032" target="_blank">��Ь</a>| <a href="list.php?catid=50012033" target="_blank">����</a>| <a href="list.php?catid=50012052" target="_blank">��֯Ь</a>| <a href="list.php?catid=50010388" target="_blank"><span>�˶�Ь</span></a>| <a href="list.php?catid=50012042" target="_blank">����Ь</a>| <a href="list.php?catid=50012055" target="_blank">����Ь</a>| <a href="list.php?catid=50012028" target="_blank">ѥ��</a>| <a href="list.php?catid=50012035" target="_blank"><span>ƤЬ</span></a></p>
						</div>
						<div class="v3">
								<h1><span><a href="list.php?catid=50010788" target="_blank">���ݲ�ױ</a>/<a href="list.php?catid=1801" target="_blank">����</a></span></h1>
								<p><a href="list.php?catid=50010817" target="_blank">���ݹ���</a>| <a href="list.php?catid=50010797" target="_blank">���߱�</a>| <a href="list.php?catid=50010812" target="_blank"><span>��ױ��װ</span></a>| <a href="list.php?catid=50010808" target="_blank">����/�ں�</a>| <a href="list.php?catid=50010810" target="_blank">ָ����</a>| <a href="list.php?catid=50010796" target="_blank">��Ӱ</a>| <a href="list.php?catid=50011977" target="_blank">����</a>| <a href="list.php?catid=50011981" target="_blank">��Ĥ</a> | <a href="list.php?catid=50011979" target="_blank"><span>�沿����</span></a>| <a href="list.php?catid=50011983" target="_blank">���廤��</a>| <a href="list.php?catid=50011984" target="_blank">����˪</a>| <a href="list.php?catid=50011997" target="_blank">ȥ����</a>| <a href="list.php?catid=50011994" target="_blank"><span>��������</span></a>| <a href="list.php?catid=50011986" target="_blank">�۲�����</a>| <a href="list.php?catid=50011982" target="_blank"><span>�沿��ɹ</span></a>| <a href="list.php?catid=50011980" target="_blank">��˪</a></p>
						</div>
					</div>
					<div class="leibiebox2">
						<div class="v1">
							<h1><span><a href="list.php?catid=30" target="_blank">��ʿ��װ</a>/<a href="list.php?catid=1705" target="_blank">��Ʒ</a></span></h1>
							<p><a href="list.php?catid=50000436" target="_blank">T��</a>| <a href="list.php?catid=50010402" target="_blank">Polo��</a>| <a href="list.php?catid=50010159" target="_blank">����</a>| <a href="list.php?catid=50011123" target="_blank">����</a>| <a href="list.php?catid=50010167" target="_blank"><span>ţ�п�</span></a>| <a href="list.php?catid=3035" target="_blank">���п�</a>| <a href="list.php?catid=50011129" target="_blank">����</a>| <a href="list.php?catid=50011159" target="_blank"><span>����</span></a>| <a href="list.php?catid=50011165" target="_blank">����</a>| <a href="list.php?catid=50011161" target="_blank"><span>Ƥ��</span></a>| <a href="list.php?catid=50011167" target="_blank"><span>���޷�</span></a>| <a href="list.php?catid=50010160" target="_blank">����</a>| <a href="list.php?catid=50010158" target="_blank">�п�</a>| <a href="list.php?catid=50011130" target="_blank">������װ</a>| <a href="list.php?catid=50010393" target="_blank">��ʿ�ڿ�</a>| <a href="list.php?catid=50010394" target="_blank">����</a>| <a href="list.php?catid=50011740" target="_blank"><span>������Ь</span></a>| <a href="list.php?catid=50011699" target="_blank">�˶���/�˶���/����</a></p>
						</div>
						<div class="v2">
							<h1><span><a href="list.php?catid=21" target="_blank">�Ӽ�����</a>/<a href="list.php?catid=50002711" target="_blank">����</a></span></h1>
							<p><a href="list.php?catid=50009287" target="_blank">��������</a>| <a href="list.php?catid=50010101" target="_blank">������Ʒ</a> | <a href="list.php?catid=210207" target="_blank">����/����</a>| <a href="list.php?catid=50011176" target="_blank"><span>������/������/������Ʒ</span></a>| <a href="list.php?catid=215206" target="_blank"><span>�ƾ�/�Ʊ�/�ƺ�</span></a>| <a href="list.php?catid=2132" target="_blank">��ԡ��Ʒ</a>| <a href="list.php?catid=50000567" target="_blank">���ʺ�</a>| <a href="list.php?catid=50006885" target="_blank">����</a>| <a href="list.php?catid=2137" target="_blank">��������</a>| <a href="list.php?catid=50010464" target="_blank">����</a>| <a href="list.php?catid=50010895" target="_blank">ֽ��/ʪ��</a>| <a href="list.php?catid=50011684" target="_blank">��ˮ��</a>| <a href="list.php?catid=50011174" target="_blank"><span>ˬ���</span></a>| <a href="list.php?catid=50003820" target="_blank"><span>Ů����Ʒ</span></a></p>
						</div>
						<div class="v3">
							<h1><span><a href="list.php?catid=50002766" target="_blank">��ʳʳƷ</a>/<a href="list.php?catid=50010443" target="_blank">��Ҷ</a></span></h1>
							<p><a href="list.php?catid=50008611" target="_blank"><span>������</span></a>| <a href="list.php?catid=50008430" target="_blank">����/����С��</a>| <a href="list.php?catid=50008056" target="_blank">�ǹ�/����</a>| <a href="list.php?catid=50008430" target="_blank"><span>����/����Ʒ/��</span></a>| <a href="list.php?catid=50012339" target="_blank">��ͨӪ����ʳʳƷ</a>| <a href="list.php?catid=50008059" target="_blank">ɽ����/���/����</a>| <a href="list.php?catid=50008920" target="_blank">����/������Ʒ</a>| <a href="list.php?catid=50010550" target="_blank">����/���</a>| <a href="list.php?catid=50009857" target="_blank">ź��/��Ƭ/����Ʒ</a>| <a href="list.php?catid=50008055" target="_blank"><span>�ɿ���/DIY�ɿ���</span></a></p>
						</div>
					</div>
					<div class="leibiebox1">
						<div class="v1">
							<h1><span><a href="list.php?catid=50008163" target="_blank">������Ʒ</a>/<a href="list.php?catid=2128" target="_blank">����</a></span></h1>
							<p><a href="list.php?catid=210111" target="_blank">����</a>| <a href="list.php?catid=50001865" target="_blank">����</a>| <a href="list.php?catid=50008246" target="_blank">��ϯ�׼�</a>| <a href="list.php?catid=50010888" target="_blank">����/���</a>| <a href="list.php?catid=50002777" target="_blank"><span>������</span></a>| <a href="list.php?catid=50008779" target="_blank">��Ʒ�׼�</a>| <a href="list.php?catid=210103" target="_blank">����/��ȹ</a>| <a href="list.php?catid=50010103" target="_blank"><span>ë��/ԡ��</span></a>| <a href="list.php?catid=50002789" target="_blank">����/����</a>| <a href="list.php?catid=213004" target="_blank"><span>������Ʒ</span></a>| <a href="list.php?catid=50008247" target="_blank">��ͯ��Ʒ</a>| <a href="list.php?catid=50010358" target="_blank">����</a>| <a href="list.php?catid=50009221" target="_blank">���ֺ�</a>| <a href="list.php?catid=50010298" target="_blank">�����</a>| <a href="list.php?catid=50007255" target="_blank">Ʒ�Ƽ���</a>| <a href="list.php?catid=50008275" target="_blank">��/����/�ӱ�</a></p>
						</div>
						<div class="v2">
							<h1><span><a href="list.php?catid=50008165" target="_blank">������Ʒ</a>/<a href="list.php?catid=35" target="_blank">Ӥ��</a></span></h1>
							<p><a href="list.php?catid=50012374" target="_blank">�������</a>| <a href="list.php?catid=50012354" target="_blank"><span>�и�װ</span></a>| <a href="list.php?catid=50012423" target="_blank">����װ</a>| <a href="list.php?catid=50010537" target="_blank">������/����/����</a>| <a href="list.php?catid=50005997" target="_blank"><span>����Ӫ������Ʒ</span></a>| <a href="list.php?catid=50005772" target="_blank"><span>Ӥ�׶�Ӫ��Ʒ</span></a>| <a href="list.php?catid=50006000" target="_blank">���軤��</a>| <a href="list.php?catid=50006003" target="_blank">���軯ױƷ����Ʒ</a>| <a href="list.php?catid=50004439" target="_blank">����ϴԡ����Ʒ</a>| <a href="list.php?catid=50012227" target="_blank">�򲼵�/�������</a>| <a href="list.php?catid=50010391" target="_blank">����</a>| <a href="list.php?catid=50011819" target="_blank">̥��</a></p>
						</div>
						<div class="v3">
							<h1><span><a href="list.php?catid=50005700" target="_blank">�����ֱ�</a>/<a href="list.php?catid=50011397" target="_blank">�鱦</a></span></h1>
							<p><a href="list.php?catid=50011399" target="_blank">���</a>| <a href="list.php?catid=50011398" target="_blank">��ʯ</a>| <a href="list.php?catid=50011400" target="_blank">�ƽ�/K�ƽ�</a>| <a href="list.php?catid=50011402" target="_blank">������ʯ/���ر�ʯ</a>| <a href="list.php?catid=50011663" target="_blank">ר��swarovskiˮ��</a>| <a href="list.php?catid=50011401" target="_blank">����/PT</a>| <a href="list.php?catid=50010368" target="_blank"><span>̫���۾�</span></a>| <a href="list.php?catid=2908" target="_blank">ZIPPO</a>| <a href="list.php?catid=50000467" target="_blank">����</a>| <a href="list.php?catid=50013957" target="_blank">��Ȼ��ʯ</a>| <a href="list.php?catid=290601" target="_blank">��ʿ����</a>| <a href="list.php?catid=2909" target="_blank"><span>�̾�/�ƾ�</span></a>| <a href="list.php?catid=50007281" target="_blank">�����۾�</a>| <a href="list.php?catid=50013864" target="_blank">ʱ����Ʒ</a></p>
						</div>
					</div>
					<div class="leibiebox2">
						<div class="v1">
							<h1><span><a href="list.php?catid=34" target="_blank">Ӱ����Ʒ</a>/<a href="list.php?catid=33" target="_blank">�鼮</a></span></h1>
							<p><a href="list.php?catid=50008266" target="_blank"><span>����</span></a>| <a href="list.php?catid=3415" target="_blank">CD/DVD</a>| <a href="list.php?catid=50000201" target="_blank">��Ӱ</a>| <a href="list.php?catid=50003291" target="_blank">���Ӿ�</a>| <a href="list.php?catid=50011257" target="_blank">��������</a>| <a href="list.php?catid=50003679" target="_blank">������</a>| <a href="list.php?catid=50005273" target="_blank"><span>Ϸ������</span></a>| <a href="list.php?catid=50005272" target="_blank">����ٿ�</a>| <a href="list.php?catid=3331" target="_blank">����/��������</a>| <a href="list.php?catid=50004806" target="_blank">�Ļ�</a>| <a href="list.php?catid=3306" target="_blank"><span>�����/����</span></a>| <a href="list.php?catid=50000177" target="_blank">��Ȼ��ѧ</a>| <a href="list.php?catid=50004893" target="_blank">���ξ���</a>| <a href="list.php?catid=50004645" target="_blank"><span>����ʱ��</span></a>| <a href="list.php?catid=50004849" target="_blank">�����鼮</a>| <a href="list.php?catid=50011016" target="_blank">������</a></p>
						</div>
						<div class="v2">
							<h1><span><a href="list.php?catid=50007218" target="_blank">�칫�豸</a>/<a href="list.php?catid=11" target="_blank">����</a></span></h1>
							<p><a href="list.php?catid=110514" target="_blank">��ӡ��</a>| <a href="list.php?catid=111202" target="_blank">�����</a>| <a href="list.php?catid=111404" target="_blank">ī��/īˮ</a>| <a href="list.php?catid=50008336" target="_blank"><span>�ƻ���Ʒ</span></a>| <a href="list.php?catid=110501" target="_blank"><span>ɨ����</span></a>| <a href="list.php?catid=50009120" target="_blank">��/��д���� </a>| <a href="list.php?catid=110202" target="_blank">�ڴ�</a>| <a href="list.php?catid=110207" target="_blank">Ӳ��</a>| <a href="list.php?catid=50012307" target="_blank">�������</a>| <a href="list.php?catid=110507" target="_blank">�ƶ�Ӳ��</a>| <a href="list.php?catid=50003848" target="_blank"><span>̨����Դ</span></a>| <a href="list.php?catid=110209" target="_blank">����</a>| <a href="list.php?catid=110212" target="_blank">����/��¼��/DVD</a>| <a href="list.php?catid=110216" target="_blank">���ӿ�/���Ӻ�</a>| <a href="list.php?catid=110808" target="_blank">·����</a></p>
						</div>
						<div class="v3">
							<h1><span><a href="list.php?catid=50008097" target="_blank">���õ���</a>/<a href="list.php?catid=50008164" target="_blank">�Ҿ�</a></span></h1>
							<p><a href="list.php?catid=50002417" target="_blank">����빤��</a>| <a href="list.php?catid=50009806" target="_blank">�ذ�</a>| <a href="list.php?catid=50009807" target="_blank">��ש</a>| <a href="list.php?catid=50013219" target="_blank">��װ��</a>| <a href="list.php?catid=50003532" target="_blank">ˮ��ͷ</a>| <a href="list.php?catid=50013475" target="_blank">����ˮ��</a>| <a href="list.php?catid=2172" target="_blank"><span>���εƾ�</span></a>| <a href="list.php?catid=50013320" target="_blank">Ϳ��/����</a>| <a href="list.php?catid=50005973" target="_blank">�綯���� </a>| <a href="list.php?catid=50013323" target="_blank">ǽֽ/��ֽ</a>| <a href="list.php?catid=50002409" target="_blank">�������</a>| <a href="list.php?catid=50013927" target="_blank">�����۵���</a>| <a href="list.php?catid=50003823" target="_blank"><span>�ʼǱ�������</span></a>| <a href="list.php?catid=50003710" target="_blank">�����Ҿ�</a>| <a href="list.php?catid=50015771" target="_blank">���׼Ҿ�</a></p>
						</div>
					</div>
					<div class="leibiebox1">
						<div class="v1">
							<h1><span><a href="list.php?catid=14" target="_blank">�����Ʒ</a>/<a href="list.php?catid=1512" target="_blank">�ֻ�</a></span></h1>
							<p><a href="list.php?catid=1101" target="_blank"><span>�ʼǱ�����</span></a>| <a href="list.php?catid=140116" target="_blank">������ͷ</a>| <a href="list.php?catid=50003479" target="_blank">���ż�</a>| <a href="list.php?catid=2807" target="_blank">�������</a>| <a href="list.php?catid=1402" target="_blank"><span>���������</span></a>| <a href="list.php?catid=1403" target="_blank"><span>�������</span></a>| <a href="list.php?catid=1410" target="_blank">���濨/U��/�ƶ��洢</a>| <a href="list.php?catid=50008156" target="_blank">PSP��Ӱ/����</a>| <a href="list.php?catid=50010981" target="_blank">��Ϸ��/�ƻ�</a>| <a href="list.php?catid=50003437" target="_blank">��Ϸ���</a>| <a href="list.php?catid=50003436" target="_blank">��Ϸ���</a>| <a href="list.php?catid=1201" target="_blank">MP3/MP4</a></p>
						</div>
						<div class="v2">
							<h1><span><a href="list.php?catid=50008090" target="_blank">3C��������г�</a></span></h1>
							<p><a href="list.php?catid=50008681" target="_blank">���</a>| <a href="list.php?catid=1201" target="_blank">MP3/MP4���</a>| <a href="list.php?catid=150704" target="_blank">������/�轺��</a>| <a href="list.php?catid=140912" target="_blank">������</a>| <a href="list.php?catid=50005266" target="_blank">ר���߿ض���</a>| <a href="list.php?catid=50006247" target="_blank">LCD��Ļ��Ĥ/����Ĥ</a>| <a href="list.php?catid=50005718" target="_blank">�ʼǱ�ɢ�ȵ���/���¿�</a>| <a href="list.php?catid=50003327" target="_blank">������</a>| <a href="list.php?catid=50008482" target="_blank">�������</a>| <a href="list.php?catid=50010018" target="_blank">���������Ʒ</a>| <a href="list.php?catid=110511" target="_blank">��д����/��ͼ��</a></p>
						</div>
						<div class="v3">
							<h1><span><a href="list.php?catid=50008907" target="_blank">�ֻ�����</a>/<a href="list.php?catid=99" target="_blank">��Ϸ��</a></span></h1>
							<p><a href="list.php?catid=50002402" target="_blank"><span>�ƶ�����</span></a>| <a href="list.php?catid=50002403" target="_blank">��ͨ����</a>| <a href="list.php?catid=150403" target="_blank">IP�绰��</a>| <a href="list.php?catid=150404" target="_blank"><span>����绰��</span></a>| <a href="list.php?catid=50006853" target="_blank">GPRS/CDMA������</a>| <a href="list.php?catid=50005109" target="_blank">Skype��ֵר��</a>| <a href="list.php?catid=50003313" target="_blank">Ӱ�����ֳ�ֵ</a>| <a href="list.php?catid=50003309" target="_blank">ƽ̨ר�</a>| <a href="list.php?catid=50011754" target="_blank">��Ϸ����</a>| <a href="list.php?catid=50010916" target="_blank">��ҳ��Ϸ</a>| <a href="list.php?catid=50011753" target="_blank">��Ϸ�ʺ�</a>| <a href="list.php?catid=50011751" target="_blank"><span>��Ϸװ��</span></a></p>
						</div>
					</div>
				</div>
			</div>
			<div class="s_box5">
				<h1><span>3C�������</span></h1>
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
				<h3><span>��������</span><a href="list.php?catid=1801" target="_blank">����>></a></h3>
				<dl>
					<dt><span><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["1801"][7]["num_iid"]) ?>" target="_blank"><script language="javascript">setPic("<?php echo base64_encode($taobaokeItemArray["1801"][7]["pic_url"]."_sum.jpg") ?>",80,80,"<?php echo iconv("UTF-8","GBK",$taobaokeItemArray["1801"][7]["title"]) ?>")</script></a></span>
					<em><h4><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["1801"][7]["num_iid"]) ?>"  target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["1801"][7]["title"]) ?></a></h4>
					<p><b>��<?php echo $taobaokeItemArray["1801"][7]["price"] ?>Ԫ</b><br><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["1801"][7]["num_iid"]) ?>" target="_blank">[��ϸ����]</a></p>
					</em></dt>
				</dl>
				<ul>
					<?php for($i = 8; $i < 19; $i++) { ?>
					<li><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["1801"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["1801"][$i]["title"]) ?></a></li>
					<?php } ?>
				</ul>
			</div>
			<div class="cat_s">
				<h3><span>��ױ����</span><a href="list.php?catid=50010788" target="_blank">����>></a></h3>
				<dl>
					<dt><span><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50010788"][7]["num_iid"]) ?>" target="_blank"><script language="javascript">setPic("<?php echo base64_encode($taobaokeItemArray["50010788"][7]["pic_url"]."_sum.jpg") ?>",80,80,"<?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50010788"][7]["title"]) ?>")</script></a></span>
					<em><h4><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50010788"][7]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50010788"][7]["title"]) ?></a></h4>
					<p><b>��<?php echo $taobaokeItemArray["50010788"][7]["price"] ?>Ԫ</b><br><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50010788"][7]["num_iid"]) ?>" target="_blank">[��ϸ����]</a></p>
					</em></dt>
				</dl>
				<ul>
					<?php for($i = 8; $i < 19; $i++) { ?>
					<li><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50010788"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50010788"][$i]["title"]) ?></a></li>
					<?php } ?>
				</ul>
			</div>
			<div class="cat_s">
				<h3><span>Ůװ����</span><a href="list.php?catid=16" target="_blank">����>></a></h3>
				<dl>
					<dt><span><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["16"][7]["num_iid"]) ?>" target="_blank"><script language="javascript">setPic("<?php echo base64_encode($taobaokeItemArray["16"][7]["pic_url"]."_sum.jpg") ?>",80,80,"<?php echo iconv("UTF-8","GBK",$taobaokeItemArray["16"][7]["title"]) ?>")</script></a></span>
					<em><h4><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["16"][7]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["16"][7]["title"]) ?></a></h4>
					<p><b>��<?php echo $taobaokeItemArray["16"][7]["price"] ?>Ԫ</b><br><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["16"][7]["num_iid"]) ?>" target="_blank">[��ϸ����]</a></p>
					</em></dt>
				</dl>
				<ul>
					<?php for($i = 8; $i < 19; $i++) { ?>
					<li><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["16"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["16"][$i]["title"]) ?></a></li>
					<?php } ?>
				</ul>
			</div>
			<div class="cat_s">
				<h3><span>��װ����</span><a href="list.php?catid=30" target="_blank">����>></a></h3>
				<dl>
					<dt><span><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["30"][7]["num_iid"]) ?>" target="_blank"><script language="javascript">setPic("<?php echo base64_encode($taobaokeItemArray["30"][7]["pic_url"]."_sum.jpg") ?>",80,80,"<?php echo iconv("UTF-8","GBK",$taobaokeItemArray["30"][7]["title"]) ?>")</script></a></span>
					<em><h4><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["30"][7]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["30"][7]["title"]) ?></a></h4>
					<p><b>��<?php echo $taobaokeItemArray["30"][7]["price"] ?>Ԫ</b><br><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["30"][7]["num_iid"]) ?>" target="_blank">[��ϸ����]</a></p>
					</em></dt>
				</dl>
				<ul>
					<?php for($i = 8; $i < 19; $i++) { ?>
					<li><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["30"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["30"][$i]["title"]) ?></a></li>
					<?php } ?>
				</ul>
			</div>
			<div class="cat_s">
				<h3><span>��������</span><a href="list.php?catid=50020280" target="_blank">����>></a></h3>
				<dl>
					<dt><span><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50020280"][7]["num_iid"]) ?>" target="_blank"><script language="javascript">setPic("<?php echo base64_encode($taobaokeItemArray["50020280"][7]["pic_url"]."_sum.jpg") ?>",80,80,"<?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50020280"][7]["title"]) ?>")</script></a></span>
					<em><h4><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50020280"][7]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50020280"][7]["title"]) ?></a></h4>
					<p><b>��<?php echo $taobaokeItemArray["50020280"][7]["price"] ?>Ԫ</b><br><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50020280"][7]["num_iid"]) ?>" target="_blank">[��ϸ����]</a></p>
					</em></dt>
				</dl>
				<ul>
					<?php for($i = 8; $i < 19; $i++) { ?>
					<li><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50020280"][$i]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50020280"][$i]["title"]) ?></a></li>
					<?php } ?>
				</ul>
			</div>
			<div class="cat_s">
				<h3><span>��������</span><a href="list.php?catid=50008090" target="_blank">����>></a></h3>
				<dl>
					<dt><span><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50008090"][24]["num_iid"]) ?>" target="_blank"><script language="javascript">setPic("<?php echo base64_encode($taobaokeItemArray["50008090"][24]["pic_url"]."_sum.jpg") ?>",80,80,"<?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50008090"][24]["title"]) ?>")</script></a></span>
					<em><h4><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50008090"][24]["num_iid"]) ?>" target="_blank"><?php echo iconv("UTF-8","GBK",$taobaokeItemArray["50008090"][24]["title"]) ?></a></h4>
					<p><b>��<?php echo $taobaokeItemArray["50008090"][24]["price"] ?>Ԫ</b><br><a href="view.php?num_iid=<?php echo url_base64_encode($taobaokeItemArray["50008090"][24]["num_iid"]) ?>" target="_blank">[��ϸ����]</a></p>
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