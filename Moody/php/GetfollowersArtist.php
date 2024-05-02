<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-type: application/json');

include "connect.php";
$json_data = json_decode(file_get_contents('php://input'), true);

if (isset($json_data['username'])) {
    $id = $json_data['username'];
    $artists = array();
    $req="SELECT C.pdp,A.nickname 
        FROM follow F,artiste A,client C 
        WHERE F.username='$id' 
        AND F.id_Artiste=C.username
        AND F.id_Artiste=A.username";
    $res=mysqli_query($conn,$req);
    if($res){
        while ($row = mysqli_fetch_assoc($res)){
            if (isset($row['pdp'])){
                $row['pdp'] = substr($row['pdp'],7,);
            }
            $artists[] = $row;
        }       
    }
    echo json_encode($artists);
}

?>