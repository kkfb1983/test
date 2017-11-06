
var divStr = "";
var topStr = "";

function disDiv(num)
{
	checkDivTxt(num);
	document.getElementById("rightDiv" + num).style.display = "block";
	document.getElementById("errDiv" + num).style.display = "none";
	document.getElementById("rightDiv" + num).style.top = topStr;
}

function hideDiv(num)
{
	checkDivTxt(num);
	if(document.getElementById("txt" + num).value == "")
	{
		document.getElementById("rightDiv" + num).style.display = "none";
		document.getElementById("errDiv" + num).value = divStr;
		document.getElementById("errDiv" + num).style.top = topStr;
		document.getElementById("errDiv" + num).style.display = "block";
	}
	else
	{
		document.getElementById("rightDiv" + num).style.display = "none";
		document.getElementById("errDiv" + num).style.display = "none";
	}
	
	
}

function checkDivTxt(num)
{

	switch(num)
	{
		case "1":
			topStr = "156px";
			break;
		case "2":
			topStr = "183px";
			break;
		case "3":
			topStr = "210px";
			break;
		case "4":
			topStr = "237px";
			break;
		case "5":
			topStr = "333px";
			break;
		case "6":
			topStr = "360px";
	}
}

function onSub()
{
	if(document.getElementById("txt1").value == "")
	{
		alert("用户名不能为空！");
		return;
	}
	if(document.getElementById("txt1").value.length < 6)
	{
		alert("用户名长度不能小于6 ！");
		return;
	}
	if(document.getElementById("txt2").value == "")
	{
		alert("密码不能为空！");
		return;
	}
	if(document.getElementById("txt2").value.length < 6)
	{
		alert("密码长度不能小于6 ！");
		return;
	}
	if(document.getElementById("txt3").value == "")
	{
		alert("确认密码不能为空！");
		return;
	}
	if(document.getElementById("txt3").value != document.getElementById("txt2").value)
	{
		alert("确认密码必须与密码一致！");
		return;
	}
	if(document.getElementById("txt4").value == "")
	{
		alert("昵称不能为空！");
		return;
	}
	if(document.getElementById("txt5").value == "")
	{
		alert("邮箱不能为空！");
		return;
	}
	if(document.getElementById("txt6").value == "")
	{
		alert("验证码不能为空！");
		return;
	}
	else
	{
		document.getElementById('userinfo').submit();//跳转，提交表单
	}
}

function onFreshCode()
{
	document.getElementById("apDiv1").innerHTML = "<img src='./authcode.php' width=\"60\" height=\"25\" />";
}
















