<?php
//连接Memcache
$mem = new Memcache;
$mem->addServer("localhost", 11211);
$mem->addServer("localhost", 11212);

$mem->add('key1', 1);
$mem->add('key2', 2);
$mem->add('key3', 3);
$mem->add('key4', 4);
print_r($mem->get('key4'));
