<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
</head>
<body>
<h1>约瑟夫问题解决</h1>
<?php
//先构建一个环形链表，链表上的每个节点，表示一个小朋友
//小孩类
class Child{
    public $no;
    public $next=null;
    //构造函数
    public function __construct($no){
        $this->no=$no;
    }
}
//定义一个指向第一个小朋友的引用
//定义一个空头
$first=null;
$n=4; //$n表示有几个小朋友
//写一个函数来创建一个四个小朋友的环形链表
/*
 addChild函数的作用是：把$n个小孩在构建成一个环形链表，$first变量就指向该环形链表的第一个小孩子
 */
function addChild(&$first,$n){ //此处要加地址符
    //1.头结点不能动 $first不能动
    $cur=$first;
    for($i=0;$i<$n;$i++){
        $child=new Child($i+1); //为什么要加1，因为for循环中i是从开始的，但是小朋友的编号是从1开始的
        //怎么构成一个环形链表呢
        if($i==0){ //第一个小孩的情况
            $first=$child; //让first指向child，但是还没有构建环形链表
            $first->next=$child; //自己指向自己
            $cur=$first;
        }else{
            $cur->next=$child;
            $child->next=$first;
            //继续指向下一个
            $cur=$cur->next;
        }
    }
}
//遍历所有的小孩，并显示
function showChild($first){
    //遍历 cur变量是帮助我们遍历循环列表的，所以不能动
    $cur=$first;
    while($cur->next!=$first){ //cur没有到结尾，就遍历
        //显示
        echo'<br/>小孩的编号是'.$cur->no;
        //继续
        $cur=$cur->next;
    }
}
addChild($first,$n);
showChild($first);
?>
</body>
</html>