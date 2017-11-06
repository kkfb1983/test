<?php
// 图片地址 ：http://weibo.appinside.com/data/attachment/weibo/
//1:新闻 2:财经 3:科技 4:房产 5:体育 6:汽车 7:娱乐 8:健康 9:时尚 10:美容 11:育儿 12:糗事 13:数码 14:手机 15:生活 16:职场 17:旅游
$type = array(
		'1'=>'新闻','2'=>'财经','3'=>'科技','4'=>'房产','5'=>'体育','6'=>'汽车','7'=>'娱乐','8'=>'健康',
		'9'=>'时尚','10'=>'美容','11'=>'育儿','12'=>'糗事','13'=>'数码','14'=>'手机','15'=>'生活','16'=>'职场',
		'17'=>'旅游'
		);
$postArr = array(
		'type'=>'',
		'c'=>'contents.tid = 2',
		'lw'=>'contents.tid = 2',
		'lm'=>'1,10'
);

$curlObj = curl_init();
curl_setopt($curlObj, CURLOPT_POSTFIELDS, $postArr);
curl_setopt($curlObj, CURLOPT_URL, "http://local.weiq.com/wap/?c=test.index");
curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, true);
$jsonArr = curl_exec($curlObj);
curl_close($curlObj);
echo "http://local.weiq.com/wap/?c=test.index<br>";
echo "<pre>";
print_r($jsonArr);
exit;





$jsonArr = array();
if(@$_GET['href'] == 'r'){
/*
	@注册说明@
	名称			说明
	ip			客户端当前ip
	email		邮箱
	username	用户昵称
	password	用户密码
	sex			用户性别
	scoreAdd	注册需加的分数
	scoreType	积分类型
	postType	会员类型
	500注册成功|501帐号被占用|502邮件地址格式错误|503密码错误|504注册失败
*/
//参数
$postArr = array(
				'email'		=> 'fb_test_'.time().'@qq.com',
				'username'  => 'curl_test_'.time(),
				'password'	=> '123456',
				'ip'		=> '127.0.0.'.date('s'),
				'sex'		=> rand(0,1)
			);
$curlObj = curl_init();
curl_setopt($curlObj, CURLOPT_POSTFIELDS, $postArr);
curl_setopt($curlObj, CURLOPT_URL, "http://www.mnssr.com/index.php?app=home&mod=Api&act=register");
curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, true);
$jsonArr = curl_exec($curlObj);
curl_close($curlObj);
}elseif(@$_GET['href'] == 'l'){
##############################################################################################################
/*
 	@登陆说明@
	名称				说明
	ip				客户端当前ip
	scoreAddTime	每天登录需加分的次数
	scoreAdd		登录需加的分数
	scoreType		积分类型
	username		用户名
	password		密码
	error			错误类型(0无错误)
	postType		会员类型
	@ return 0登陆成功|401帐号密码不正确|402邮件地址格式错误|403密码不能为空|404帐号未激活
*/
//参数
// 	$postArr = array(
// 			'email'	=> 'kkfb1983@yahoo.com.cn',
// 			'password'	=> md5('testroot'),
// 			'ip'		=> '123456789'
// 	);
$postArr = array(
		'email'		=> 'kkfb1983@yahoo.com.cn',
		'password'	=> md5('testroot'),
		'ip'		=> '127.0.0.'.date('s'),
);
$curlObj = curl_init();
// curl_setopt($curlObj, CURLOPT_TIMEOUT, 3000);//设置一个长整形数，作为最大延续多少秒
// curl_setopt($curlObj, CURLOPT_POSTFIELDS, $postArr);
// curl_setopt($curlObj, CURLOPT_URL, "http://www.mnssr.com/index.php?app=home&mod=Api&act=login");
// curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, true);
$postArr = http_build_query($postArr);
curl_setopt($curlObj, CURLOPT_URL, 'http://www.mnssr.com/index.php?app=home&mod=Api&act=login');
curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, 1);
//指定post数据
curl_setopt($curlObj, CURLOPT_POST, 1);
//添加变量
curl_setopt($curlObj, CURLOPT_POSTFIELDS, $postArr);


$jsonArr = curl_exec($curlObj);
// $jsonArr = curl_getinfo($curlObj);
curl_close($curlObj);
}elseif(@$_GET['href'] == 'e'){
	/*
	 @修改密码说明@
	名称			说明
	id			用户ID
	username	用户名
	password	密码
	postType	会员类型
	@ return 0修改成功|301密码不正确|302姓名不能为空|303用户不存在
	*/
	//参数
	$postArr = array(
			'id'		=> '1',
			'username'  => time(),
			'password'	=> md5('testroot')
	);
	$curlObj = curl_init();
	curl_setopt($curlObj, CURLOPT_POSTFIELDS, $postArr);
	curl_setopt($curlObj, CURLOPT_URL, "http://mnssr/index.php?app=home&mod=Api&act=editpassword");
	curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, true);
	
	$jsonArr = curl_exec($curlObj);
	// $jsonArr = curl_getinfo($curlObj);
	curl_close($curlObj);
}
echo "<hr><pre>";
print_r($jsonArr);