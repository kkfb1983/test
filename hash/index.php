<?php
$time=microtime(1);
for ($i=0;$i<100000;$i++)
   hash('md5', 'string');
echo microtime(1)-$time,': hash/md5<br>';

$time=microtime(1);
for ($i=0;$i<100000;$i++)
   md5('string');
echo microtime(1)-$time,': md5<br>';

$time=microtime(1);
for ($i=0;$i<100000;$i++)
   hash('sha1', 'string');
echo microtime(1)-$time,': hash/sha1<br>';

$time=microtime(1);
for ($i=0;$i<100000;$i++)
   sha1('string');
echo microtime(1)-$time,': sha1<br>';