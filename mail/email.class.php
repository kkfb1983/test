<?php
/**
 * 邮件发送接口类
 * @author Root
 */
class sendIntfaces
{
	private $_cUrl;		//访问地址
	private $_cMethod;	//访问方式a
	private $_mail;		//代发邮箱配置数组
	/**
	 * 构造方法
	 * @param 发送信息配置数组 $confArr
	 */
	public function __construct($cUrl='', $cMethod='', $confArr=array())
	{
		/*CURL配置*/
		$this->_cUrl = empty($cUrl) ? 'http://hotel.ppe.joyinter.net/vbooking/test.php' : $cUrl;
		$this->_cMethod = empty($cMethod) ? 'POST' : $cMethod;
		/*Email配置*/
		$this->_mail['_mailHost'] = empty($confArr['host']) ? '219.239.90.98' : $confArr['host'];				// STMP HOST
		$this->_mail['_mailName'] = empty($confArr['name']) ? 'testroot@joyinter.com' : $confArr['name'];		// STMP 帐号
		$this->_mail['_mailPass'] = empty($confArr['pass']) ? 'testroot' : $confArr['pass'];					// STMP 密码
		$this->_mail['_mailPost'] = empty($confArr['post']) ? '25' : $confArr['post'];							// STMP 端口
		$this->_mail['_mailCharset'] = empty($confArr['charset']) ? 'UTF-8' : $confArr['charset'];				// 邮件编码
		$this->_mail['_mailEncoding'] = empty($confArr['encoding']) ? 'base64' : $confArr['encoding'];			// Base加密
	}
	/**
	 * 发送邮件
	 * @param 收件人名称 $receiveName
	 * @param 收件人地址 $receiveEmail
	 * @param 发件人名称 $sendName
	 * @param 邮件标题 $sendTitle
	 * @param 邮件内容 $sendText
	 * @param unknown $altBody
	 */
	public function sendMail($receiveName='', $receiveEmail='', $sendName='', $sendTitle, $sendText = '',$altBody='text/html')
	{
		$curlPost = array(
					'rName' => $receiveName,
					'rEmail' => $receiveEmail,
					'sName' => $sendName,
					'sTitle' => $sendTitle,
					'sText' => $sendText,
					'altbody' => $altBody
				);
		
		$curlObj = curl_init();
		curl_setopt($curlObj, CURLOPT_POSTFIELDS, curlPost);
		curl_setopt($curlObj, CURLOPT_URL, $this->_cUrl);
		curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, true);
		$jsonArr = curl_exec($curlObj);
		curl_close($curlObj);
		echo "<pre>";
		print_r($jsonArr);
		exit;
	}
	
}