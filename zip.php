<!-- https://c.xinstatic.com/o/20190612/1835/5d00d56fd371f700215.jpg -->
<?php
//获取列表 
$datalist=[file_get_contents('https://c.xinstatic.com/o/20190612/1835/5d00d56fd371f700215.jpg')];
$filename = "/tmp/bak.zip"; //最终生成的文件名（含路径）  
if(!file_exists($filename)){  
//重新生成文件  
  $zip = new ZipArchive();//使用本类，linux需开启zlib，windows需取消php_zip.dll前的注释  
  if ($zip->open($filename, ZIPARCHIVE::CREATE)!==TRUE) {  
    exit('无法打开文件，或者文件创建失败');
  }  
  foreach( $datalist as $val){  
      $s = $zip->addFile( $val, basename($val));//第二个参数是放在压缩包中的文件名称，如果文件可能会有重复，就需要注意一下  
      var_dump($s);
  }  
  $zip->close();//关闭  
}  
if(!file_exists($filename)){  
  exit("无法找到文件"); //即使创建，仍有可能失败。。。。  
}  
header("Cache-Control: public"); 
header("Content-Description: File Transfer"); 
header('Content-disposition: attachment; filename='.basename($filename)); //文件名  
header("Content-Type: application/zip"); //zip格式的  
header("Content-Transfer-Encoding: binary"); //告诉浏览器，这是二进制文件  
header('Content-Length: '. filesize($filename)); //告诉浏览器，文件大小  
@readfile($filename);
?>
