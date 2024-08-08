<?php

// header('Access-Control-Allow-Origin: *');

// header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');

// header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

// iconv("ISO-8859-1", "UTF-8");

// setlocale(LC_ALL, 'tr_TR');

header('charset=utf-8');

$servername = "localhost";

$username = "id21737634_lesson";

$password = "Hh123456~";

$database = "DatabasePhp";





// 

// Create connection

$conn =  new mysqli($servername, $username, $password, $database);

$conn->set_charset("utf8");



// Check connection

if (!$conn) {

  die("Connection failed: " . mysqli_connect_error());

}



?>