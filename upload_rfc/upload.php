<?php 
$_SESSION["upload_progress_laruence"] = array(
 "start_time" => 1234567890,   // 请求时间
 "content_length" => 57343257, // 上传文件总大小
 "bytes_processed" => 453489,  // 已经处理的大小
 "done" => false,              // 当所有上传处理完成后为TRUE
 "files" => array(
  0 => array(
   "field_name" => "file1",       // 表单中上传框的名字
   // The following 3 elements equals those in $_FILES
   "name" => "foo.avi",
   "tmp_name" => "/tmp/phpxxxxxx",
   "error" => 0,
   "done" => true,                // 当这个文件处理完成后会变成TRUE
   "start_time" => 1234567890,    // 这个文件开始处理时间
   "bytes_processed" => 57343250, // 这个文件已经处理的大小
  ),
  // An other file, not finished uploading, in the same request
  1 => array(
   "field_name" => "file2",
   "name" => "bar.avi",
   "tmp_name" => NULL,
   "error" => 0,
   "done" => false,
   "start_time" => 1234567899,
   "bytes_processed" => 54554,
  ),
 )
);