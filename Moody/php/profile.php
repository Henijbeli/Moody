<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-type: application/json');
include "connect.php";
$json_data = json_decode(file_get_contents('php://input'), true);

function email_check($useremail)
{
    if (filter_var($useremail, FILTER_VALIDATE_EMAIL)) {
        return true;
    }
}
function final_username($useremail, $conn)
{
    if (filter_var($useremail, FILTER_VALIDATE_EMAIL)) {
        $req = "SELECT username FROM client WHERE email='$useremail'";
        $res = mysqli_query($conn, $req);
        if ($row = mysqli_fetch_assoc($res)) {
            return $row['username'];
        }
        return false;
    }
}

function fetch_profile_image($row) {
    return isset($row['pdp']) ? substr($row['pdp'], 7) : "assets/img/default_profile_image.jpg";
}
if (isset($json_data['username'])) {
    $id = $json_data['username'];
    if (email_check($id)) {
        $id = final_username($id, $conn);
    }
    $artist = array();
    //follow list
    $req1 = "SELECT A.nickname,C.pdp FROM follow F,client C,artiste A WHERE F.username='$id' AND F.id_Artiste=C.username AND F.id_Artiste=A.username";
    $res1 = mysqli_query($conn, $req1);
    if ($res1 && mysqli_num_rows($res1) > 0) {
        while ($row1 = mysqli_fetch_assoc($res1)) {
            $artist[] = $row1;
        }
    }
    //artiste info
    $req = "SELECT * FROM client C, artiste A WHERE C.username='$id' AND C.username=A.username";
    $res = mysqli_query($conn, $req);
    if (mysqli_num_rows($res) > 0) {
        $row = mysqli_fetch_assoc($res);
        $pdp="assets/img/default_profile_image.jpg";
        if (isset($row['pdp']) && $row['pdp'] !== null && trim($row['pdp']) !== ""){
            $row['pdp'] = substr($row['pdp'],7,);
            $pdp= $row['pdp'];
        }
        /*$req12= "SELECT COUNT(id_song) AS nb_song FROM song WHERE id_artiste='$id'";
        $res12= mysqli_query($conn, $req12);
        if($res12){
            $row12=mysqli_fetch_assoc($res12);
            $row['nb_song']= $row12['nb_song'];
        }*/
        $response = array(
            "username" => $row['nickname'],
            "nb_A" => $row['nb_abonne'],
            "nb_S" => $row['nb_song'],
            "pdp" => $pdp,
            "artist" => $artist
            
        );
        echo json_encode(array(
            "result" => "success",
            "data" => $response
        ));
    } elseif (mysqli_num_rows($res) == 0) {
        $req = "SELECT * FROM client WHERE username='$id'";
        $res = mysqli_query($conn, $req);
        if (mysqli_num_rows($res) > 0) {
            $row = mysqli_fetch_assoc($res);
            $pdp="assets/img/default_profile_image.jpg";
            if (isset($row['pdp']) && $row['pdp'] !== null && trim($row['pdp']) !== ""){
                $row['pdp'] = substr($row['pdp'],7,);
                $pdp= $row['pdp'];
            }
            $response = array(
                "username" => $row['username'],
                "name" => $row['name'],
                "nb_A" => 0,
                "nb_S" => 0,
                "pdp" => $pdp,
                "artist" => $artist
                
            );

            echo json_encode(array(
                "result" => "success",
                "data" => $response
            ));
        }
    } else {

        echo json_encode(array(
            "result" => "failure"
        ));
    }
} else {

    echo json_encode(array(
        "result" => "failure"
    ));
}
