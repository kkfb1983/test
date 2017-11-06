<?php include("inc/header.php")?>
<style>
/*body{ background:url(images/login_bgs.jpg) repeat-y center #DA1E6C; }*/
</style>
<script>
if($.browser.version == '6.0'){
function correctPNG() 
{
for(var i=0; i<document.images.length; i++)
{
var img = document.images[i];
var imgName = img.src.toUpperCase();
if (imgName.substring(imgName.length-3, imgName.length) == "PNG")
{
var imgID = (img.id) ? "id='" + img.id + "' " : "";
var imgClass = (img.className) ? "class='" + img.className + "' " : "";
var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' ";
var imgStyle = "display:inline-block;" + img.style.cssText;
if (img.align == "left") imgStyle = "float:left;" + imgStyle;
if (img.align == "right") imgStyle = "float:right;" + imgStyle;
if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle;
var strNewHTML = "<span "+ imgID + imgClass + imgTitle + "style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";" 
+ "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader" + "(src='" + img.src + "', sizingMethod='scale');\"></span>";
img.outerHTML = strNewHTML;
i = i-1;
}
}
}
window.attachEvent("onload", correctPNG);
}
</script>
</head>

<body>
<div class="black"></div>
<?php include("layer_music_camp2.php")?>

<div class="body_video">

<?php include("inc/top.php")?>
<div class="video_main">
	<h2 class="video_tit1"><img src="images/video_tit1.gif" /></h2>
	<div class="rollBox">
		<div class="LeftBotton" onMouseDown="ISL_GoUp()" onMouseUp="ISL_StopUp()" onMouseOut="ISL_StopUp()"><img src="images/page_left.png" /></div>
		<div class="Cont" id="ISL_Cont">
			<div class="ScrCont">
				<div id="List1">
					<!-- 视频列表 begin -->
					<div class="pic"><a href="javascript:void(0)" onClick="showLayer('layer7')"><img src="images/video_img.jpg" /></a></div>
					<div class="pic"><a href="javascript:void(0)" onClick="showLayer('layer7')"><img src="images/video_img.jpg" /></a></div>
					<div class="pic"><a href="javascript:void(0)" onClick="showLayer('layer7')"><img src="images/video_img.jpg" /></a></div>
					<div class="pic"><a href="javascript:void(0)" onClick="showLayer('layer7')"><img src="images/video_img.jpg" /></a></div>
					
					<!-- 视频列表 end -->
				</div>
				<div id="List2"></div>
			</div>
		</div>
		<div class="RightBotton" onMouseDown="ISL_GoDown()" onMouseUp="ISL_StopDown()" onMouseOut="ISL_StopDown()"><img src="images/page_right.png" /></div>
	</div>
	
	<h2 class="video_tit2"><img src="images/video_tit2.gif" /></h2>
	<div class="video_wall">
		<ul>
			<li><a href="#"><img src="images/video_wall01.jpg" width="223" height="143" /></a>
			<p><a href="#">3月</a></p></li>
			<li><a href="#"><img src="images/video_wall01.jpg" width="223" height="143" /></a>
			<p><a href="#">2月</a></p></li>
			<li><a href="#"><img src="images/video_wall01.jpg" width="223" height="143" /></a>
			<p><a href="#">1月</a></p></li>
		</ul>
		<div class="vedio_wall_page">
		<a href="#">首页</a>
		<a href="#">上一页</a>
		<a href="#">1</a>
		<a href="#">下一页</a>
		<a href="#">末页</a>
		</div>
	</div>
	
	
<script language="javascript" type="text/javascript">
<!--//--><![CDATA[//><!--
//图片滚动列表
var Speed = 10; //速度(毫秒)
var Space = 5; //每次移动(px)
var PageWidth = 190; //翻页宽度
var fill = 0; //整体移位
var MoveLock = false;
var MoveTimeObj;
var Comp = 0;
var AutoPlayObj = null;
var lists = getClassNameNum("pic");
	//alert(lists);
