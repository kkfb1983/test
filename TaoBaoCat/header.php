<?php
$Taoapi->method = 'taobao.itemcats.get';
$Taoapi->fields = 'cid,name,parent_cid';
$Taoapi->parent_cid = '0';
$TaoapiCats = $Taoapi->Send('get','xml')->getArrayData();
$result_cats = $TaoapiCats["item_cats"]["item_cat"];
?>
<div class="top">
	<div class="top_box">
		<div class="topl">
			<a onclick="this.style.behavior='url(#default#homepage)';this.setHomePage('<?php echo $siteurl ?>');" href="#">��Ϊ��ҳ</a>
			<span><?php echo $sitetitle ?>��Ϊ����Ѽ����Ա�����������Ʒ��</span>
		</div>
		<div class="topr">
			<a href="http://www.tmall.com/go/chn/tbk_channel/tmall_new.php?pid=<?php echo $userpid ?>&eventid=101334" target="_blank">�Ա��̳�</a>
			<a href="http://www.taobao.com/go/chn/tbk_channel/channelcode.php?pid=<?php echo $userpid ?>&eventid=101329" target="_blank">�ۺ�Ƶ��</a>
			<a href="http://www.taobao.com/go/chn/tbk_channel/huangguan.php?pid=<?php echo $userpid ?>&eventid=101858" target="_blank">�ʹڵ���</a>
			<a href="http://www.taobao.com/go/chn/tbk_channel/lady.php?pid=<?php echo $userpid ?>&eventid=101345" target="_blank">Ů��</a>
			<a href="http://www.taobao.com/go/chn/tbk_channel/man.php?pid=<?php echo $userpid ?>&eventid=101330" target="_blank">����</a>
			<a href="http://www.taobao.com/go/chn/tbk_channel/beauty.php?pid=<?php echo $userpid ?>&eventid=101328" target="_blank">����</a>
			<a href="http://www.taobao.com/go/chn/tbk_channel/jewelry.php?pid=<?php echo $userpid ?>&eventid=101331" target="_blank">Ь��</a>
			<a href="http://www.taobao.com/go/chn/tbk_channel/digital.php?pid=<?php echo $userpid ?>&eventid=101332" target="_blank">����</a>
			<a href="http://www.taobao.com/go/chn/tbk_channel/baby.php?pid=<?php echo $userpid ?>&eventid=101326" target="_blank">�Ӽ�</a>
			<a href="http://www.taobao.com/go/chn/tbk_channel/food.php?pid=<?php echo $userpid ?>&eventid=101865" target="_blank">ʳƷ</a>
			<a href="http://www.taobao.com/go/chn/tbk_channel/electric.php?pid=<?php echo $userpid ?>&eventid=101333" target="_blank">����</a>
			<a href="javascript:window.external.addFavorite('<?php echo $siteurl ?>','<?php echo $sitetitle ?>');">�ղر�վ</a>
		</div>
	</div>
</div>
<div class="topbox">
	<div class="topboxl"><a href="<?php echo $siteurl ?>"><img src="img/logo.gif" alt="<?php echo $sitetitle ?>" /></a></div>
	<div class="topboxr">
		<div class="search_box"><form action="search.php" method="get" name="searchform1" target="_blank" id="searchform1">
			<input type="text" name="q" id="q" style="width:275px;">
			<span><select name="catid" style="width:220px; ">
			<option value="" selected="selected">���з���</option>
			<?php foreach ($result_cats as $row){ if(!ischengrencid($row["cid"])) { ?>
				<option value="<?php echo $row["cid"] ?>">&nbsp;<?php echo iconv("UTF-8","GBK",$row["name"]) ?></option>
			<?php } } ?>
			</select></span>
			<button type="submit">�� ��</button></form>
		</div>
	</div>
