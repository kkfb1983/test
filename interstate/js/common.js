function addBookmark(title,url) { //添加到收藏夹
	if (window.sidebar) {
		window.sidebar.addPanel(title, url,"");
	} else if( document.all ) {
		window.external.AddFavorite( url, title);
	} else if( window.opera && window.print ) {
		return true;
	}
}
function PlayLogin()
{			
	var UserInfo=new Array();
	UserInfo["username"]=document.getElementById("username").value;
	UserInfo["password"]=document.getElementById("password").value;
	UserInfo["keeplogin"]=document.getElementById("keeplogin").checked;			
	var SaveTime=(UserInfo["keeplogin"]) ? 30*24*3600 : 0;			
	sinaSSOController.login(UserInfo["username"],UserInfo["password"],SaveTime);	
}

function PlayLoginLayer()
{			
	var UserInfo=new Array();
	UserInfo["username"]=document.getElementById("username1").value;
	UserInfo["password"]=document.getElementById("password1").value;
	UserInfo["keeplogin"]=document.getElementById("keeplogin1").checked;			
	var SaveTime=(UserInfo["keeplogin"]) ? 30*24*3600 : 0;			
	sinaSSOController.login(UserInfo["username"],UserInfo["password"],SaveTime);	
}

function PlayLogout()
{
	sinaSSOController.logout();	
}

function copyurls() {
		var txt = "我和朋友现在都在参与“美好生活@中粮”活动，踏上发现美好之旅，链上美好生活~快来和我一起参加吧~ http://cofco.sina.com.cn/";
		var success = "链接复制成功，直接粘贴（Ctrl+V）在输入框中即可邀请好友来参加啦～";
		if (window.clipboardData) {
			window.clipboardData.clearData();
			window.clipboardData.setData("Text", txt);
			if(success==""||success==null){
				alert("复制成功！");
			}else{
				alert(success);
			}
		} else if (navigator.userAgent.indexOf("Opera") != -1) {
			window.location = txt;
		} else if (window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			} catch(e) {
				alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");
			}
			var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
			if (!clip) return;
			var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
			if (!trans) return;
			trans.addDataFlavor('text/unicode');
			var str = new Object();
			var len = new Object();
			var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
			var copytext = txt;
			str.data = copytext;
			trans.setTransferData("text/unicode", str, copytext.length * 2);
			var clipid = Components.interfaces.nsIClipboard;
			if (!clip) return false;
			clip.setData(trans, null, clipid.kGlobalClipboard);
			if(success==""||success==null){
				alert("复制成功！");
			}else{
				alert(success);
			}
		}
	}

function PlayLoginJs()
{
	var islogin=sinaSSOController.getSinaCookie("SUP");

	var login = (islogin) ? 1 : 0;
	var HTML="";
	if (!islogin)
	{
		HTML +='<div class="login"><h2><img src="images/010.gif" /></h2><dl><dd>登录名：</dd><dt><span><input type="text" name="username" id="username" class="input_001" /></span></dt></dl><dl><dd>密　码：</dd><dt><span><input type="password" name="password" id="password" class="input_001" />  <a href="http://login.sina.com.cn/cgi/getpwd/getpwd0.php?entry=sso" target="_blank" class="link_328311">忘记密码</a></span></dt></dl><dl><dd>&nbsp;</dd><dt><input type="checkbox" name="keeplogin" id="keeplogin" align="absmiddle" /> 记住我的密码&nbsp;|&nbsp;<a href="http://login.sina.com.cn/signup/signupmail.php?entry=active" target="_blank" class="link_328311">注册</a></dt></dl><dl><dd>&nbsp;</dd><dt>　　<input type="image" name="Submit2" src="images/btn_login.gif" value="提交" onclick="javascript:PlayLogin();void(0);" /></dt></dl><h3><img src="images/line_002.gif" /></h3></div> ';
	}
	else
	{//link_5a5a5a	
		HTML += '<div class="loginy"><dl><dd>';
		HTML += '<a href="http://t.sina.com.cn/'+islogin["uid"]+'" target="_blank"><img src="http://tp2.sinaimg.cn/'+islogin["uid"]+'/50/0" width="54" height="54" title="'+islogin["nick"]+'" /></a></dd><dt><a href="http://t.sina.com.cn/'+islogin["uid"]+'" target="_blank" class="link_5a5a5a">';
		HTML +=(islogin["nick"].length > 5) ? (islogin["nick"].substring(0,5))+".." : islogin["nick"];
　　	HTML +='</a> <a href="javascript:PlayLogout();" class="link_328311">退出</a><br /><br />粮票：&nbsp;<span class="style_001"><strong id="userTickerNum"></strong></span>&nbsp;张</dt></dl><dl><span id="userTickerList"></span><dd>&nbsp;</dd><dt><a href="myhome.php" class="link_328311">查看我获得的粮票</a><br /><a href="intro.php?id=4" class="link_328311">集粮票获大奖攻略</a><br /><a href="javascript:copyurls()" class="link_328311">邀请好友</a></dt></dl></div>';

		//世博闪拍
		if(location.href.indexOf("photo.php") != -1){
			photoUpload();
		}
		
		//发现中粮
		if(location.href.indexOf("found.php") != -1){
			foundUpload();
		}
	}
	if ( document.getElementById("login_status") )
	document.getElementById("login_status").innerHTML=HTML;
	if(islogin)
	{
		//粮票信息
		getUserTicker();
	}
}
function globalRun(){
	var islogin = sinaSSOController.getSinaCookie("SUP");
	if(islogin){
		$('#myhome').attr('href', 'myhome.php').unbind('click').removeAttr('onclick');
		//弹出关注浮层
		$.post("interface.php?rand="+ Math.random(),{ goto: "isalert"}, function(data){
			if(data == 1){
				openShowMsg("atten","","","");
			}
		});
		
		lastLogin(islogin);
		
		//用户粮票数
		$.post("interface.php?rand="+RndNum(1000),{ goto: "gettickernum"}, function(data){
			data = data < 0 ? 0 : data;
			$("#userTickerNum").text(data);												  
		});
		
	}else{
		$('#myhome').attr('href', 'javascript:;').click(function(){openShowMsg("login","","","");});
	}
}

