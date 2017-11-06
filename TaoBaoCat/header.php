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
			<a onclick="this.style.behavior='url(#default#homepage)';this.setHomePage('<?php echo $siteurl ?>');" href="#">设为首页</a>
			<span><?php echo $sitetitle ?>，为买家搜集【淘宝网】热卖商品！</span>
		</div>
		<div class="topr">
			<a href="http://www.tmall.com/go/chn/tbk_channel/tmall_new.php?pid=<?php echo $userpid ?>&eventid=101334" target="_blank">淘宝商城</a>
			<a href="http://www.taobao.com/go/chn/tbk_channel/channelcode.php?pid=<?php echo $userpid ?>&eventid=101329" target="_blank">综合频道</a>
			<a href="http://www.taobao.com/go/chn/tbk_channel/huangguan.php?pid=<?php echo $userpid ?>&eventid=101858" target="_blank">皇冠店铺</a>
			<a href="http://www.taobao.com/go/chn/tbk_channel/lady.php?pid=<?php echo $userpid ?>&eventid=101345" target="_blank">女人</a>
			<a href="http://www.taobao.com/go/chn/tbk_channel/man.php?pid=<?php echo $userpid ?>&eventid=101330" target="_blank">男人</a>
			<a href="http://www.taobao.com/go/chn/tbk_channel/beauty.php?pid=<?php echo $userpid ?>&eventid=101328" target="_blank">美容</a>
			<a href="http://www.taobao.com/go/chn/tbk_channel/jewelry.php?pid=<?php echo $userpid ?>&eventid=101331" target="_blank">鞋包</a>
			<a href="http://www.taobao.com/go/chn/tbk_channel/digital.php?pid=<?php echo $userpid ?>&eventid=101332" target="_blank">数码</a>
			<a href="http://www.taobao.com/go/chn/tbk_channel/baby.php?pid=<?php echo $userpid ?>&eventid=101326" target="_blank">居家</a>
			<a href="http://www.taobao.com/go/chn/tbk_channel/food.php?pid=<?php echo $userpid ?>&eventid=101865" target="_blank">食品</a>
			<a href="http://www.taobao.com/go/chn/tbk_channel/electric.php?pid=<?php echo $userpid ?>&eventid=101333" target="_blank">电器</a>
			<a href="javascript:window.external.addFavorite('<?php echo $siteurl ?>','<?php echo $sitetitle ?>');">收藏本站</a>
		</div>
	</div>
</div>
<div class="topbox">
	<div class="topboxl"><a href="<?php echo $siteurl ?>"><img src="img/logo.gif" alt="<?php echo $sitetitle ?>" /></a></div>
	<div class="topboxr">
		<div class="search_box"><form action="search.php" method="get" name="searchform1" target="_blank" id="searchform1">
			<input type="text" name="q" id="q" style="width:275px;">
			<span><select name="catid" style="width:220px; ">
			<option value="" selected="selected">所有分类</option>
			<?php foreach ($result_cats as $row){ if(!ischengrencid($row["cid"])) { ?>
				<option value="<?php echo $row["cid"] ?>">&nbsp;<?php echo iconv("UTF-8","GBK",$row["name"]) ?></option>
			<?php } } ?>
			</select></span>
			<button type="submit">搜 索</button></form>
		</div>
	</div>
</div>
<div class="menu">
	<ul>
		<li><a href="index.php">首页</a></li>
		<li><a href="list.php?catid=16">女装</a></li>
		<li><a href="list.php?catid=30">男装</a></li>
		<li><a href="list.php?catid=50008165">童装</a></li>
		<li><a href="list.php?catid=50013864">饰品</a></li>
		<li><a href="list.php?catid=50006843">女鞋</a></li>
		<li><a href="list.php?catid=1801">美容</a></li>
		<li><a href="list.php?catid=50006842">箱包</a></li>
		<li><a href="list.php?catid=50010788">彩妆</a></li>  
		<li><a href="list.php?catid=50010388">运动</a></li>
		<li><a href="list.php?catid=14">相机</a></li>
		<li><a href="list.php?catid=1512">手机</a></li>
		<li><a href="list.php?catid=50008090">数码</a></li>
		<li><a href="list.php?catid=1201">MP4</a></li>
		<li><a href="list.php?catid=50012164">U盘</a></li>
		<li><a href="list.php?catid=1101">电脑</a></li>
		<li><a href="list.php?catid=25">玩具</a></li>
		<li><a href="list.php?catid=50020280">保健</a></li>
		<li><a href="list.php?catid=50002766">食品</a></li>
		<li><a href="sitemap.php">更多</a></li>
	</ul>