</div>
<div class="menu">
	<ul>
		<li><a href="index.php">��ҳ</a></li>
		<li><a href="list.php?catid=16">Ůװ</a></li>
		<li><a href="list.php?catid=30">��װ</a></li>
		<li><a href="list.php?catid=50008165">ͯװ</a></li>
		<li><a href="list.php?catid=50013864">��Ʒ</a></li>
		<li><a href="list.php?catid=50006843">ŮЬ</a></li>
		<li><a href="list.php?catid=1801">����</a></li>
		<li><a href="list.php?catid=50006842">���</a></li>
		<li><a href="list.php?catid=50010788">��ױ</a></li>  
		<li><a href="list.php?catid=50010388">�˶�</a></li>
		<li><a href="list.php?catid=14">���</a></li>
		<li><a href="list.php?catid=1512">�ֻ�</a></li>
		<li><a href="list.php?catid=50008090">����</a></li>
		<li><a href="list.php?catid=1201">MP4</a></li>
		<li><a href="list.php?catid=50012164">U��</a></li>
		<li><a href="list.php?catid=1101">����</a></li>
		<li><a href="list.php?catid=25">���</a></li>
		<li><a href="list.php?catid=50020280">����</a></li>
		<li><a href="list.php?catid=50002766">ʳƷ</a></li>
		<li><a href="sitemap.php">����</a></li>
	</ul>
