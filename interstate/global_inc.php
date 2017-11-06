<?php

session_start();
require_once ("global_define.php");
include_once (__INCLUDE_DIR . "DB.php");
include_once (__INCLUDE_DIR . "common.php");
include_once (__INCLUDE_DIR . "httpvars.class.php");
include_once (__INCLUDE_DIR . "page.class.php");
include_once (__INCLUDE_DIR . "BlocAdmin.class.php");
include_once (__INCLUDE_DIR . "smarty.php");
//require_once(__INCLUDE_DIR.'ssocommon.php');
/***********************************************************
* 链接数据库
***********************************************************/
$sdb = open_sdb(); //辅库
$sdb->setFetchMode(MDB2_FETCHMODE_ASSOC);

$pdb = open_pdb(); //主库
/******************* END!**********************************/

$pageObj = new Page();
$HttpVars = new HttpVars();
$BlocAdmin = new BlocAdmin();
$smarty = new smarty_client();
/******************* END!**********************************/
/*******************登录信息start**********************************/
$blocAdminInfo = array();

//$uid = GetSinaInfo();

$blocadminuserinfo = $BlocAdmin->getBlocAdminInfo($HttpVars->getCookieValue(__COOKIE_PREFIX .'aid'));
if($blocadminuserinfo['sina_uid'])
{
    $cid = $blocadminuserinfo['sina_uid'];
}
if($HttpVars->getGetValue('is_ajax'))
{
    /*if ( !$uid ) {
    echo json_encode(array('error_code'=>10001,'error'=>'未登录'));exit();
    }*/

}
else
{
    /*if ( !$uid ) {
    $smarty->assign('title','未登录微博');
    $smarty->assign('weibo_msg','对不起,您还没有登录微博');
    $smarty->display("default/unbinding.html");exit();
    }
    $bloc = $BlocAdmin->setBloc($cid);
    if(!$bloc){
    $smarty->assign('title','未绑定提示');
    $smarty->assign('weibo_msg','对不起，您暂时不能使用酒店助手集团版后台，请先联系我们！');
    $smarty->display("default/unbinding.html");
    }*/

}
if($cid)
{
    $blocAdminInfo = $BlocAdmin->getBlocAdmin($cid);
}
$blocAdminuserInfo = $BlocAdmin->getBlocAdminuserInfo($HttpVars->getCookieValue(__COOKIE_PREFIX .'aid'));
$smarty->assign('blocAdminInfo', $blocAdminuserInfo);
$smarty->assign('mod_uid', $uid);
$smarty->assign('mod_cid', $cid);
$smarty->assign('app_hotel_key', __APP_HOTEL_KEY);
/*******************登录信息end**********************************/

?>