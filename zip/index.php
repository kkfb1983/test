<?PHP
/**
 * 文件夹打包程序
 */
require_once('pclzip.lib.php');
$zip_name = time().'.zip';
$archive = new PclZip($zip_name);
$v_list = $archive->add('./img',PCLZIP_OPT_REMOVE_PATH, 'dev');

// echo "<script>window.location.href='./".$zip_name."';</script>";
?>