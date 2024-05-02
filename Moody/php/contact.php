<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-type: application/json');
include "connect.php";
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once 'vendor/autoload.php';

use \Firebase\JWT\JWT;

require 'src\Exception.php';
require 'src\PHPMailer.php';
require 'src\SMTP.php';

$json_data = json_decode(file_get_contents('php://input'), true);
$user=$json_data['username'];
$useremail = $json_data['email'];
$subject = $json_data['subject'];
$message = $json_data['message'];

$mail_send = "heni.jbeli8586@istic.ucar.tn"; // Added the semicolon

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

//PP
$email = final_email($useremail, $conn);

if ($email == "") {
    echo json_encode(array(
        "result" => "failure",
        "email_error" => "email incorrect"
    ));
} else {
    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'rajhiaziz2@gmail.com';
    $mail->Password = 'vkwc gdfx vlof bfew';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    $mail->setFrom('rajhiaziz2@gmail.com', 'MOODY');
    $mail->addAddress($mail_send);
    $mail->isHTML(true);
    $mail->Subject = "$subject";
    $mail->Body = "$message" . "<br/> from $email"; // Correction of the email body construction
    $mail->send();

    $req="INSERT INTO contact (username,email,subject,description) VALUES('$user','$email','$subject','$message')";
    $result = mysqli_query($conn, $req);

    echo json_encode(array("result" => "success"));
}
?>
