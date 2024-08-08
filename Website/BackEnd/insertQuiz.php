<?php
  include "db.php";
header('Content-Type: application/json; charset=utf-8');
  $userId = $_POST['userId'];
  $quizName = $_POST['quizName'];
  $point = $_POST['point'];
  $level = $_POST['level'];
  $query = "SELECT * FROM grades WHERE quizName = '$quizName' and userId = '$userId' and level='$level'";

  $result = $conn->query($query);

  if($result->num_rows > 0) {
    $updateQuery = "UPDATE grades SET point = '$point' WHERE userId = '$userId' and quizName = '$quizName'";


    if($conn->query($updateQuery) === TRUE) {
      $response = array(
        'status' => 'sınav güncellendi'
      );

    echo json_encode($response);
    mysqli_close($conn);
    die();
  }
  }
  else {
    $addQuery = "INSERT INTO grades(userId, quizName, point, level) VALUES('$userId', '$quizName', '$point', '$level')";

    if($conn->query($addQuery) === TRUE) {
      $response = array(
        'status' => 'puan eklendi'
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