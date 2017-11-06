<form method="POST" action="http://localhost/up.php" enctype="multipart/form-data">
用户头像：<input type="file" name="image">
<input type="submit" name="dosubmit">
</form>
 
处理程序：up.php
<?php
echo "<pre>";
print_r($_FILES);

$uploaddir = 'D:/';
$uploadfile = $uploaddir . basename($_FILES['image']['name']);

if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadfile)) {
    echo "File is valid, and was successfully uploaded.\n";
} else {
    echo "Possible file upload attack!\n";
}
echo 'Here is some more debugging info:';


$url = "http://localhost/app.php";
$data = array(
"file1"  => "@D:/".$_FILES['image']['name'],    
);
print_r(uploadByCURL($data,$url));

function uploadByCURL($post_data,$post_url){
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $post_url);
curl_setopt($curl, CURLOPT_POST, 1 );
curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl,CURLOPT_USERAGENT,"Mozilla/4.0");
$result = curl_exec($curl);
$error = curl_error($curl);
return $error ? $error : $result;
}
?>