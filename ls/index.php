<?php
include("Authnum.php");
$an = new Authnum();
$an->ext_num_type = '';
$an->ext_pixel = true;
$an->ext_line = true;
$an->ext_rand_y = true;
$an->create();
session_start();
echo "<pre>";
print_r($_SESSION);
?>