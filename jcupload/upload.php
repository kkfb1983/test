<?php
$c = print_r( $_FILES , true );
$fp = fopen( dirname( __FILE__ ) . "/txt.txt" , "a+" );
fwrite( $fp , $c  . "\n---" . date( "Y-m-d H:i:s" ) );
fclose( $fp );
//file_put_contents( dirname( __FILE__ ) . "/txt.txt" , $c );
        if (isset($_FILES["Filedata"])) { // test if file was posted
                $orginal_file_name= strtolower(basename($_FILES["Filedata"]["name"])); //get lowercase filename
                $file_ending= substr($orginal_file_name, strlen($orginal_file_name)-4, 4); //file extension

                if (in_array(strtolower($file_ending), array(".jpg", ".gif", ".png"), true)) { // file filter...
                        // ...don't forget that file extension can be fake!

                        $file= 'uploaded_data/'.sha1($orginal_file_name."|".rand(0,99999)).$file_ending;
                        // path 'uploaded_data/' must exist! It's recommended that you store files with unique
                        // names and not with original names.

                        if (move_uploaded_file($_FILES['Filedata']['tmp_name'], $file)) { // move posted file...
                                /*
                                TO-DO:
                                insert your PHP code to execute when file has been posted
                                */
                        }
                }
        }
        else {
                /*
                TO-DO:
                insert your PHP code to execute when no file has been posted
                */
        }
?>