if(lists>=4){
	GetObj("List2").innerHTML = GetObj("List1").innerHTML;
	GetObj('ISL_Cont').scrollLeft = fill;
	GetObj("ISL_Cont").onmouseover = function(){clearInterval(AutoPlayObj);}
	GetObj("ISL_Cont").onmouseout = function(){AutoPlay();}
	AutoPlay();
}
function GetObj(objName){if(document.getElementById){return eval('document.getElementById("'+objName+'")')}else{return eval('document.all.'+objName)}}
function AutoPlay(){ //自动滚动
 clearInterval(AutoPlayObj);
 AutoPlayObj = setInterval('ISL_GoDown();ISL_StopDown();',5000); //间隔时间
}
function ISL_GoUp(){ //上翻开始
 if(MoveLock) return;
 clearInterval(AutoPlayObj);
 MoveLock = true;
 MoveTimeObj = setInterval('ISL_ScrUp();',Speed);
}
function ISL_StopUp(){ //上翻停止
 clearInterval(MoveTimeObj);
 if(GetObj('ISL_Cont').scrollLeft % PageWidth - fill != 0){
  Comp = fill - (GetObj('ISL_Cont').scrollLeft % PageWidth);
  CompScr();
 }else{
  MoveLock = false;
 }
 AutoPlay();
}
function ISL_ScrUp(){ //上翻动作
 if(GetObj('ISL_Cont').scrollLeft <= 0){GetObj('ISL_Cont').scrollLeft = GetObj('ISL_Cont').scrollLeft + GetObj('List1').offsetWidth}
 GetObj('ISL_Cont').scrollLeft -= Space ;
}
function ISL_GoDown(){ //下翻
 clearInterval(MoveTimeObj);
 if(MoveLock) return;
 clearInterval(AutoPlayObj);
 MoveLock = true;
 ISL_ScrDown();
 MoveTimeObj = setInterval('ISL_ScrDown()',Speed);
}
function ISL_StopDown(){ //下翻停止
 clearInterval(MoveTimeObj);
 if(GetObj('ISL_Cont').scrollLeft % PageWidth - fill != 0 ){
  Comp = PageWidth - GetObj('ISL_Cont').scrollLeft % PageWidth + fill;
  CompScr();
 }else{
  MoveLock = false;
 }
 AutoPlay();
}
function ISL_ScrDown(){ //下翻动作
 if(GetObj('ISL_Cont').scrollLeft >= GetObj('List1').scrollWidth){GetObj('ISL_Cont').scrollLeft = GetObj('ISL_Cont').scrollLeft - GetObj('List1').scrollWidth;}
 GetObj('ISL_Cont').scrollLeft += Space ;
}
function getClassNameNum(className){
		var all = document.all ? document.all : document.getElementsByTagName('*');
		var i = 0;
		for (var e = 0; e < all.length; e++) {
			if (all[e].className == className) {
				i++;
			}
		}
		return i;
}
function CompScr(){	
 var num;
 if(Comp == 0){MoveLock = false;return;}
 if(Comp < 0){ //上翻
  if(Comp < -Space){
   Comp += Space;
   num = Space;
  }else{
   num = -Comp;
   Comp = 0;
  }
  GetObj('ISL_Cont').scrollLeft -= num;
  setTimeout('CompScr()',Speed);
 }else{ //下翻
  if(Comp > Space){
   Comp -= Space;
   num = Space;
  }else{
   num = Comp;
   Comp = 0;
  }
  GetObj('ISL_Cont').scrollLeft += num;
  setTimeout('CompScr()',Speed);
 }
}
//--><!]]>
</script>

</div>
<?php include("inc/bottom.php")?>
<script type="text/javascript">
	function showLayer(_item){
		$(".black").show();
		_item="#"+_item;
		$(_item).show();
		moviePlayer.Play() 

	}
	function closeLayer(_item){
		$(".black").hide();
		_item="#"+_item;
		$(_item).hide();
		moviePlayer.Rewind() 
	}
</script>
</div></body>
</html>