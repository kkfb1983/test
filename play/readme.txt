Vcastr2.0 是一款FLV player
可以用于各种新闻系统或者blog系统
Vcastr 拥有众多特点和自定义设置
现在提供免费下载 
http://www.ruochi.com/product/vcastr2/vcastr2.zip




主要功能:
.可以读取xml设置播放列表
.可以直接读取出flv地址进行播放
.多影片连续播放
.自定义尺寸，自动适应
.简洁播放器风格
.自定义循环播放
.支持最大化播放
.支持直接js嵌入

2.0新增更多的自定义选项，和界面设计
.自定义是否自动播放
.自定义是否连续
.自定义默认音量
.2种控制栏位置选择
.3种控制显示方式
.自定义色彩搭配
.支持加入网站logo和文字
.支持影片结尾swf扩展功能




使用方法:

1.js嵌入
方法一，直接copy下面代码，修改其中的 swf_width，swf_height，files，texts 参数


<script type="text/javascript">

var swf_width=240
var swf_height=240
var texts='幸福的脚丫预告片|变形金刚预告片|江南MV|魔兽世界-晚安部落'
var files='http://www.ruochi.com/product/vcastr/flv/happy_feet.flv|http://www.transformersmovie.com/transformers_640.flv|http://www.ruochi.com/product/vcastr/flv/江南.flv|http://www.ruochi.com/product/vcastr/flv/晚安部落.flv'
var config='0:自动播放|1:连续播放|100:默认音量|0:控制栏位置|2:控制栏显示|0x000033:主体颜色|60:主体透明度|0x66ff00:光晕颜色|0xffffff:图标颜色|0xffffff:文字颜色|:logo文字|:logo地址|:结束swf地址'


document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="'+ swf_width +'" height="'+ swf_height +'">');
document.write('<param name="movie" value="http://www.ruochi.com/product/vcastr2/vcastr2.swf"><param name="quality" value="high">');
document.write('<param name="menu" value="false"><param name=wmode value="opaque">');
document.write('<param name="FlashVars" value="vcastr_file='+files+'&vcastr_title='+texts+'&vcastr_config='+config+'">');
document.write('<embed src="http://www.ruochi.com/product/vcastr2/vcastr2.swf" wmode="opaque" FlashVars="vcastr_file='+files+'&vcastr_title='+texts+'&vcastr_config='+config+'" menu="false" quality="high" width="'+ swf_width +'" height="'+ swf_height +'" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />'); document.write('</object>'); 


</script>



2,方法二，简单直接传递影片地址


<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="240" height="180">
<param name="movie" value="/product/vcastr2/vcastr2.swf">
<param name="quality" value="high">
<param name="FlashVars" value="vcastr_file=http://www.ruochi.com/product/vcastr/flv/happy_feet.flv" /> 
<embed src="/product/vcastr2/vcastr2.swf?" FlashVars="vcastr_file=http://www.ruochi.com/product/vcastr/flv/happy_feet.flv" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="240" height="180"></embed>
</object>



其中
[FONT-COLOR=Green]vcastr_flie[/FONT-COLOR]=http://www.ruochi.com/product/vcastr/flv/happy_feet.flv|http://www.ruochi.com/product/vcastr/flv/江南.flv|http://www.ruochi.com/product/vcastr/flv/晚安部落.flv
直接给出flv文件地址，多个使用|分开

3,方法三，读取影片xml


<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="240" height="120">
<param name="movie" value="/product/vcastr2/vcastr2.swf">
<param name="quality" value="high">
<param name="FlashVars" value="vcastr_xml=http://www.ruochi.com/product/vcastr2/vcastr.xml" /> 
<embed src="/product/vcastr2/vcastr2.swf" FlashVars="vcastr_xml=http://www.ruochi.com/product/vcastr2/vcastr.xml" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="240" height="120"></embed>
</object>



其中
/product/vcastr2/vcastr2.swf?[FONT-COLOR=Green]vcastr_xml_url[/FONT-COLOR]=http://www.ruochi.com/product/vcastr/vcastr.xml
是播放列表的xml地址

4.高级选项

config 参数串说明：
参数由|分开，冒号前是参数变量，用户自行修改，冒号后面是参数说明，没有功效，

0:自动播放|1:连续播放|100:默认音量|1:控制栏位置|2:控制栏显示|0xff6600:主体颜色|60:主体透明度|0xffcc00:光晕颜色|0x000000:图标颜色|0xff0000:文字颜色|:logo文字|:logo地址|:结束swf地址

影片自动播放参数：0表示不自动播放，1表示自动播放
影片连续播放参数：0表示不连续播放，1表示连续循环播
默认音量参数    ：0-100 的数值，设置影片开始默认音量大小
控制栏位置参数  ：0表示在影片上浮动显示，1表示在影片下方显示
控制栏显示参数  ：0表示不显示；1表示一直显示；2表示鼠标悬停时显示；3表示开始不显示，鼠标悬停后显示

颜色都以0x开始16进制数字表示

主体颜色        ：播放控制栏颜色
主体透明度      ：播放控制栏透明度
图标颜色        ：按键图标颜色
光晕颜色        ：鼠标悬停时光晕颜色
文字颜色        ：播放器中文字颜色

logo文字        : 可以添加自己网站名称等信息(英文) 
logo地址        : 可以从外部读取logo图片,注意自己调整logo大小,支持图片格式和swf格式
结束swf地址     : 影片播放结束后,从外部读取swf文件，可以添加相关影片信息，影片分享等信息，需自己制作



<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="360" height="200">
<param name="movie" value="/product/vcastr2/vcastr2.swf">
<param name="quality" value="high">
<param name="FlashVars" value="vcastr_file=http://www.ruochi.com/product/vcastr/flv/happy_feet.flv|http://www.transformersmovie.com/transformers_640.flv|http://www.ruochi.com/product/vcastr/flv/江南.flv|http://www.ruochi.com/product/vcastr/flv/晚安部落.flv&vcastr_title=幸福的脚丫预告片|变形金刚预告片|江南MV|魔兽世界-晚安部落&vcastr_config=1:自动播放|1:连续播放|0:默认音量|0:控制栏位置|3:控制栏显示|0xff6600:主体颜色|60:主体透明度|0xffcc00:光晕颜色|0xffffff:图标颜色|0xff0000:文字颜色|Ruochi.com:logo文字|:logo地址|:结束swf地址" /> 
<embed src="/product/vcastr2/vcastr2.swf?" FlashVars="vcastr_file=http://www.ruochi.com/product/vcastr/flv/happy_feet.flv|http://www.transformersmovie.com/transformers_640.flv|http://www.ruochi.com/product/vcastr/flv/江南.flv|http://www.ruochi.com/product/vcastr/flv/晚安部落.flv&vcastr_title=幸福的脚丫预告片|变形金刚预告片|江南MV|魔兽世界-晚安部落&vcastr_config=1:自动播放|1:连续播放|0:默认音量|0:控制栏位置|3:控制栏显示|0xff6600:主体颜色|60:主体透明度|0xffcc00:光晕颜色|0xffffff:图标颜色|0xff0000:文字颜色|Ruochi.com:logo文字|:logo地址|:结束swf地址" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="360" height="200"></embed>
</object>





使用条款:
本软件完全免费,甚至可用作商业用途。
但不可对本软件进行反编译,修改和再次分发。
提供付费的个性化修改服务


有任何建议,可以发到:
http://www.ruochi.com/main/post/24.html
或者ruochi_com@163.com

Created By Ruochi.com
http://www.Ruochi.com
2007-1-1






