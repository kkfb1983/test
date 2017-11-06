<meta http-equiv="content-type" content="text/html;charset=utf-8">
<?php
require_once('lib/nusoap.php');
$param = array('strName'=>'李周新', 'strIDCard'=>'452201197010151254', 'decZiparea'=>450700);
$url = 'http://180.139.137.118:9010/EmpInfo.asmx?WSDL';
$proxyhost = isset($_POST['proxyhost']) ? $_POST['proxyhost'] : '';
$proxyport = isset($_POST['proxyport']) ? $_POST['proxyport'] : '';
$proxyusername = isset($_POST['proxyusername']) ? $_POST['proxyusername'] : '';
$proxypassword = isset($_POST['proxypassword']) ? $_POST['proxypassword'] : '';
$client = new nusoap_client($url, 'wsdl',
		$proxyhost, $proxyport, $proxyusername, $proxypassword);
$err = $client->getError();

$result = $client->call('GetDriverInfo',$param);

echo "<pre>";
print_r($result);