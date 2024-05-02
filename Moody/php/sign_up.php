<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-type: application/json');
include "connect.php";

$json_data = json_decode(file_get_contents('php://input'), true); 
$username = $json_data['username'];
$name = $json_data['name'];
$lastname = $json_data['lastname'];
$email = $json_data['email'];
$pwd = $json_data['pwd'];
$gender = $json_data['gender'];

function verifier_email($x, $conn) {
    $req = "SELECT COUNT(*) AS count FROM client WHERE email='$x'";
    $result = mysqli_query($conn, $req);
    if ($result) {
        $row = mysqli_fetch_assoc($result);
        $count = $row['count'];
        if ($count == 0) {
            return true;
        } else {
            return "email incorrect";
        }
    } else {
        return "error";
    }
}

function verifier_username($x, $conn) {
    $req = "SELECT COUNT(*) AS count FROM client WHERE username='$x'";
    $result = mysqli_query($conn, $req);
    if ($result) {
        $row = mysqli_fetch_assoc($result);
        $count = $row['count'];
        if ($count == 0) {
            return true;
        } else {
            return "username incorrect";
        }
    } else {
        return "error";
    }
}

if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $email_verification = verifier_email($email, $conn);
    $username_verification = verifier_username($username, $conn);

    if ($email_verification === true && $username_verification === true) {
        $req = "INSERT INTO client (`username`, `name`, `last_name`, `email`, `pwd`, `pdp`, `gender`) VALUES ('$username', '$name', '$lastname', '$email', '$pwd', '../src/assets/img/default_profile_image.jpg', '$gender')";
        if (mysqli_query($conn, $req)) {
            echo json_encode(array("result" => "success", "message" => "Inserted successfully"));
        } else {
            echo json_encode(array("result" => "error", "message" => "Database error"));
        }
    } else {
        $response = array("result" => "error");
        if ($email_verification !== true) {
            $response["email_error"] = $email_verification;
        }
        if ($username_verification !== true) {
            $response["username_error"] = $username_verification;
        }
        echo json_encode($response);
    }
} else {
    echo json_encode(array("result" => "error", "message" => "Invalid email format"));
}

$conn->close();
?>
