<?php
require_once 'Log.php';

$conf = array();
$logFileName = dirname(__FILE__) . '/pearlog.log';
echo $logFileName;
$log = &Log::singleton( 'file', $logFileName, 'LOG', $conf );

global $log;
$log->info('log test');

?>