</div>
<div class="navclass">
	<dl class="tk-list-01">
		<dt><span><a href="list.php?catid=16">Ůװ/��ƷŮװ</a></span></dt>
		<dd>
			<a href="list.php?catid=50000671"><span>T��</span></a> 
			<a href="list.php?catid=50010850">����ȹ</a>
			<a href="list.php?catid=50000697">��֯��</a> 
			<a href="list.php?catid=162116"><span>ѩ����</span></a><br>
			<a href="list.php?catid=50008900">����</a>
			<a href="list.php?catid=162103">ë��</a> 
			<a href="list.php?catid=50008901">����</a> 
			<a href="list.php?catid=162104"><span>����</span></a> 
			<a href="list.php?catid=50008904">Ƥ��</a><br>
			<a href="list.php?catid=50008899"><span>���޷�</span></a>
			<a href="list.php?catid=1623">����ȹ</a> 
			<a href="list.php?catid=162105"><span>����</span></a> 
			<a href="list.php?catid=1622">����</a><br>
			<a href="list.php?catid=50011277">������</a>
			<a href="list.php?catid=50013196">���</a> 
			<a href="list.php?catid=162205"><span>ţ�п�</span></a> 
			<a href="list.php?catid=1624"><span>ְҵװ</span></a>
		</dd>
	</dl>
	<dl class="tk-list-02">
		<dt><span><a href="list.php?catid=30">��װ/��Ʒ��װ</a></span></dt>
		<dd>
			<a href="list.php?catid=50011167"><span>���޷�</span></a> 
			<a href="list.php?catid=50011165">����</a> 
			<a href="list.php?catid=50011159">����</a> 
			<a href="list.php?catid=50010158"><span>��ʽ�п�</span></a><br>
			<a href="list.php?catid=50011130">������װ</a> 
			<a href="list.php?catid=50010160"><span>����</span></a> 
			<a href="list.php?catid=50005867">�Ʒ�</a> 
			<a href="list.php?catid=50011123">����</a><br>
			<a href="list.php?catid=50010167"><span>ţ�п�</span></a> 
			<a href="list.php?catid=3035">���п�</a> 
			<a href="list.php?catid=50011129"><span>����</span></a>
			<a href="list.php?catid=50011127">Ƥ��</a><br>
			<a href="list.php?catid=50001748">�����װ</a> 
			<a href="list.php?catid=50000557"><span>ë��</span></a> 
			<a href="list.php?catid=50010159">����</a>
			<a href="list.php?catid=50011161">Ƥ��</a>
		</dd>
	</dl>
	<dl class="tk-list-03">
		<dt><span><a href="list.php?catid=50013864">��Ʒ</a>/<a href="list.php?catid=50006842">Ь��</a>/<a href="list.php?catid=50010388">�˶�Ь</a></span></dt>
		<dd>
			<a href="list.php?catid=50012028">Ůѥ</a> 
			<a href="search.php?q=<?php echo urlencode('ѩ��ѥ')?>&catid=50012028">ѩ��ѥ</a>
			<a href="list.php?catid=50006843">ŮЬ</a>
			<a href="search.php?q=<?php echo urlencode('����Ь')?>&catid=50010388"><span>����Ь</span></a> <br>
			<a href="list.php?catid=50012032"><span>��Ь</span></a> 
			<a href="list.php?catid=50012042">����Ь</a> 
			<a href="list.php?catid=50012010"><span>�ִ�</span></a> 
			<a href="list.php?catid=50012018">Ǯ��</a> <br>
			<a href="list.php?catid=50013868">��׹</a>
			<a href="list.php?catid=50012019"><span>������</span></a>
			<a href="list.php?catid=50012791">��Ʒ</a> 
			<a href="list.php?catid=50008163">�ҷĲ���</a><br>
			<a href="list.php?catid=50013864"><span>ʱ����Ʒ</span></a>
			<a href="list.php?catid=50011740">������Ь</a>
			<a href="list.php?catid=50010404"><span>�������</span></a> 
		</dd>
	</dl>
	<dl class="tk-list-04">
		<dt><span><a href="list.php?catid=14">���</a>/<a href="list.php?catid=1512">�ֻ�</a>/<a href="list.php?catid=1101">�ʼǱ�</a></span></dt>
		<dd>
			<a href="list.php?catid=1201">MP3/MP4</a>
			<a href="list.php?catid=50012164"><span>�洢</span></a> 
			<a href="list.php?catid=50012579"><span>�ֻ����</span></a><br>
			<a href="list.php?catid=110508"><span>����ͷ</span></a> 
			<a href="list.php?catid=50002918">���</a>
			<a href="list.php?catid=50003321">�����ܱ�</a> <br>
			<a href="list.php?catid=50005050"><span>��������</span></a>
			<a href="list.php?catid=140912">������</a> 
			<a href="list.php?catid=50003775"><span>���</span></a><br>
			<a href="search.php?q=<?php echo urlencode('ŵ����')?>&catid=1512"><span>ŵ����</span></a>
			<a href="search.php?q=<?php echo urlencode('Ħ������')?>&catid=1512">Ħ������</a> 
			<a href="search.php?q=<?php echo urlencode('����')?>&catid=1512">����</a> 
		</dd>
	</dl>  
	<dl class="tk-list-05">
		<dt><span><a href="list.php?catid=1801">���ݻ���</a>/<a href="list.php?catid=50010788">��ױ</a>/<a href="list.php?catid=50010815">��ˮ</a></span></dt>
		<dd>
			<a href="list.php?catid=1801"><span>����Ʒ</span></a> 
			<a href="list.php?catid=50010788">��ױ</a> 
			<a href="list.php?catid=50010815"><span>��ˮ</span></a> 
			<a href="list.php?catid=50010817">��ױ����</a><br>
			<a href="list.php?catid=50010794">��ë��</a>
			<a href="list.php?catid=50010796"><span>��Ӱ</span></a> 
			<a href="list.php?catid=50010810">���ײ�Ʒ</a>
			<a href="list.php?catid=50010790">�۱�</a><br>
			<a href="list.php?catid=50010807">����/����</a>
			<a href="list.php?catid=50010797"><span>���߱�</span></a>
			<a href="list.php?catid=50010812">��ױ��װ</a><br>
			<a href="list.php?catid=50011414">�ٷ�</a> 
			<a href="list.php?catid=50019247"><span>ϴ������</span></a>
			<a href="list.php?catid=50010794">��ë����Һ</a>
		</dd>
	</dl>	 
</div>