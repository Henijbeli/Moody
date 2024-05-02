<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-type: application/json');
include "connect.php";

$json_data = json_decode(file_get_contents('php://input'), true);
$pwd = $json_data['pwd'];
$email = $json_data['email'];


function Reset_pwd($pwd,$email,$conn){
    $req="UPDATE client SET pwd='$pwd' where email='$email'";
    $res=mysqli_query($conn,$req);
    if($res){
        return true;
    }else{
        return false;
    }
}

//PP
$req=Reset_pwd($pwd,$email,$conn);
if($req){
    echo json_encode(array("result" => "success"));
}
else{
    echo json_encode(array(
        "result" => "failure",
        "email_error" => "code incorrect"
    ));
}

?>