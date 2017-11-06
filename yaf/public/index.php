<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 2015/6/24
 * Time: 14:08
 */
define("APP_PATH",  realpath(dirname(__FILE__) . '/../')); /* 指向public的上一级 */
$app  = new Yaf_Application(APP_PATH . "/conf/application.ini");
$app->run();