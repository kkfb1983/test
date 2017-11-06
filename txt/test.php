<?php
ini_set('max_execution_time', '0');
ini_set('memory_limit','250M');
$file = './hotel_poi_id.txt';
require_once('./mydb.php');
$result = array();
$lineTxt = array();
$dbh = mydb::getInstance();
/** 文本操作  */
$contxt = file_get_contents($file);			// 读取文本内容
$lineTxt = explode("|", $contxt);		// 格式每行信息

echo count($lineTxt);
echo "<hr>";
// 遍例文本内容
$n = 0;
foreach($lineTxt as $key=>$val){
// 	echo $val;
// 	echo '<br>';
	$sql = '';
	$set = explode(',',$val);
// 	$data = array('poi_id'=>$set[2]);
	$where = 'poi_id='.$set[0];
	$hotelArr = $dbh->query('hotel',$where);
	if(empty($hotelArr)){
		$sql = 'update myshow_hotel set poi_id="'.$set[2].'" where id='.$set[0].';';
		echo $sql;
		echo "<br>";
		$n++;
	}
}
echo '<hr>'.$n;
