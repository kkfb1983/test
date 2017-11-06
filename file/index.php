<?php
$id = 'install';
//header定义如下：
header("Content-Type: text");
//header("Content-Disposition: attachment; filename=$id.txt");
header("Content-Disposition: inline; filename=$id.txt"); //txt文件换行
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("Pragma: public");
// Define a context for HTTP.
$aContext = array(
    'http' => array(
	'method'=>"POST",
        'proxy' => 'tcp://127.0.0.1:80', // This needs to be the server and the port of the NTLM Authentication Proxy Server.
        'request_fulluri' => True,
        ),
    );
$cxContext = stream_context_create($aContext);

// Now all file stream functions can use this context.

$sFile = file_get_contents("http://test/file/file.txt", False, $cxContext);

$sFile = date('Y-m-d H:i:s').PHP_EOL;
file_put_contents('./'.$id.'.txt',$sFile,FILE_APPEND|LOCK_EX);

echo $sFile;
?>
