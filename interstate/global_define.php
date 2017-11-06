<?php

//exit;
//error_reporting(0);
//header('Content-Type: text/html; charset=utf-8');
/* -------------------------------------------------------------- */
/*  系统目录设置
/* -------------------------------------------------------------- */
define('__ALLROOT', str_replace('global_define.php', '', str_replace('\\', '/',
    __file__)));
define('__JS_DIR', __ALLROOT . "js/");
define('__INCLUDE_DIR', __ALLROOT . "include/");
define('__PIC_DIR', __ALLROOT . "images/");
define('__WEB_URL', get_url());
/*---------------------目录设置结束----------------------------------------------------*/

/*---------------------分页开始----------------------------------------------------*/
define("__PAGE_SIZE", 10); //每页显示几个记录
define("__PAGE_OFFSET", 5); //页码偏移量
/*---------------------上传目录----------------------------------------------------*/
define("__UPLOADS", "data/uploads/");
/*---------------------上传目录----------------------------------------------------*/

define("__DB_PREFIX", "201208hotel_");
/*---------------------cookie设置----------------------------------------------------*/
define("__COOKIE_DOMAIN", "hotel.ppe.joyinter.net"); // Cookie域
define("__COOKIE_EXPIRE", 2 * 3600); // Coodie有效期
define("__COOKIE_PATH", '/'); // Cookie路径
define("__COOKIE_PREFIX", 'bloc2_'); // Cookie前缀 避免冲突
/*---------------------cookie设置----------------------------------------------------*/

define("__APP_KEY", '1630033743'); // 应用APP KEY
define("__APP_SECRET", 'afe629225f072cc4b7688b455f37970f'); // 应用App Secret

define("__APP_HOTEL_KEY", '1896213109');
/**
 * 取得当前的域名
 *
 * @access  public
 *
 * @return  string      当前的域名
 */
function get_url()
{
    $php_self = isset($_SERVER['PHP_SELF']) ? $_SERVER['PHP_SELF'] : $_SERVER['SCRIPT_NAME'];
    if('/' == substr($php_self, -1))
    {
        $php_self .= 'index.php';
    }
    $curr = strpos($php_self, 'admin/') !== false ? preg_replace('/(.*)(admin)(\/?)(.)*/i',
        '\1', dirname($php_self)) : dirname($php_self);

    $root = str_replace('\\', '/', $curr);

    if(substr($root, -1) != '/')
    {
        $root .= '/';
    }

    return get_domain() . $root;
}
/**
 * 取得当前的域名
 *
 * @access  public
 *
 * @return  string      当前的域名
 */
function get_domain()
{
    /* 协议 */
    $protocol = (isset($_SERVER['HTTPS']) && (strtolower($_SERVER['HTTPS']) != 'off')) ?
        'https://' : 'http://';

    /* 域名或IP地址 */
    if(isset($_SERVER['HTTP_X_FORWARDED_HOST']))
    {
        $host = $_SERVER['HTTP_X_FORWARDED_HOST'];
    } 
    else if(isset($_SERVER['HTTP_HOST']))
    {
        $host = $_SERVER['HTTP_HOST'];
    }
    else
    {
        /* 端口 */
        if(isset($_SERVER['SERVER_PORT']))
        {
            $port = ':' . $_SERVER['SERVER_PORT'];

            if((':80' == $port && 'http://' == $protocol) || (':443' == $port && 'https://' ==
                $protocol))
            {
                $port = '';
            }
        }
        else
        {
            $port = '';
        }

        if(isset($_SERVER['SERVER_NAME']))
        {
            $host = $_SERVER['SERVER_NAME'] . $port;
        } 
        else if(isset($_SERVER['SERVER_ADDR']))
        {
            $host = $_SERVER['SERVER_ADDR'] . $port;
        }
    }

    return $protocol . $host;
}

?>