<?php
error_reporting(0);
require_once 'tools.php';
validadmin();
set_time_limit(0);
$fileNum=0;
function deldir($dir)
{
	global $fileNum;
	$dh=opendir($dir);
	while ($file=readdir($dh))
	{
		if($file!="." && $file!="..")
		{
			$fullpath=$dir."/".$file;
			if(!is_dir($fullpath))
			{
				unlink($fullpath);
				if(($fileNum % 100)==0)
				{
					echo "*";
				}
				$fileNum=$fileNum+1;
			}
			else
			{
				deldir($fullpath);
			}
		}
	}
	closedir($dh);
	if($dir!="../Apicache")
	{
		rmdir($dir);
	}
}
echo "删除缓存文件开始...<br>";
deldir("../Apicache");
echo "<br>删除缓存文件成功，总数为：" . $fileNum;
?>
