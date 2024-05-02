<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-type: application/json');
include "connect.php";




$json_data = json_decode(file_get_contents('php://input'), true);
$useremail = $json_data['email'];


//functions

function check_email($useremail, $conn)
{
    return filter_var($useremail, FILTER_VALIDATE_EMAIL);
}

function check_username($username, $conn)
{
    $req = "SELECT * FROM client WHERE username='$username'";
    $res = mysqli_query($conn, $req);
    return mysqli_num_rows($res) > 0;
}

function found_email($username, $conn)
{
    $req = "SELECT email FROM client WHERE username='$username'";
    $res = mysqli_query($conn, $req);
    if ($row = mysqli_fetch_assoc($res)) {
        return $row['email'];
    }
    return false;
}

function final_email($useremail, $conn)
{
    $email = "";
    $res = check_email($useremail, $conn);
    if ($res == false) {
        if (check_username($useremail, $conn)) {
            $email = found_email($useremail, $conn);
        }
    } else {
        $email = $useremail;
    }
    return $email;
}

function insert_code($email, $code, $conn)
{
    $req = "UPDATE client SET codec='$code' WHERE email='$email'";
    $res = mysqli_query($conn, $req);
    if ($res) {
        return true;
    } else {
        return false;
    }
}

//PP
$email = final_email($useremail, $conn);
$config = require_once 'config.php';
$secret_key = $config['jwt_secret'];


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require_once 'vendor/autoload.php';
use \Firebase\JWT\JWT;


require 'D:\info\progs\xampp\htdocs\api\src\Exception.php';
require 'D:\info\progs\xampp\htdocs\api\src\PHPMailer.php';
require 'D:\info\progs\xampp\htdocs\api\src\SMTP.php';



if ($email == "") {
    echo json_encode(array(
        "result" => "failure",
        "email_error" => "email incorrect"
    ));
} else {
    $code = rand(999999, 111111);
    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'rajhiaziz2@gmail.com';
    $mail->Password = 'vkwc gdfx vlof bfew';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    $mail->setFrom('rajhiaziz2@gmail.com', 'MOODY');
    $mail->addAddress($email);
    $mail->isHTML(true);
    $mail->Subject = 'confirme ur identity';
    $mail->Body = "Recover your password <br> ur code : " . $code;

    $mail->send();
    $ins = insert_code($email, $code, $conn);
    if ($ins) {
    $issuer_claim = "localhost"; 
    $audience_claim = "localhost"; 
    $issuedat_claim = time(); 
    $notbefore_claim = $issuedat_claim + 10; 
    $expire_claim = $issuedat_claim + 3600; 

    $token = array(
        "iss" => $issuer_claim,
        "aud" => $audience_claim,
        "iat" => $issuedat_claim,
        "nbf" => $notbefore_claim,
        "exp" => $expire_claim,
        "data" => array(
            "code" =>$code,
            "email" =>$email,
        )
    );
    // You need to include the JWT library here.
    // Assuming JWT class exists and is properly configured.
    $jwt = JWT::encode($token, $secret_key, 'HS256');
    echo json_encode(array("result" => true, "jwt" => $jwt));
        echo json_encode(array("result" => "success")); 
    }
    echo $jwt;
    echo $email;

}
/*
$data=array(
            "code" =>$code,
            "email" =>$email,
            "zeb" =>time()
        );
        $jwt = JWT::encode($data,$secret_key, 'HS256');
        echo "suii :".$jwt;
*/



