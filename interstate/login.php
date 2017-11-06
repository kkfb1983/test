<?php

include_once ('global_inc.php');

if($BlocAdmin->isLogin())
{	
    	header('location:index.php');
    	exit;
}


$opt = $HttpVars->getGetValue('opt');

if($opt == 'login')
{
    $username = $HttpVars->getPostValue('username');
    $password = $HttpVars->getPostValue('password');
    $verify = $HttpVars->getPostValue('verify');
    if(md5($verify) != $_SESSION['verify'])
    {
        show_msg('验证码错误');
    }
    if($username == '' || $password == '')
    {
        show_msg('请输入用户名或者密码');
    }

    $res = $BlocAdmin->login($username, $password);

    if($res)
    {
        	header('location:index.php');
    }
    else
    {
        show_msg('用户信息不匹配或用户已被禁止登录');
    }
}
else
{
    $smarty->display("default/login.html");
}

?>