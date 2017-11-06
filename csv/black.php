<?php


function handleCSV($filename='') {
    $row = 1;
    $handle = fopen($filename,"r");
    while ($data = fgetcsv($handle, 1000, " ")) {
        $num = count($data);
        $row++;
        for ($c=0; $c < $num; $c++) {
            echo $data[$c] . "<br>\n";
        }
    }
    fclose($handle);
}
try {
    echo "<pre>";
	$array = handleCSV ( 'import_black.csv' );
//    print_r($array);
} catch (Exception $e) {
  echo "Failed: " . $e->getMessage();
}

?> 