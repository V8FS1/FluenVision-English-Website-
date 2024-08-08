<?php
 include "db.php";
header('Content-Type: application/json; charset=utf-8');
 $id = $_POST['id'];
 $username = $_POST['username'];
 $email = $_POST['email'];

// $updateQuery = mysqli_query($conn, "UPDATE visitors SET name = '$name', phone = '$phone' WHERE id = '$id'");
 $updateQuery = "UPDATE users SET username = '$username', email = '$email' WHERE id = '$id'";


    if($conn->query($updateQuery) === TRUE) {
      $response = array(
        'status' => 'ok'
      );

    echo json_encode($response);
    mysqli_close($conn);
    die();
  }
  else {
    $response = array(
      "status" => "error",
      "errorInfo" => $conn->error
    ); 

    echo json_encode($response);
    mysqli_close($conn);
    die();
  }
?>