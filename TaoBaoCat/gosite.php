<?php
$url = base64_decode($_GET["url"]);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title></title>
</head>
<body>
<form id="gositeform" name="gositeform" method="post" action="<?php echo $url;?>">
</form>
<a id="gosite" href="<?php echo $url;?>"></a>
<script type="text/javascript" language="javascript">
try{
	document.getElementById("gosite").click();
}
catch(e){

}
try{
	document.getElementById("gositeform").submit();
}
catch(e){
	window.location.href="<?php echo $url?>";
}
</script>
</body>
</html>