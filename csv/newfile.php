<?php
export_csv();
function export_csv() {
$filename = date('YmdHis').".csv";//文件名
header("Content-type:text/csv");
header("Content-Disposition:attachment;filename=".$filename);
header('Cache-Control:must-revalidate,post-check=0,pre-check=0');
header('Expires:0');
header('Pragma:public');
echo array_to_string(get_export_data());
}
function array_to_string($result) {
if(empty($result)) {
return i("标题,没有符合您要求的数据！^_^");
}
$data = '书ID,书名'."\n"; //栏目名称
$size_result = sizeof($result);
for($i = 0 ; $i < $size_result ; $i++) {
$data .= i($result[$i]['name']).','.i($result[$i]['option'])."\n";
}
return $data;
}
function get_export_data() {
	return 0;
$link = mysql_connect('localhost','root','121051xz') or die(mysql_error());
mysql_select_db('ht');
mysql_query("set names 'utf8'");//定义编码
$sql = 'select * from booklist';
$result = mysql_query($sql);
$rowaa = mysql_fetch_array($result);
$res = array();
$i = 0;
while($row = mysql_fetch_array($result)) {
$res[$i]['name'] = $row['bookid'];
$res[$i]['option'] = $row['bookname'];
$i++;
}
return $res;
}
function i($strInput) {
return iconv('utf-8','gb2312',$strInput);//页面编码为utf-8时使用，否则导出的中文为乱码
}