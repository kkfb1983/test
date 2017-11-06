<?php
ini_set('max_execution_time', '0');
ini_set('memory_limit','250M');
$file = './writer.txt';
require_once('./mydb.php');
$result = array();
$lineTxt = array();
$dbh = mydb::getInstance();
/** 文本操作  */
$contxt = file_get_contents($file);			// 读取文本内容

$logtxt = file_get_contents('./log.txt');			// 读取文本内容

$lineTxt = explode("|", $contxt);		// 格式每行信息
$logTxtArr = explode("\r\n", $logtxt);		// 格式每行信息
// 遍例文本内容
foreach($lineTxt as $key=>$val){
	$sql = '';
	$set = explode(',',$val);
	foreach($logTxtArr as $value){
		$poidArr = explode(' ',$value);			// 格式每列信息
		if($poidArr[0] == $set[1]){
			$newText = '';
			$newText = $set[0].','.$poidArr[0].','.$poidArr[1].'|';
			file_put_contents('./newLog.txt',$newText,FILE_APPEND);
			continue;
		}
	}
	
	
// 	if(!empty($set[0]) && !empty($set[1]) && !empty($set[2])){
// 		$data = array('poi_id'=>$set[2]);
// 		$where = 'poi_id='.$set[2];
// 		$hotelArr = $dbh->query('hotel',$where);
// 		if(empty($hotelArr)){
// 			print_r($set);
// 			echo "<br>";
// 		}
// 		$result[$key][] = $dbh->edit('hotel',$data,$where);
// 		echo $dbh->getSql()."<br>";
// 		file_put_contents('./writer_sql.txt',$dbh->getSql().'|',FILE_APPEND);
// 	}
}
// echo "<pre>";
// print_r($result);