function RndNum(num)
{
	var rnd;
	if (num<1) num=180;
	rnd=parseInt(Math.random()*(num-1))+1;	
	return rnd;
}
function lastLogin(islogin)
{
	if (islogin)
	{
		$.get("js/lastlogin_js.php?id="+RndNum(1000),function(data){});
	}
}

//获取URL参数
function Request(name)    
{    
     new RegExp("(^|&)"+name+"=([^&]*)").exec(window.location.search.substr(1));    
     return RegExp.$2    
}

function strlen(str){
	if(typeof str=="undefined"){
		return 0
	}
	var aMatch = jQuery.trim(str);
	aMatch = str.match(/[^\x00-\x80]/g);
	return(str.length+(!aMatch?0:aMatch.length));
}
function SetString(str,len)
{
	var strlen = 0; 
	var s = "";
	for(var i = 0;i < str.length;i++)
	{
		if(str.charCodeAt(i) > 128){
			strlen += 2;
		}else{ 
			strlen++;
		}
		s += str.charAt(i);
		if(strlen >= len){ 
			return s ;
		}
	}
	return s;
} 
function countCharNum(value,defaultNum,sid){
	var charLimit = 200;

	if ( defaultNum )
	{
		charLimit = charLimit-defaultNum;
	}

	var sLength = strlen(value);
	if(sLength > charLimit){
		var new_str = SetString(value,200);
		$('#'+sid).val(new_str);
		//$("#limitTip").html("已超出<strong>" + Math.ceil((sLength - charLimit)/2) + "<\/strong>字");
	}else{
		$("#limitTip").html("你还可以输入<strong>" + Math.ceil((charLimit - sLength)/2) + "<\/strong>字");
		return true;
	}
}


var start=0; 
var end=0; 
function savePos(textBox,sid, e){ 

//如果是Firefox(1.5)的话，方法很简单 
if(typeof(textBox.selectionStart) == "number"){ 
start = textBox.selectionStart; 
end = textBox.selectionEnd; 
} 

//下面是IE(6.0)的方法，麻烦得很，还要计算上'\n' 
else if(document.selection){ 
var range = document.selection.createRange(); 
if(range.parentElement().id == textBox.id){ 
// create a selection of the whole textarea 
var range_all = document.body.createTextRange(); 
range_all.moveToElementText(textBox); 
//两个range，一个是已经选择的text(range)，一个是整个textarea(range_all) 
//range_all.compareEndPoints()比较两个端点，如果range_all比range更往左(further to the left)，则 
//返回小于0的值，则range_all往右移一点，直到两个range的start相同。 
// calculate selection start point by moving beginning of range_all to beginning of range 
for (start=0; range_all.compareEndPoints("StartToStart", range) < 0; start++) 
range_all.moveStart('character', 1); 
// get number of line breaks from textarea start to selection start and add them to start 
// 计算一下\n 
for (var i = 0; i <= start; i ++){ 
if (textBox.value.charAt(i) == '\n') 
start++; 
} 

// create a selection of the whole textarea 
var range_all = document.body.createTextRange(); 
range_all.moveToElementText(textBox); 
// calculate selection end point by moving beginning of range_all to end of range 
for (end = 0; range_all.compareEndPoints('StartToEnd', range) < 0; end ++) 
range_all.moveStart('character', 1); 
// get number of line breaks from textarea start to selection end and add them to end 
for (var i = 0; i <= end; i ++){ 
if (textBox.value.charAt(i) == '\n') 
end ++; 
} 
} 
}

if(sid){
	countCharNum($('#'+sid).val(),0,sid);
}
}

function add(v,ipId, xHtmlId){
	var textBox = $("#"+ipId); 
	//log(textBox.val())
	var pre = textBox.val().substr(0, start); 
	var post = textBox.val().substr(end); 
	textBox.val(pre + v + post); 
	countCharNum($("#"+ipId).val(),0);
}
//获取复选框值
function getChk(name)
{
	var chk_value =[];    
	$('input[name="'+name+'"]:checked').each(function(){    
		chk_value.push($(this).val());    
	});
	return chk_value.length==0 ?'':chk_value;
}
$(document).ready(function(){
	//globalRun();
})