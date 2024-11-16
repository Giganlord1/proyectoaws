<?php
$server= "127.0.0.1";
$username= "root";
$password= "carlos04";
$dbname= "AWS";

$connection = new mysqli ($server, $username, $password, $dbname);
$connection ->set_charset("utf8");
if($connection->connect_error){
    die("fallo la coneccion: ".$connection->connect_error);
}

?>