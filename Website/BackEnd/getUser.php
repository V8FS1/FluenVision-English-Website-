<?php
  include "db.php";
  header('Content-Type: application/json; charset=utf-8');
  $email = $_POST['email'];

  $query = "SELECT id, username, email FROM users WHERE email = '$email'";

  $result = $conn->query($query);

  if ($result->num_rows > 0) {
    $data = $result->fetch_assoc();

    $response = array(
      "id" => $data["id"],
      "username" => $data["username"],
      "email" => $data["email"],
      "status" => "ok"
    );

    

    echo json_encode($response);

    // header("Location: ../user.php?id='".$data['id']."'");
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