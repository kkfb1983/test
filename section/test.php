<?php
if (function_exists('__autoload')) {
trigger_error("Extension: It looks like your code is using an __autoload() function. Extension uses spl_autoload_register() which will bypass your __autoload() function and may break autoloading.", E_USER_WARNING);
}


spl_autoload_register(array('ExtensionFactory', 'autoload'));


class ExtensionFactory {


private static $extFamily = null;
private static $_classes = array(
'Extension' => '/Extension.php',
'ExtensionFamily' => '/ExtensionFamily.php'
);


/**
* Class autoloader. This method is provided to be invoked within an
* __autoload() magic method.
* @param string $className The name of the class to load.
*/
public static function autoload() {
foreach(self::$_classes as $v){
require_once dirname(__FILE__) . $v;
}
}


/**
* 必须先调用此方法来实例化扩展族,才能调用addExtension\removeExtension等
* @return ExtensionFamily
*/
public static function createExtension(){
self::$extFamily = new ExtensionFamily();
return self::$extFamily;
}

public static function removeExtension($extName){
if(is_null(self::$extFamily)){
throw new Exception("Please createExtension first");
return false;
}else{
unset(self::$extFamily->_extensionArray[$extName]);
}
}

public static function addExtension($extName, Extension $ext){
if(is_null(self::$extFamily)){
throw new Exception("Please createExtension first");
return false;
}else{
self::$extFamily->_extensionArray[$extName] = $ext;
}
}


public static function removeAllExtension(){
if(is_null(self::$extFamily)){
throw new Exception("Please createExtension first");
return false;
}else{
foreach(self::$extFamily->_extensionArray as $extName=>$ext){
unset(self::$extFamily->_extensionArray[$extName]);
}
}
}
}
<?php
if (function_exists('__autoload')) {
trigger_error("Extension: It looks like your code is using an __autoload() function. Extension uses spl_autoload_register() which will bypass your __autoload() function and may break autoloading.", E_USER_WARNING);
}
spl_autoload_register(array('ExtensionFactory', 'autoload'));
class ExtensionFactory {


private static $extFamily = null;
private static $_classes = array(
'Extension' => '/Extension.php',
'ExtensionFamily' => '/ExtensionFamily.php'
);


/**
* Class autoloader. This method is provided to be invoked within an
* __autoload() magic method.
* @param string $className The name of the class to load.
*/
public static function autoload() {
foreach(self::$_classes as $v){
require_once dirname(__FILE__) . $v;
}
}


/**
* 必须先调用此方法来实例化扩展族,才能调用addExtension\removeExtension等
* @return ExtensionFamily
*/
public static function createExtension(){
self::$extFamily = new ExtensionFamily();
return self::$extFamily;
}


public static function removeExtension($extName){
if(is_null(self::$extFamily)){
throw new Exception("Please createExtension first");
return false;
}else{
unset(self::$extFamily->_extensionArray[$extName]);
}
}

public static function addExtension($extName, Extension $ext){
if(is_null(self::$extFamily)){
throw new Exception("Please createExtension first");
return false;
}else{
self::$extFamily->_extensionArray[$extName] = $ext;
}
}


public static function removeAllExtension(){
if(is_null(self::$extFamily)){
throw new Exception("Please createExtension first");
return false;
}else{
foreach(self::$extFamily->_extensionArray as $extName=>$ext){
unset(self::$extFamily->_extensionArray[$extName]);
}
}
}
}


<?php
/**
* 扩展家族
*
* @author Mr.Jin
*/
class ExtensionFamily implements Extension{
public $_extensionArray = array();


/**
*
* @param type $extName 扩展名
* @param Extension $ext 实现Extension的对象
*/
public function addExtension($extName, Extension $ext){
$this->_extensionArray[$extName] = $ext;
}


public function beforeAppend(&$params){
foreach($this->_extensionArray as $ext){
$ext->beforeAppend($params);
}
}


public function afterAppend(&$params) {
foreach($this->_extensionArray as $ext){
$ext->afterAppend($params);
}
}
}


