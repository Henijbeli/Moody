<?php
header('Access-Control-Allow-Origin: http://localhost:4200'); 
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');


require "connect.php";

$json_data = json_decode(file_get_contents('php://input'), true); 
if (isset( $json_data['username'])) {
    $username = $json_data['username'];
}

$avis = $json_data['rate'];
$comm = $json_data['message'];
if(isset($comm)&&(isset($avis))){
    if (isset($username)) {
        if($username=='root'){
            $username='GUEST';
        }
        $sql = "INSERT INTO avis (username, rate, message) VALUES ('$username', '$avis', '$comm')";
        $result = mysqli_query($conn, $sql);
        if($result){
            echo json_encode(array("result" => "true"));

        }else{
            echo json_encode(array("result" => "false"));

        }

 
    }
    else{
        $sql = "INSERT INTO avis (username, rate, message) VALUES ('GUEST', '$avis', '$comm')";
        $result = mysqli_query($conn, $sql);
        if($result){
            echo json_encode(array("result" => "true"));

        }else{
            echo json_encode(array("result" => "false"));

        }


    }
}
else{
    echo json_encode(array("result" => "error", "message" => "champs vides"));


}
?>
