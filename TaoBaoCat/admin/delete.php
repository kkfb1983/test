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
echo "ɾ�������ļ���ʼ...<br>";
deldir("../Apicache");
echo "<br>ɾ�������ļ��ɹ�������Ϊ��" . $fileNum;
?>
