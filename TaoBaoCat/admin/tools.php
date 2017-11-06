<?php
if(get_magic_quotes_gpc())
{
	function stripslashes_deep($value)
	{ 
		$value = is_array($value) ? array_map('stripslashes_deep', $value) : stripslashes($value);
		return $value;
	} 
	$_POST = array_map('stripslashes_deep', $_POST);
	$_GET = array_map('stripslashes_deep', $_GET);
	$_COOKIE = array_map('stripslashes_deep', $_COOKIE);
	$_REQUEST = array_map('stripslashes_deep', $_REQUEST);
}
function formattext($text)
{
    $text=str_replace("\"","'",$text);
	$text=str_replace("\\","",$text);
    return trim($text);
}
function validadmin()
{
	session_start();
	if(!isset($_SESSION["username"]) || $_SESSION["username"]=="")
	{
		exit("<script language=\"javascript\">top.location.href=\"index.php\";</script>");
	}
}
?>