<?php
$node = array(
    "nameid"=>"",
    "shoolid"=>" ",
    "depid"=>" ",
    "start"=>" ",
    "end"=>" "
);
/*
现在上面数据，有的数据存在A链表里面，有的存在B链表里面，如果都没有，用A链表的数据节点来代替。
开始第一次完成的时候，想了一个很蛋痛的方式，还用到arra_diff()函数用这个链表作差。后来仔细思考了一下。
*/
//$data 表示B链表
//$time 表示A链表
//这里为了节约资源，没开第三条链表，而是在B链表中操作,为什么要选一条不确定长度的链表
//看完你就知道为什么了
$data = array();
$time = array();
if(empty($data)) {
    //申请节点
    foreach($time as $value)
    {
          //将A链表的数据进行需求处理，组成我们需要的节点模式
      $array = array("nameid"=>$value["id"],"depid"=>$depid,"schoolid"=>$schoolid,"start"=>"","end"=>"");
      array_push($data,$array); //将新节点压进栈
    }
}
else if(count($data)<=count($time)) //进行长度对比
{
       for($i=0;$i<count($time);$i++) //for循环，不建议在for循环继续动态判断，我这里是偷懒了。
   {
         if(empty($data[$i]))
     {
              //如果数据节点空，则构建节点
      $array = array("nameid"=>$time[$i]["id"],"depid"=>$depid,"schoolid"=>$schoolid,"start"=>"","end"=>"");
      array_push($data,$array);
     }
   }
}