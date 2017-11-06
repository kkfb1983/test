<?php
	include_once('pclzip.lib.php');
	$zip_name = './bak/'.time().'.rar';
	$archive = new PclZip($zip_name);
	$v_list = $archive->add('./img',PCLZIP_OPT_REMOVE_PATH, 'dev');
	exit;
//解压缩到extract/folder/这个目录中       
// $list = $archive->extract(PCLZIP_OPT_PATH, "extract/folder/");       
        
//增加这个目录在压缩档中，完成以后压缩档里面会有backup这个目录，backup里面会有这两个档案       
// $list = $archive->create("./img",PCLZIP_OPT_ADD_PATH, "backup");       
       
//去掉部份的路径，这里完成后会变成test/file.txt       
// $list = $archive->add("/usr/local/user/test/file.txt",PCLZIP_OPT_REMOVE_PATH, "/usr/local/user");       
        
//把所有路径都去掉，这个压缩档建立完后，里面就只会有file.txt跟image.gif，不会有目录了       
// $list = $archive->create("data/file.txt images/image.gif",PCLZIP_OPT_REMOVE_ALL_PATH);       
        
//把解压缩出来的档案的CHMOD设成0777       
$list = $archive->extract(PCLZIP_OPT_SET_CHMOD, 0777);       
    
//解压缩部份的档案，这个参数是使用档案名称判别       
//引数可以用下面这样的阵列       
// $rule_list[0] = 'test/aaa.txt';       
// $rule_list[1] = 'test/ddd.txt';       
//或是下面这样，一个字串中，用逗号分隔每个要解压缩的档案       
// $rule_list = "test/aaa.txt,test/ddd.txt";       
// $list = $archive->extract(PCLZIP_OPT_BY_NAME,$rule_list);       
        
//解压缩部份的档案，使用php的ereg()函式，档案名称有比对成功的都会被解压缩       
// $list = $archive->extract(PCLZIP_OPT_BY_EREG, "aa");       
        
//解压缩部份的档案，使用php的preg_match()函式，档案名称有比对成功的都会被解压缩       
// $list = $archive->extract(PCLZIP_OPT_BY_PREG, "/^bb/");       
//上面这两个函式如果不懂的话，请先研究正规表示法(Regular Expression)       
        
//依照阵列中元素的索引解压缩，可是我不太懂index啥 = =a       
// $list = $archive->extract(PCLZIP_OPT_BY_INDEX, array('0-1','6-7'));       
        
//将一个档案内容解压缩成一个字串       
// $list = $archive->extract(PCLZIP_OPT_BY_NAME, "data/readme.txt",PCLZIP_OPT_EXTRACT_AS_STRING);       
        
//将一个档案内容解压缩完后直接输出(echo)       
// $list = $archive->extract(PCLZIP_OPT_BY_NAME, "data/readme.txt",PCLZIP_OPT_EXTRACT_IN_OUTPUT);       
        
//将一个档案加入一个压缩档中，但不会对此档案压缩       
// $list = $archive->add("data/file.txt", PCLZIP_OPT_NO_COMPRESSION);       
        
//对此压缩档增加一个注解，如果原本就有注解的话会被覆盖掉       
// $list = $archive->create("data", PCLZIP_OPT_COMMENT, "Add a comment");       
        
//对此压缩档增加一个注解，如果原本就有注解的话会接在后面       
// $list = $archive->add("data", PCLZIP_OPT_ADD_COMMENT, "Add a comment after the existing one");       
        
//对此压缩档增加一个注解，如果原本就有注解的话会放在原本的注解前面       
// $list = $archive->add("data", PCLZIP_OPT_PREPEND_COMMENT, "Add a comment before the existing one");      
	
?>
