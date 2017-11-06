<?php
include_once('connect.php'); //连接数据库
$list = get_array(0); //调用函数
print_r($list); //输出数组
function get_array($id=0){ 
    $sql = "select id,title from class where pid= $id"; 
    $result = mysql_query($sql);//查询子类 
    $arr = array(); 
    if($result && mysql_affected_rows()){//如果有子类 
        while($rows=mysql_fetch_assoc($result)){ //循环记录集 
            $rows['list'] = get_array($rows['id']); //调用函数，传入参数，继续查询下级 
            $arr[] = $rows; //组合数组 
        } 
        return $arr; 
    } 
} 