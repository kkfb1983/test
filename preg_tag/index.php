<?php
$str = "<div><table>x<tr>1s<td>测试<td>124";

$reg = '#<\w+>#iU';
$reg = '#<([a-z]+)(?: .*)?(?<![/|/ ]>)>#iU';

preg_match_all($reg,$str,$array);
echo "<pre>";
print_r($array);
exit;

echo closeTags($str);
function closeTags($str=''){
	// 过滤标签
	$single_tags = array('meta','img','br','link','area');
	
}