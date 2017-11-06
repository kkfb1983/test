<?php


function getCSV($filename='') {
	$row = 1; // 第一行开始
	if (($handle = fopen ( $filename, "r" )) !== false) {
		while ( ($dataSrc = fgetcsv ( $handle )) !== false ) {
			$num = count ( $dataSrc );
			for($c = 0; $c < $num; $c ++) { // 列 column
				if ($row === 1) { // 第一行作为字段
					$dataName [] = $dataSrc [$c]; // 字段名称
				} else {
					foreach ( $dataName as $k => $v ) {
						if ($k == $c) { // 对应的字段
							$datakey = trim($v);
							$data [$datakey] = $dataSrc [$c];
						}
					}
				}
			}
			if (! empty ( $data )) {
				$dataRtn [] = $data;
				unset ( $data );
			}
			$row ++;
		}
		fclose ( $handle );
		return $dataRtn;
	}
}
try {
	$user = 'root';
	$pass = '';
	$array = getCSV ( 'city.csv' );
	echo count($array);
	exit;
  $dbh = new PDO('mysql:host=localhost;dbname=201208hotel', $user, $pass);
	foreach($array as $val){
		$values = implode("','",$val);
		$sql = "insert into 201208hotel_ihg_city_code (cityEnName, CityCode, cityname, country, createtime) values ('".$values."',".time().");";
//		$dbh->exec($sql);
		echo  $sql."<br>";
	}
//  $dbh->exec("insert into staff (id, first, last) values (23, 'Joe', 'Bloggs')");
} catch (Exception $e) {
  echo "Failed: " . $e->getMessage();
}

?> 