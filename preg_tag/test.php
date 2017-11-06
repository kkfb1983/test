<?php
/* 网址替换 */
$str = 'http://www.cnblogs.com/Dannier/archive/2010/11/06/RegExp.html';
$reg = '/^(http):\/\/(w{3})\.(\w+)\.(com|net|org|cn)((\/\w+)+)\.(html|htm)/';
/* HTML标签替换  */
// $str = "<div><table>x<tr>1s<td>测试<td>124</tr>";
// $reg = '/<\w+>+/';
// $reg = '/<\/\w+>/';
preg_match_all($reg,$str,$out);
echo $str."\t\n";
print_r($out);