</div>
<div class="navclass">
	<dl class="tk-list-01">
		<dt><span><a href="list.php?catid=16">女装/精品女装</a></span></dt>
		<dd>
			<a href="list.php?catid=50000671"><span>T恤</span></a> 
			<a href="list.php?catid=50010850">连衣裙</a>
			<a href="list.php?catid=50000697">针织衫</a> 
			<a href="list.php?catid=162116"><span>雪纺衫</span></a><br>
			<a href="list.php?catid=50008900">棉衣</a>
			<a href="list.php?catid=162103">毛衣</a> 
			<a href="list.php?catid=50008901">风衣</a> 
			<a href="list.php?catid=162104"><span>衬衫</span></a> 
			<a href="list.php?catid=50008904">皮衣</a><br>
			<a href="list.php?catid=50008899"><span>羽绒服</span></a>
			<a href="list.php?catid=1623">半身裙</a> 
			<a href="list.php?catid=162105"><span>吊带</span></a> 
			<a href="list.php?catid=1622">裤子</a><br>
			<a href="list.php?catid=50011277">短外套</a>
			<a href="list.php?catid=50013196">马甲</a> 
			<a href="list.php?catid=162205"><span>牛仔裤</span></a> 
			<a href="list.php?catid=1624"><span>职业装</span></a>
		</dd>
	</dl>
	<dl class="tk-list-02">
		<dt><span><a href="list.php?catid=30">男装/精品男装</a></span></dt>
		<dd>
			<a href="list.php?catid=50011167"><span>羽绒服</span></a> 
			<a href="list.php?catid=50011165">棉衣</a> 
			<a href="list.php?catid=50011159">风衣</a> 
			<a href="list.php?catid=50010158"><span>男式夹克</span></a><br>
			<a href="list.php?catid=50011130">西服套装</a> 
			<a href="list.php?catid=50010160"><span>西服</span></a> 
			<a href="list.php?catid=50005867">制服</a> 
			<a href="list.php?catid=50011123">衬衫</a><br>
			<a href="list.php?catid=50010167"><span>牛仔裤</span></a> 
			<a href="list.php?catid=3035">休闲裤</a> 
			<a href="list.php?catid=50011129"><span>西裤</span></a>
			<a href="list.php?catid=50011127">皮裤</a><br>
			<a href="list.php?catid=50001748">民族服装</a> 
			<a href="list.php?catid=50000557"><span>毛衣</span></a> 
			<a href="list.php?catid=50010159">卫衣</a>
			<a href="list.php?catid=50011161">皮衣</a>
		</dd>
	</dl>
	<dl class="tk-list-03">
		<dt><span><a href="list.php?catid=50013864">饰品</a>/<a href="list.php?catid=50006842">鞋包</a>/<a href="list.php?catid=50010388">运动鞋</a></span></dt>
		<dd>
			<a href="list.php?catid=50012028">女靴</a> 
			<a href="search.php?q=<?php echo urlencode('雪地靴')?>&catid=50012028">雪地靴</a>
			<a href="list.php?catid=50006843">女鞋</a>
			<a href="search.php?q=<?php echo urlencode('休闲鞋')?>&catid=50010388"><span>休闲鞋</span></a> <br>
			<a href="list.php?catid=50012032"><span>凉鞋</span></a> 
			<a href="list.php?catid=50012042">帆布鞋</a> 
			<a href="list.php?catid=50012010"><span>手袋</span></a> 
			<a href="list.php?catid=50012018">钱包</a> <br>
			<a href="list.php?catid=50013868">吊坠</a>
			<a href="list.php?catid=50012019"><span>旅行箱</span></a>
			<a href="list.php?catid=50012791">床品</a> 
			<a href="list.php?catid=50008163">家纺布艺</a><br>
			<a href="list.php?catid=50013864"><span>时尚饰品</span></a>
			<a href="list.php?catid=50011740">流行男鞋</a>
			<a href="list.php?catid=50010404"><span>服饰配件</span></a> 
		</dd>
	</dl>
	<dl class="tk-list-04">
		<dt><span><a href="list.php?catid=14">相机</a>/<a href="list.php?catid=1512">手机</a>/<a href="list.php?catid=1101">笔记本</a></span></dt>
		<dd>
			<a href="list.php?catid=1201">MP3/MP4</a>
			<a href="list.php?catid=50012164"><span>存储</span></a> 
			<a href="list.php?catid=50012579"><span>手机电池</span></a><br>
			<a href="list.php?catid=110508"><span>摄像头</span></a> 
			<a href="list.php?catid=50002918">配件</a>
			<a href="list.php?catid=50003321">电脑周边</a> <br>
			<a href="list.php?catid=50005050"><span>蓝牙耳机</span></a>
			<a href="list.php?catid=140912">读卡器</a> 
			<a href="list.php?catid=50003775"><span>外壳</span></a><br>
			<a href="search.php?q=<?php echo urlencode('诺基亚')?>&catid=1512"><span>诺基亚</span></a>
			<a href="search.php?q=<?php echo urlencode('摩托罗拉')?>&catid=1512">摩托罗拉</a> 
			<a href="search.php?q=<?php echo urlencode('三星')?>&catid=1512">三星</a> 
		</dd>
	</dl>  
	<dl class="tk-list-05">
		<dt><span><a href="list.php?catid=1801">美容护肤</a>/<a href="list.php?catid=50010788">彩妆</a>/<a href="list.php?catid=50010815">香水</a></span></dt>
		<dd>
			<a href="list.php?catid=1801"><span>护肤品</span></a> 
			<a href="list.php?catid=50010788">彩妆</a> 
			<a href="list.php?catid=50010815"><span>香水</span></a> 
			<a href="list.php?catid=50010817">化妆工具</a><br>
			<a href="list.php?catid=50010794">睫毛膏</a>
			<a href="list.php?catid=50010796"><span>眼影</span></a> 
			<a href="list.php?catid=50010810">美甲产品</a>
			<a href="list.php?catid=50010790">粉饼</a><br>
			<a href="list.php?catid=50010807">唇彩/唇蜜</a>
			<a href="list.php?catid=50010797"><span>眼线笔</span></a>
			<a href="list.php?catid=50010812">彩妆套装</a><br>
			<a href="list.php?catid=50011414">假发</a> 
			<a href="list.php?catid=50019247"><span>洗发护发</span></a>
			<a href="list.php?catid=50010794">睫毛增长液</a>
		</dd>
	</dl>	 
</div>