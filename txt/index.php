<?php
ini_set('max_execution_time', '0');
ini_set('memory_limit','250M');
require_once('./mydb.php');
$file = './log.txt';
$dbh = mydb::getInstance();
$newText = '';
$line = array();
$poidArr = array();
$hotelArr = array();
/** 文本操作  */
$contxt = file_get_contents($file);			// 读取文本内容
$lineTxt = explode("\r\n", $contxt);		// 格式每行信息
/** 数据库操作 */
$hotelArr = $dbh->query('hotel',null,'id,poi_id');
// 遍例文本内容
foreach($lineTxt as $key=>$val){
	$poidArr = explode(' ',$val);			// 格式每列信息	
	if(!empty($poidArr[0])){
		foreach($hotelArr as $value){
			if($poidArr[0] == $value['poi_id']){
				$newText .= $value['id'].','.$value['poi_id'].','.$poidArr[0].'<br>';
				continue;
			}
		}
	}
}
echo $newText;
// file_put_contents('./newTxt.txt',$newText);







