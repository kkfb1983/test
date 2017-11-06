<?php
set_time_limit(0);
header("Connection: Keep-Alive");
header("Proxy-Connection: Keep-Alive");
for($i=0; $i<1000; $i++) {
   print "fuck man!".$i."<br>";
   flush();
   sleep(3);
   clearstatcache();
}
?>