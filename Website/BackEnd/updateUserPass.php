<?php
 include "db.php";
header('Content-Type: application/json; charset=utf-8');
 $newpassword = $_POST['newpassword'];
 $newpassword2 = $_POST['newpassword2'];
 $currentpassword = $_POST['currentpassword'];
 $id = $_POST['id'];


// $updateQuery = mysqli_query($conn, "UPDATE visitors SET name = '$name', phone = '$phone' WHERE id = '$id'");
 $updateQuery = "UPDATE users SET password = '$newpassword' WHERE id = '$id'";

 $query = "SELECT id, username, email FROM users WHERE id = '$id' and password='$currentpassword'";

 $result = $conn->query($query);

 if ($result->num_rows > 0) {
   $data = $result->fetch_assoc();

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
  } else {
    $response = array(
      "status" => "güncel şifre yanlıs",
      "errorInfo" => $conn->error
    ); 
  
    echo json_encode($response);
    mysqli_close($conn);
    die();
  }



 
?>