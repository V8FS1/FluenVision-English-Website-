<?php
  include "db.php";
header('Content-Type: application/json; charset=utf-8');
  $username = $_POST['username'];
  $email = $_POST['email'];
  $password = $_POST['password'];
  $query = "SELECT * FROM users WHERE email = '$email'";

  $result = $conn->query($query);

  if($result->num_rows > 0) {
    $response = array(
      "status" => "error_email",
      "errorInfo" => $conn->error
    );

    echo json_encode($response);
    mysqli_close($conn);
    die();
  }
  else {
    $addQuery = "INSERT INTO users(username, email, password) VALUES('$username', '$email', '$password')";

    if($conn->query($addQuery) === TRUE) {
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
  }
?>