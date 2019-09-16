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
