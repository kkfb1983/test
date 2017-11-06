<?php
class API {
    public function hello ($param = '')
    {
        return $param;
    }
    protected function hello2 ()
    {
        echo "my hello2.";
    }
}
$service = new Yar_Server(new API());
$service->handle();