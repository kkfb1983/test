<?php
/**
 * Created by PhpStorm.
 * User: EL
 * Date: 17/5/31
 * Time: 下午7:41
 */
class API {
    /**
     * the doc info will be generated automatically into service info page.
     * @params
     * @return
     */
    public function some_method($parameter, $option = "foo") {
    }

    protected function client_can_not_see() {
    }
}

$service = new Yar_Server(new API());
$service->handle();
?>