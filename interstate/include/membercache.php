<?PHP

/*********************************************************
* ��̬ƽ̨ memcache 
* �������PHP5�ռ价��������ͬ����ʹ�ñ�����
**********************************************************/
define("MEM_CACHE_KEY_PREFIX", $_SERVER["SINASRV_MEMCACHED_KEY_PREFIX"] .
    "_201208hotel_hotel_bloc"); //����memcache��keyǰ׺
define("MEM_CACHE_LIFETIME", 300); //����ʱ��,��λ��,0��ʾ������Ч
define("MEM_CACHE_LIFETIME_SMALL", 600); //����ʱ��,��λ��,0��ʾ������Ч
define("MEM_CACHE_LIFETIME_LONG", 18000); //����ʱ��,��λ��,0��ʾ������Ч
define("MEM_CACHE_LIFETIME_CACH", 0); //�Ƿ񻺴�
define("MEM_CACHE_LIFETIME_LUCKY_CHECK", 0); //�Ƿ񻺴�

//ʹ�ñ���IDC��memcache
function &mem_cache_local()
{
    $mc = new Memcache;
    $servers = explode(" ", $_SERVER["SINASRV_MEMCACHED_SERVERS"]);
    foreach ($servers as $val)
    {
        $v = explode(":", $val);
        $mc->addServer($v[0], $v[1]);
    }
    return $mc;
}
//ʹ�ù����memche
function &mem_cache_share()
{
    $mc = new Memcache;
    $servers = explode(" ", $_SERVER["SINASRV_GLOBAL_MEMCACHED_SERVERS"]);
    foreach ($servers as $val)
    {
        $v = explode(":", $val);
        $mc->addServer($v[0], $v[1]);
    }
    return $mc;
}

?>