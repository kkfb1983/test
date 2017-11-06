<?php
function callback($retval, $callinfo) {
     var_dump($retval);
}
 
Yar_Concurrent_Client::call("http://test/yar/client.php", "api", array("parameters"), "callback");
Yar_Concurrent_Client::call("http://test/yar/client.php", "api", array("parameters"), "callback");
Yar_Concurrent_Client::loop(); //send
?>