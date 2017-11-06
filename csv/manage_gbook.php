<?php include_once 'session.php';?>
<?php 
include_once '../xyconn.php';
if($_POST[ajax]=1){
include_once 'function_phpexcel.php';
if($_POST["submit"]){
	$xls = new Excel(); 
	$title = gbook;
	$xls->addsheet($title);	
	$id=$_GET['id'];
	$sql="select * from gbook where id=9";
	$using = mysql_query($sql);
	while($aa = mysql_fetch_array($using, MYSQL_ASSOC)){
		$i=0;
		foreach($aa as $key =>$value){
		$row[$i] =$value;
		$i++;
			}
		$xls->worksheets[$title]->addRow($row);
	}
    	$xls->generate($title);
} 
}
if(isset($_GET['page'])){
  $page=$_GET['page'];
}else{
  $page=1;
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link href="css/css.css" type="text/css" rel="stylesheet" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>企业留言信息管理页面</title>
<script>
var  highlightcolor='#c1ebff';
var  clickcolor='#51b2f6';
function  changeto(){
source=event.srcElement;
if  (source.tagName=="TR"||source.tagName=="TABLE")
return;
while(source.tagName!="TD")
source=source.parentElement;
source=source.parentElement;
cs  =  source.children;
//alert(cs.length);
if  (cs[1].style.backgroundColor!=highlightcolor&&source.id!="nc"&&cs[1].style.backgroundColor!=clickcolor)
for(i=0;i<cs.length;i++){
	cs[i].style.backgroundColor=highlightcolor;
}
}

function  changeback(){
if  (event.fromElement.contains(event.toElement)||source.contains(event.toElement)||source.id=="nc")
return
if  (event.toElement!=source&&cs[1].style.backgroundColor!=clickcolor)
//source.style.backgroundColor=originalcolor
for(i=0;i<cs.length;i++){
	cs[i].style.backgroundColor="";
}
}

function  clickto(){
source=event.srcElement;
if  (source.tagName=="TR"||source.tagName=="TABLE")
return;
while(source.tagName!="TD")
source=source.parentElement;
source=source.parentElement;
cs  =  source.children;
//alert(cs.length);
if  (cs[1].style.backgroundColor!=clickcolor&&source.id!="nc")
for(i=0;i<cs.length;i++){
	cs[i].style.backgroundColor=clickcolor;
}
else
for(i=0;i<cs.length;i++){
	cs[i].style.backgroundColor="";
}
}
</script>
</head>
<body>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="30" background="images/tab_05.gif"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="12" height="30"><img src="images/tab_03.gif" width="12" height="30" /></td>
        <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td width="46%" valign="middle"><table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td width="5%"><div align="center"><img src="images/tb.gif" width="16" height="16" /></div></td>
                <td width="95%" class="STYLE1"><span class="STYLE3">你当前的位置</span>：[企业留言信息管理]</td>
              </tr>
            </table></td>
            <td width="54%">&nbsp;</td>
          </tr>
        </table></td>
        <td width="16"><img src="images/tab_07.gif" width="16" height="30" /></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="8" background="images/tab_12.gif">&nbsp;</td>
        <td>
        <?php
		$page_size=12;
        $query="select count(*) as total from gbook order by id desc";
		$result=mysql_query($query);
		$message_count=mysql_result($result,0,"total");
		$page_count=ceil($message_count/$page_size);
		$offset=($page-1)*$page_size;
		$sql=mysql_query("select * from gbook order by id desc limit $offset,$page_size");
		?>
        <table width="100%" border="0" cellpadding="5" cellspacing="0" onmouseover="changeto()"  onmouseout="changeback()">
          <?php
		  if(mysql_num_rows($sql)==0){
		    echo "暂无数据记录！";
		  }
          while($rs =mysql_fetch_array($sql)){
		  ?>
          <tr>
            <td width="9%" class="td">Gbook_ID： <?php echo $rs['id'];?></td>
            <td width="12%" height="25" class="td">留言手机：<a href="edit_gbook.php?id=<?php echo $rs['id'];?>" style="color:#003399"><?php echo $rs['phone'];?></a> </td>
            <td width="12%" height="25" class="td">留言者姓名：<a href="edit_gbook.php?id=<?php echo $rs['id'];?>" style="color:#003399"><?php echo $rs['ly_name'];?></a> </td>
            <td width="12%" height="25" class="td">留言时间：<a href="edit_gbook.php?id=<?php echo $rs['id'];?>" style="color:#003399"><?php echo $rs['c_date'];?></a> </td>
            <td width="6%" class="td"><input type="button" name="Submit3" value="回复" onclick="window.location.href='edit_gbook.php?id=<?php echo $rs['id'];?>' "  class="button"/></td>
            <td width="14%" class="td">
                <input type="button" name="Submit" value="删除" onclick="javascript:if(confirm('确定删除？删除后不可恢复!')){window.location.href='manage_gbook.php?del=ok&id=<?php echo $rs['id'];?>';}else{history.go(0);}"  class="button"/>    </td>
          </tr>
          <?php
          }
	    ?>  
        
        
        
        
        </table>  
        </td>
        <td width="8" background="images/tab_15.gif">&nbsp;</td>
      </tr>
    </table>
    
</td>
  </tr>
  <tr>

    <td height="35" background="images/tab_19.gif"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="12" height="35"><img src="images/tab_18.gif" width="12" height="35" /></td>
        <td>页次：<?php echo $page;?>/<?php echo $page_count;?>页&nbsp;记录：<?php echo $message_count;?>条&nbsp;
        <?php 
		if($page!=1){
		  echo "<a href=manage_gbook.php?page=1>首页</a>&nbsp;";
		  echo "<a href=manage_gbook.php?page=".($page-1).">上一页</a>&nbsp;";
		}
		if($page<$page_count){
		  echo "<a href=manage_gbook.php?page=".($page+1).">下一页</a>&nbsp;";
		  echo "<a href=manage_gbook.php?page=".$page_count.">尾页</a>&nbsp;";
		}
		mysql_free_result($sql);
		?>
        </td>
        <td width="16"><img src="images/tab_20.gif" width="16" height="35" /></td>
      </tr>
    </table></td>
  </tr>
</table>

<form name="add" method="post" action="manage_gbook.php?ajax=1" onsubmit="return chkform();">
  <p style="padding-left:400PX;">  <input type="submit" name="submit" id="button" value="导出留言"  class="button" /></p>
</form>

</body>
</html>

<?php
if($_GET["del"]==ok){
  $id=$_GET['id'];
  $sql="delete from gbook where id=$id";
  mysql_query($sql);
  echo "<script language='javascript'>"; 
  echo "alert('信息删除成功！');";
  echo " location='manage_gbook.php';"; 
  echo "</script>";
}
mysql_close($conn);
?>


