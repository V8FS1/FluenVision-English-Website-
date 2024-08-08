<?php
session_start();
?>
<?php
  include "db.php";
  header('Content-Type: application/json; charset=utf-8');
  $email = mysqli_real_escape_string($conn,$_POST['email']);
  $password = mysqli_real_escape_string($conn,$_POST['password']);

  $query = "SELECT * FROM users WHERE email = '$email' AND password = '$password' ";

  $result = $conn->query($query);

  if ($result->num_rows > 0) {
    $data = $result->fetch_assoc();

    $response = array(
      "id" => $data["id"],
      "username" => $data["username"],
      "email" => $data["email"],
      "status" => "ok"
    );

    $_SESSION['id']=$data['id'];
    $_SESSION['username']=$data['username'];
    $_SESSION['email']=$data['email'];

    echo json_encode($response);

    // header("Location: ../user.php?id='".$data['id']."'");
    mysqli_close($conn);
    die();
  }
  else {
    echo json_encode("error");
    mysqli_close($conn);
    die();
  }
?>
