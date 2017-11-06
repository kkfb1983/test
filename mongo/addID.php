<?php
function mid($name, $db){
    $update = array('$inc'=>array("id"=>1));
    $query = array('name'=>$name);
    $command = array(
        'findandmodify'=>'ids', 'update'=>$update,
        'query'=>$query, 'new'=>true, 'upsert'=>true
    );
    $id = $db->command($command);
    return $id['value']['id'];
}

$conn = new Mongo();
$db = $conn->idtest;
$id = mid('user', $db);
$db->user->save(array('uid'=>$id, 'username'=>'kekeles'.rand(1000,9999), 'password'=>'kekeles', 'info'=>'http://www.dotcoo.com/  '));
$data = $db->user->find();

$id = mid('food', $db);
$db->food->save(array('uid'=>$id, 'username'=>'kekeles'.rand(1000,9999), 'password'=>'kekeles', 'info'=>'http://www.dotcoo.com/  '));
$data = $db->user->find();

$conn->close();

echo "<pre>";
print_r($data);
exit;
