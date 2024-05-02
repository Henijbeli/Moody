<?php
require_once("connect.php");
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-type: application/json');

$json_data = json_decode(file_get_contents('php://input'), true);
$id = $json_data['id'];
$name = $json_data['name'];
$return=false;
$sql = "UPDATE song set name='$name' WHERE `id` = $id";
$res=mysqli_query($conn,$sql);
if($res){
    $return=true;
    echo json_encode(array("result" => $return));
}
?>