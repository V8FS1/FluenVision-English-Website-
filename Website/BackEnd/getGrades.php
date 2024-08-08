<?php
  include "db.php";
  header('Content-Type: application/json; charset=utf-8');
  $userId = $_POST['userId'];

  $query = "SELECT id,quizName,point,level FROM grades WHERE userId = '$userId'";

  $result = $conn->query($query);

  if ($result->num_rows > 0) {
    while ($data = $result->fetch_assoc()) {
        $response[] = array(
            "id" => $data["id"],
            "quizName" => $data["quizName"],
            "point" => $data["point"],
            "level" => $data["level"],
            "status" => "ok"
        );
    }

    

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