?>
<?php
/**
* 扩展家族
*
* @author Mr.Jin
*/
class ExtensionFamily implements Extension{
public $_extensionArray = array();


/**
*
* @param type $extName 扩展名
* @param Extension $ext 实现Extension的对象
*/
public function addExtension($extName, Extension $ext){
$this->_extensionArray[$extName] = $ext;
}


public function beforeAppend(&$params){
foreach($this->_extensionArray as $ext){
$ext->beforeAppend($params);
}
}


public function afterAppend(&$params) {
foreach($this->_extensionArray as $ext){
$ext->afterAppend($params);
}
}
}
?>
<?php
/**
* 扩展接口
*
* @author Mr.Jin
*/
interface Extension {
public function beforeAppend(&$params);


public function afterAppend(&$params);
}


?>
<?php
/**
* 扩展接口
*
* @author Mr.Jin
*/
interface Extension {
public function beforeAppend(&$params);


public function afterAppend(&$params);
}
?>
以上三个文件实现了简单的AOP组件。


下面是Demo：
<?php
/**
* 自定义Extension
* 用户积分Extension
* 根据用户是否登录，决定此次消费是否记录用户积分
*
* @author Mr.Jin
*/
class ExampleExtension implements Extension {
public $check=false;


public function beforeAppend(&$isLogin) {
if($isLogin){
$this->check = true;
}
}


public function afterAppend(&$pointer) {
if($this->check){
//add pointer 
}else{
echo '未登录用户，积分不录入';
return;
}
}


}


?>
<?php
/**
* 自定义Extension
* 用户积分Extension
* 根据用户是否登录，决定此次消费是否记录用户积分
*
* @author Mr.Jin
*/
class ExampleExtension implements Extension {
public $check=false;


public function beforeAppend(&$isLogin) {
if($isLogin){
$this->check = true;
}
}


public function afterAppend(&$pointer) {
if($this->check){
//add pointer
}else{
echo '未登录用户，积分不录入';
return;
}
}
}
?>


demo.php
<?php
require_once('ExtensionFactory.php');//导入组件本身 


require_once('ExampleExtension.php');//导入扩展 


$ext = ExtensionFactory::createExtension();


ExtensionFactory::addExtension('example', new ExampleExtension());//积分录入功能 


/*
* 按照需求的变化，可以增加相应的Extension.
* eg.
* 新需求：新增会员类型，根据不同类型，进行价格优惠。
* 实现思路：
* 一、建立卡号类型工厂
* 二、建立SeniorMemberExtension、PuTongMeberExtension.
* 三、工厂方法根据会员类型addExtension
*/


$isLogin = false; //假设用户未登录 


$ext->beforeAppend($isLogin);


/**
* 面向切面编程，最重要一点是：必须先分析出整个业务处理中，哪个才是重点。
* 这里的重点是订单的入库。
* 在订单入库之前可能业务逻辑不断增加，例如：登录验证、卡上余额验证等
* 在订单入库之后：积分处理、订单监控等
*/
echo "此处是主要业务逻辑：订单入库\r\n";


$pointer = 100;


$ext->afterAppend($pointer);
<?php
require_once('ExtensionFactory.php');//导入组件本身
require_once('ExampleExtension.php');//导入扩展
$ext = ExtensionFactory::createExtension();
ExtensionFactory::addExtension('example', new ExampleExtension());//积分录入功能
/*
* 按照需求的变化，可以增加相应的Extension.
* eg.
* 新需求：新增会员类型，根据不同类型，进行价格优惠。
* 实现思路：
* 一、建立卡号类型工厂
* 二、建立SeniorMemberExtension、PuTongMeberExtension.
* 三、工厂方法根据会员类型addExtension
*/
$isLogin = false; //假设用户未登录
$ext->beforeAppend($isLogin);


/**
* 面向切面编程，最重要一点是：必须先分析出整个业务处理中，哪个才是重点。
* 这里的重点是订单的入库。
* 在订单入库之前可能业务逻辑不断增加，例如：登录验证、卡上余额验证等
* 在订单入库之后：积分处理、订单监控等
*/
echo "此处是主要业务逻辑：订单入库\r\n";
$pointer = 100;
$ext->afterAppend($pointer);