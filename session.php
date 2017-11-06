<?php
session_save_path('C:\sessions');
ini_set('session.gc_probability', 1);
session_start();


print_r($_SESSION);