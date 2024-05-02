<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-type: application/json');
require_once("connect.php");

$json_data = json_decode(file_get_contents('php://input'), true);
$username = $json_data['user'];
$new_username = $json_data['username'];
$name = $json_data['name'];
$last_name = $json_data['lastname'];
$email = $json_data['email'];
$old_pwd = $json_data['pwd'];
$new_pwd = $json_data['npwd'];
$verif = true;



if (isset($name) && trim($name) !== "" && $name !== null) {
    $queryu = "UPDATE client SET name='$name' WHERE username='$username'";
    $result = mysqli_query($conn, $queryu);
    if (!$result) $verif = false;
}

if (isset($last_name) && trim($last_name) !== "" && $last_name !== null) {
    $queryu = "UPDATE client SET last_name='$last_name' WHERE username='$username'";
    $result = mysqli_query($conn, $queryu);
    if (!$result) $verif = false;
}

if (isset($email) && !empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $sql = "SELECT * FROM client WHERE email='$email'";
    $result = mysqli_query($conn, $sql);
    if ($result->num_rows == 0) {
        $queryu = "UPDATE client SET email='$email' WHERE username='$username'";
        $result = mysqli_query($conn, $queryu);
        if (!$result) $verif = false;
    }else {
            $verif = false;
        }
}


if (isset($new_pwd) && $new_pwd !== null && trim($new_pwd) !== "" && isset($old_pwd) && $old_pwd !== null && trim($old_pwd) !== "") {
    $res = "SELECT pwd FROM client WHERE pwd='$old_pwd' AND username='$username'";
    $result = mysqli_query($conn, $res);
    if ($result->num_rows !== 0) {
        $sql = "UPDATE client SET pwd='$new_pwd' WHERE username='$username'";
        $result = mysqli_query($conn, $sql);
        if (!$result) $verif = false;
    } else {
        $verif = false;
    }
}


if (isset($new_username) && $new_username !== null && trim($new_username) !== "") {
    $sql = "SELECT * FROM client WHERE username='$new_username'";
    $result = mysqli_query($conn, $sql);
    if ($result->num_rows == 0) {
        $queryu = "UPDATE client SET username='$new_username' WHERE username='$username'";
        $res = mysqli_query($conn, $queryu);
    } else {
        $verif = false;
    }
}

echo json_encode(["result" => $verif]);
?>
