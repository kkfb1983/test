<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 2015/6/24
 * Time: 14:15
 */
class IndexController extends Yaf_Controller_Abstract {
    public function indexAction() {//默认Action
        echo  1111;exit;
        $this->getView()->assign("content", "Hello World");
    }
}