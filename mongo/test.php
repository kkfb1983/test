<?php
//$m = new MongoDB();
//$m = new MongoClient(); // 连接默认主机和端口为：mongodb://localhost:27017
$manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");
echo "<pre>";
//print_r(get_extension_funcs('mongodb')); #看一下该扩展中提供了那些函数
//print_r(get_declared_classes()); #看一下预定义类中是否有你需要（或相似）的类名

//$manager = new MongoDB\Driver\Manager("mongodb://localhost:@127.0.0.1:27017");
//$bulk = new MongoDB\Driver\BulkWrite;
//$bulk->insert(['x' => 1, 'class'=>'toefl', 'num' => '18']);
//$bulk->insert(['x' => 2, 'class'=>'ielts', 'num' => '26']);
//$bulk->insert(['x' => 3, 'class'=>'sat', 'num' => '35']);
//$manager->executeBulkWrite('test.log', $bulk);
//$filter = ['x' => ['$gt' => 1]];
//$options = [
//    'projection' => ['_id' => 0],
//    'sort' => ['x' => -1],
//];
//$query = new MongoDB\Driver\Query($filter, $options);
//$cursor = $manager->executeQuery('test.log', $query);
//foreach ($cursor as $document) {
//    print_r($document);
//}


