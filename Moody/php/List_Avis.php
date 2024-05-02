<?php

header('Access-Control-Allow-Origin: http://localhost:4200'); 
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

require "connect.php";

$list = array();
$req = "SELECT * FROM avis";
$res = mysqli_query($conn, $req);
if ($res) {
    while ($row = mysqli_fetch_assoc($res)) {
        $data = array(
            "username" => $row['username'],
            "avis" => $row['rate'],  
            "message" => $row['message']
        );
        $list[] = $data;
    }
    echo json_encode($list);
} else {
    echo json_encode(array("error" => "Failed to fetch data"));
}

?>
