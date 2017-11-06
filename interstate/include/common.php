<?php

//返回随机数
function random($length)
{
    $hash = '';
    $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz' . time() .
        date('ymdhis');
    $max = strlen($chars) - 1;
    mt_srand((double)microtime() * 1000000);
    for ($i = 0; $i < $length; $i++)
    {
        $hash .= $chars[mt_rand(0, $max)];
    }
    return $hash;
}

//获取IP
function get_ip()
{
    if(isset($_SERVER))
    {
        if(isset($_SERVER["HTTP_X_FORWARDED_FOR"]))
        {
            $realip = $_SERVER["HTTP_X_FORWARDED_FOR"];
        }
        else if(isset($_SERVER["HTTP_CLIENT_IP"]))
        {
            $realip = $_SERVER["HTTP_CLIENT_IP"];
        }
        else
        {
            $realip = $_SERVER["REMOTE_ADDR"];
        }
    }
    else
    {
        if(getenv("HTTP_X_FORWARDED_FOR"))
        {
            $realip = getenv("HTTP_X_FORWARDED_FOR");
        }
        else if(getenv("HTTP_CLIENT_IP"))
        {
            $realip = getenv("HTTP_CLIENT_IP");
        }
        else
        {
            $realip = getenv("REMOTE_ADDR");
        }
    }
    return $realip;
}
//时间计算函数
function DateDiff($d1, $d2)
{
    //日期比较函数
    if(is_string($d1))
        $d1 = strtotime($d1);
    if(is_string($d2))
        $d2 = strtotime($d2);
    return ($d2 - $d1); //这里返回的是毫秒
}
//Email验证
function is_email($email)
{
    if(preg_match("/^([_.0-9a-z-]+)@([0-9a-z][0-9a-z-]+[\.])+([a-z]{2,4})$/i", $email))
        return true;
    else
        return false;
}

/*****************	提示信息	****************/

/*
* 弹出提示信息
* $url 为之后的跳转页面，$url="self"表示刷新本页面
*/
function alert_msg($msg, $url = "", $window = "parent")
{
    echo "<META HTTP-EQUIV='Content-Type' CONTENT='text/html; charset=utf-8'>";
    echo "<META HTTP-EQUIV='Pragma' CONTENT='no-cache'>";
    if($url)
    {
        if($url == "self")
        {
            echo "<script type='text/javascript'>alert('" . $msg . "');" . $window .
                ".location=parent.location.href.replace(/#.*/g, '');</script>";
        }
        else
        {
            echo "<script type='text/javascript'>alert('" . $msg . "');" . $window .
                ".location='" . $url . "'</script>";
        }
    }
    else
    {
        echo "<script type='text/javascript'>alert('" . $msg .
            "');var psb = parent.document.getElementById('submit');if (psb && psb.defaultValue){psb.disabled=false;psb.value=psb.defaultValue;}</script>";
    }
    exit;
}
//显示提示信息页面
//$msg 信息内容，可以包含html代码
//$url 5秒后自动跳转到页面URL
function show_msg($msg, $url = "", $jump = '')
{
    global $smarty;
    if($url)
    {
        $back = $url;
    }
    else
    {
        $back = $_SERVER['HTTP_REFERER'];
    }
    $smarty->assign('msg', $msg);
    $smarty->assign('back', $back);
    $smarty->assign('jump', $jump);
    $smarty->display('default/showmsg.html');
    exit;
    echo "<HTML><HEAD>";
    echo "<META HTTP-EQUIV='Content-Type' CONTENT='text/html; charset=utf-8'>";
    echo "<META HTTP-EQUIV='Pragma' CONTENT='no-cache'>";
    echo "<TITLE>提示信息</TITLE>";
    if($url)
    {
        echo "<META HTTP-EQUIV='refresh' CONTENT='6; url=$url'>";
        $back = "window.location.href='" . $url . "'";
    }
    else
    {
        $back = "history.back()";
    }
    echo "</HEAD>";
    echo "<BODY>";
    echo "
<table width='400' style='margin-top:100px' align='center' border='0' cellpadding='5' cellspacing='1' bgcolor='#6595D6'>
	<tr>
		<td height='25' align='center' valign='middle' background='images/qcjxs_lmy_026.gif' style='color:#fff;font-size:14px;font-weight:bold'>
		提示信息</td>
	</tr>
	<tr>
		<td height='120' align='center' style='font-size:14px' bgcolor='#FFFFFF'>
	{$msg}
		</td>
	</tr>
	<tr>
		<td height='30' align='center' bgcolor='#FFFFFF'>
		<button onclick=\"window.location.href='" . INDEX_URL . "'\">首 页</button> &nbsp;
		<button onclick='window.top.close()'>关 闭</button> &nbsp;
		<button onclick=\"$back\">返 回</button> &nbsp;
		</td>
	</tr>
</table>
		";
    echo "</BODY></HTML>";
    exit;
}

