<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-type: application/json');
include "connect.php";

$json_data = json_decode(file_get_contents('php://input'), true);
$code = $json_data['code'];
$email = $json_data['email'];

/*
$config = require_once 'config.php';
$secret_key = $config['jwt_secret'];



require_once 'vendor/autoload.php';
use \Firebase\JWT\JWT;
use \Firebase\JWT\KEY;
$headers = apache_request_headers();
if(isset($headers['Authorization'])) {
    $authorizationHeaders = $headers['Authorization'];
    $headerValue = explode(' ', $authorizationHeaders);
    $jwt=$headerValue[1]; 
    try{
        $decoded= JWT::decode($jwt, new KEY($secret_key,'HS256'));
    }
    catch(Exception $e){
        echo json_encode(array(
            "result" => "failure",
            "error" => "Error: " . $e->getMessage()
        ));
    }

}
else{
    echo " nkmk";
}
*/
function verif_code($code,$email,$conn){
    $req="SELECT * from client WHERE codec='$code' and email='$email'";
    $res = mysqli_query($conn, $req);
    if($res){
        return true;
    }
    else{
        return false;
    }
}
function delete_code($code,$email,$conn){
    $req="UPDATE client SET codec='NULL' WHERE email='$email' and codec='$code'";
    $res = mysqli_query($conn, $req);
    if($res){
        return true;
    }
    else{
        return false;
    }
}
//PP
if(verif_code($code,$email,$conn)){
    if(delete_code($code,$email,$conn)){
        echo json_encode(array("result" => "success"));
    }
}
else{
    echo json_encode(array(
        "result" => "failure",
        "email_error" => "code incorrect"
    ));
}

?>