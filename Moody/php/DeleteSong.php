<?php
require_once("connect.php");
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-type: application/json');

$json_data = json_decode(file_get_contents('php://input'), true);
$id = $json_data['id'];
$return=false;
$sql = "DELETE FROM Song WHERE `id` = $id";
$res=mysqli_query($conn,$sql);
if($res){
    $return=true;
    echo json_encode(array("result" => $return));
}
?>