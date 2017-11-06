<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>用户注册</title>
<link type="text/css" rel="stylesheet" href="../css/style.css"/>
<script type="text/javascript" src="../js/check.js"></script>
<style type="text/css">
<!--
#apDiv1 {
	position:absolute;
	width:125px;
	height:25px;
	z-index:4;
	left: 688px;
	top: 360px;
	font-size: 12px;
}
-->
</style>
</head>

<body>
<form action="checkuser.php" method="post" name="userinfo" id="userinfo">
	  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <table width="381" border="0" align="center">
    <tr>
      <td width="96" align="right">用户名：</td>
      <td width="275"><input name="uname" type="text" class="txt" id="txt1" size="25" onfocus="disDiv('1');" onblur="hideDiv('1')"/>
        <div id="rightDiv1" class="disDiv">
       	  请输入您的用户名,长度不可少于6位!
        </div>
        <div id="errDiv1" class="errDiv">
       	  请输入用户名!
        </div>
      </td>
    </tr>
    <tr>
      <td align="right">密码：</td>
      <td><input name="upass" type="password" class="txt" id="txt2" size="25" onfocus="disDiv('2');" onblur="hideDiv('2')"/>
        <div id="rightDiv2" class="disDiv">
       	  请输入6-16位密码!
        </div>
        <div id="errDiv2" class="errDiv">
       	  请输入密码!
        </div>
      </td>
    </tr>
    <tr>
      <td align="right">确认密码：</td>
      <td><input name="urpass" type="password" class="txt" id="txt3" size="25" onfocus="disDiv('3');" onblur="hideDiv('3')"/>
        <div id="rightDiv3" class="disDiv">
       	  请确认您输入的密!
        </div>
        <div id="errDiv3" class="errDiv">
       	  请输入密码!
        </div>
      </td>
    </tr>
    <tr>
      <td align="right">昵称：</td>
      <td><input name="upname" type="text" class="txt" id="txt4" size="25" onfocus="disDiv('4');" onblur="hideDiv('4')"/>
        <div id="rightDiv4" class="disDiv">
       	  请输入您的昵称!
        </div>
        <div id="errDiv4" class="errDiv">
       	  请输入昵称!
        </div>
      </td>
    </tr>
    <tr>
      <td align="right">性别：</td>
      <td>
          <input type="radio" name="radioSex" value="男" id="male" checked="checked" />男&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="radio" name="radioSex" value="女" id="female" />女</td>
    </tr>
    <tr>
      <td align="right">生日：</td>
      <td><input name="ubirth" type="text" class="txt" id="ubirth" size="25"/></td>
    </tr>
    <tr>
      <td align="right">所在地：</td>
      <td>
      <select name="province" id="province">
           	<option id="beijing" value="北京" selected="selected">北京</option>
            <option id="shanghai" value="上海">上海</option>
            <option id="liaoning" value="辽宁">辽宁</option>
        </select>
      </td>
    </tr>
    <tr>
      <td align="right">邮箱：</td>
      <td><input name="email" type="text" class="txt" id="txt5" size="25" onfocus="disDiv('5');" onblur="hideDiv('5')"/>
        <div id="rightDiv5" class="disDiv">
       	  请输入您的常用邮箱!如example@example.com
        </div>
        <div id="errDiv5" class="errDiv">
       	  请输入邮箱!
        </div>
      </td>
    </tr>
    <tr>
      <td align="right">验证码：</td>
      <td><input name="authcode" type="text" class="txtCode" id="txt6" size="5" onfocus="disDiv('6');" onblur="hideDiv('6')"/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick="onFreshCode()" style="font-size:12px">看不清</a><div id="apDiv1"><img src='./authcode.php' width="60" height="25" /></div>
		<div id="rightDiv6" class="disDiv">
       	  请输验证码!
        </div>
        <div id="errDiv6" class="errDiv">
       	  请输验证码!
        </div>
      </td>
    </tr>
	    <tr>
	      <td colspan="2" align="center">
          <p>
	      <input type="button" name="btnSub" id="btnSub" value="提交" onclick="onSub()"/>&nbsp;&nbsp;&nbsp;
          <input type="reset" name="btnReset" id="btnReset" value="重置" />
          </td>
    </tr>
  </table>
</form>
</body>
</html>