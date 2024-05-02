<?php 
include('../connect.php');

$username = $_POST['username'];
$name = $_POST['name'];
$last_name = $_POST['last_name'];
$email = $_POST['email'];
$pwd = $_POST['pwd'];
$pdp = $_POST['pdp'];
$gender = $_POST['gender'];

$sql = "UPDATE `client` SET `username`='$username', `name`='$name', `last_name`='$last_name', `email`='$email', `pwd`='$pwd', `pdp`='$pdp', `gender`='$gender' WHERE username='$username'";
$query = mysqli_query($con, $sql);

iif ($query) {
    $data = array(
        'result' => 'success',
    );
} else {
    $data = array(
        'result' => 'error',
        'message' => mysqli_error($conn),
    );
}

echo json_encode($data);
?>