/**
 * timeInterval 计算时间间隔
 * @access public
 * @param string $date1 时间
 * @param string $date2 时间
 * @param string $unit 时间
 * @return bool
 */
function timeInterval($past)
{
    $past = split(" ", $past);
    $date = split("-", $past[0]);
    $hour = split(":", $past[1]);
    $past = mktime($hour[0], $hour[1], $hour[2], $date[1], $date[2], $date[0]);
    $s = time() - $past;
    $time_interval = $s / 60; //单位分钟
    $hour_minutes = 60;
    $day_minutes = 1440;
    if($s < 60)
    {
        return "1分钟前";
    }
    else if($time_interval < $hour_minutes)
    {
        return intval($time_interval) . "分钟前";
    }
    else if($time_interval < $day_minutes)
    {
        if($date[2] == date('d'))
            return "今天 " . date('H:i', $past);
        else
            return date('m月d日 H:i', $past);
    }
    else
        return date('m月d日 H:i', $past);
}

function breviary($img, $w, $h)
{
    list($width, $height, $type, $attr) = @getimagesize($img);
    if($width > $w || $height > $h)
    {
        if(($width - $w) / $width <= ($height - $h) / $height)
        {
            $resize = $h / $height;
        }
        else
        {
            $resize = $w / $width;
        }
        $width_resize = intval($resize * $width);
        $height_resize = intval($resize * $height);
    }

    if($width <= $w && $height <= $h)
    {
        $width_resize = $width;
        $height_resize = $height;
    }
    return array('width' => $width_resize, 'height' => $height_resize);
}
//判断字符串编码
function is_utf8($string)
{
    if(preg_match("/^([" . chr(228) . "-" . chr(233) . "]{1}[" . chr(128) . "-" .
        chr(191) . "]{1}[" . chr(128) . "-" . chr(191) . "]{1}){1}/", $string) == true ||
        preg_match("/([" . chr(228) . "-" . chr(233) . "]{1}[" . chr(128) . "-" . chr(191) .
        "]{1}[" . chr(128) . "-" . chr(191) . "]{1}){1}$/", $string) == true ||
        preg_match("/([" . chr(228) . "-" . chr(233) . "]{1}[" . chr(128) . "-" . chr(191) .
        "]{1}[" . chr(128) . "-" . chr(191) . "]{1}){2,}/", $string) == true)
    {
        return true;
    }
    else
    {
        return false;
    }
}

//处理字符串
function filterString($string = '')
{
    if($string)
    {
        //转换编码gbk - utf-8
        if(!is_utf8($string))
        {
            $string = iconv("gbk", "utf-8", $string);
        }
    }
    return $string;
}

//cookie
function join_cookie()
{
    foreach ($_COOKIE as $k => $v)
    {
        $d[] = $k . "=" . urlencode($v);
    }
    $data = implode("; ", $d);
    return $data;
}

//sql add
function sql_add($table, $data)
{
    if($table && $data)
    {
        $keyStr = '';
        $valStr = '';
        $i = 0;
        foreach ($data as $key => $val)
        {
            if($i == 0)
            {
                $keyStr .= '`' . $key . '`';
                $valStr .= '\'' . $val . '\'';
            }
            else
            {
                $keyStr .= ',`' . $key . '`';
                $valStr .= ',\'' . $val . '\'';
            }
            $i++;
        }
        $sql = "INSERT INTO " . $table . "(" . $keyStr . ") VALUES(" . $valStr . ")";
        return $sql;
    }
    return '';
}

//sql update
function sql_update($table, $data, $where)
{
    if($table && $data && $where)
    {
        $valStr = '';
        $i = 0;
        foreach ($data as $key => $val)
        {
            if($i == 0)
            {
                $valStr .= '`' . $key . '`=\'' . $val . '\'';
            }
            else
            {
                $valStr .= ',`' . $key . '`=\'' . $val . '\'';
            }
            $i++;
        }
        $sql = "UPDATE " . $table . " SET " . $valStr . " WHERE " . $where . ' LIMIT 1';
        return $sql;
    }
    return '';
}

