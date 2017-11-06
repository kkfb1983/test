<meta http-equiv="content-type" content="text/html;charset=utf-8">
<?php 
$xml = simplexml_load_file('data.xml'); //创建 SimpleXML对象 
echo "<pre>";
$xmlToArray = array();
$i = 0;
foreach ( $xml->hotel as $val ) {
	$hotelArr = (array) $val;
	$xmlToArray[$i] = $hotelArr ['@attributes'];
	if(!empty($hotelArr['room'])){
		$roomArr = array();
		foreach ($hotelArr['room'] as $value){
			$roomArr = (array)$value;
			$xmlToArray[$i]['room'][] = $roomArr['@attributes'];
		}
	}
	$i++;
}
	print_r ($xmlToArray);
	exit ();


?> 