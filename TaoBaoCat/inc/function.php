<?php
require_once 'config.php';
require_once 'Taoapi.php';
date_default_timezone_set('Asia/Shanghai');

$appkeyarray = explode(",",$appkey);
$appsecretarray = explode(",",$appsecret);
$appkeysecretarray = array();
for($i = 0; $i < count($appkeyarray); $i++)
{
	$appkeysecretarray[$appkeyarray[$i]] = $appsecretarray[$i];
}
$Taoapi_Config = Taoapi_Config::Init();
$Taoapi_Config->setAppKey($appkeysecretarray);
$Taoapi_Config->setCache($cachetime);
$Taoapi_Config->setClearCache($clearcache);
$Taoapi = new Taoapi;

function getnochengrencid($catid)
{
	$catid = ($catid == 2813 || $catid == 50003114 || $catid == 281307 || $catid == 281301 || $catid == 281302 || $catid == 50006274 || $catid == 281304 || $catid == 281303 || $catid == 50010385 || $catid == 50012829 || $catid == 50008889 || $catid == 50012786 || $catid == 50012785) ? 16 : $catid;
	return $catid;
}
function ischengrencid($catid)
{
	if($catid == 2813 || $catid == 50003114 || $catid == 281307 || $catid == 281301 || $catid == 281302 || $catid == 50006274 || $catid == 281304 || $catid == 281303 || $catid == 50010385 || $catid == 50012829 || $catid == 50008889 || $catid == 50012786 || $catid == 50012785)
	{
		return true;
	}
	else
	{
		return false;
	}
}
function url_base64_encode($str)
{
	global $iiddecode;
	if($str=="") return "";
	if($iiddecode=="0") return $str;
	$code=base64_encode($str); 
	$code=str_replace('+',"!",$code); 
	$code=str_replace('/',",",$code); 
	$code=str_replace('=',"",$code); 
	return $code; 
}
function url_base64_decode($code)
{
	if($code=="") return ""; 
	$code=str_replace("!",'+',$code); 
	$code=str_replace(",",'/',$code); 
	$code=base64_decode($code);
	return $code;
}
?>