//计算两个日期相差多少天
function count_days($a, $b)
{
    $a_dt = getdate($a);
    $b_dt = getdate($b);
    $a_new = mktime(12, 0, 0, $a_dt['mon'], $a_dt['mday'], $a_dt['year']);
    $b_new = mktime(12, 0, 0, $b_dt['mon'], $b_dt['mday'], $b_dt['year']);
    return round(abs($a_new - $b_new) / 86400);
}
// utf-8 数组按中文首字母排序
function utf8_array_asort($array)
{
    if(!isset($array) || !is_array($array))
    {
        return false;
    }
    foreach ($array as $k => $v)
    {
        $array[$k] = iconv('UTF-8', 'GBK//IGNORE', $v);
    }
    asort($array);
    foreach ($array as $k => $v)
    {
        $array[$k] = iconv('GBK', 'UTF-8//IGNORE', $v);
    }
    return $array;
}
//数字转换成货币格式
function format_money($STR)
{
    if($STR == 0)
        return '0.00';
    if($STR == "")
    {
        return "";
    }
    if($STR == ".00")
    {
        return "0.00";
    }
    $TOK = strtok($STR, ".");
    if(strcmp($STR, $TOK) == "0")
    {
        $STR .= ".00";
    }
    else
    {
        $TOK = strtok(".");
        $I = 1;
        for (; $I <= 2 - strlen($TOK); ++$I)
        {
            $STR .= "0";
        }
    }
    if(substr($STR, 0, 1) == ".")
    {
        $STR = "0" . $STR;
    }
    return $STR;
}
//表单增加转义
function fnAddSlashes($data)
{
    if(!get_magic_quotes_gpc())
        return is_array($data) ? array_map('addslashes', $data) : addslashes($data);
    else
        return $data;
}
// 表单处理
// $rptype = 0 表示仅替换 html标记
// $rptype = 1 表示替换 html标记同时去除连续空白字符
// $rptype = 2 表示替换 html标记同时去除所有空白字符
// $rptype = 3 表示去除 html标记同时去除所有空白字符
// $rptype = -1 表示仅替换 html危险的标记 
function htmlreplace($arr,$rptype=0)
{
	if (is_array($arr))
	{
		$new_arr = array();
		foreach($arr as $key=>$str){
			$str = stripslashes($str);
			if($rptype==0)
			{
				$str = htmlspecialchars($str);
			}
			else if($rptype==1)
			{
				$str = htmlspecialchars($str);
				$str = str_replace(" ",' ',$str);
				$str = ereg_replace("/[\r\n\t]/",'',$str);	
			}
			else if($rptype==2)
			{
				$str = htmlspecialchars($str);
				$str = str_replace(" ",'',$str);
				$str = ereg_replace("/[\r\n\t]/",'',$str);	
			}
			else if($rptype==3)
			{
				$str = strip_tags($str);
				$str = str_replace(" ",'',$str);
				$str = ereg_replace("/[\r\n\t]/",'',$str);				
			}
			else
			{
				$str = ereg_replace("/[\r\n\t]/",'',$str);	
				$str = eregi_replace('script','ｓｃｒｉｐｔ',$str);
				$str = eregi_replace("<[/]{0,1}(link|meta|ifr|fra)[^>]*>",'',$str);
			}
			$new_arr[$key] = $str;
		}
	}
	else
	{
		$arr = $str;
		$str = stripslashes($str);
		if($rptype==0)
		{
			$str = htmlspecialchars($str);
		}
		else if($rptype==1)
		{
			$str = htmlspecialchars($str);
			$str = str_replace(" ",' ',$str);
			$str = ereg_replace("/[\r\n\t]/",'',$str);	
		}
		else if($rptype==2)
		{
			$str = htmlspecialchars($str);
			$str = str_replace(" ",'',$str);
			$str = ereg_replace("/[\r\n\t]/",'',$str);	
		}
		else if($rptype==3)
		{
			$str = strip_tags($str);
			$str = str_replace(" ",'',$str);
			$str = ereg_replace("/[\r\n\t]/",'',$str);					
		}		
		else
		{
			$str = ereg_replace("/[\r\n\t]/",'',$str);	
			$str = eregi_replace('script','ｓｃｒｉｐｔ',$str);
			$str = eregi_replace("<[/]{0,1}(link|meta|ifr|fra)[^>]*>",'',$str);
		}	
		$new_arr = $str;
	}	
    if(!get_magic_quotes_gpc())
	{
        return is_array($new_arr) ? array_map('addslashes', $new_arr) : addslashes($new_arr);
	}
    else
	{
        return $new_arr;
	}
}
//声明excel头信息，用于数据excel导出
function sendExcelHeader($filename='') {
	@ob_end_clean();
	if (empty($filename)) $filename = date("YmdHis").".xls";
	else $filename = $filename . ".xls";
	ini_set('zlib.output_compression','Off');
	header ('Pragma: public');
	header ("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
	header ('Last-Modified: '.gmdate('D, d M Y H:i:s') . ' GMT');
	header ('Cache-Control: no-store, no-cache, must-revalidate');
	header ('Cache-Control: pre-check=0, post-check=0, max-age=0');
	header ("Pragma: no-cache");
	header ("Expires: 0");
	header ('Content-Transfer-Encoding: none');
	header ('Content-Type: application/vnd.ms-excel;');
	header("Content-type: application/x-msexcel");
	header('Content-Disposition: attachment; filename="'.basename($filename).'"');
}	
?>