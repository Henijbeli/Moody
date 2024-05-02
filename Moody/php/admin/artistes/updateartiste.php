<?php 
include('../../connect.php');

$username = $_POST['user'];
$new_username = $_POST['username'];
$nickname = $_POST['nickname'];
$nb_abonne = $_POST['nb_abonne'];
$nb_song = $_POST['nb_song'];
$verif =True;





if (isset($new_username)) {
    $sql = "SELECT * FROM artiste WHERE username='$new_username'";
    $result = mysqli_query($conn, $sql);
    if ($result->num_rows == 0) {
        $queryu = "UPDATE artiste SET username='$new_username' WHERE username='$username'";
        $res = mysqli_query($conn, $queryu);
    } else {
        $verif = false;
    }
}

if (isset($nickname)) {
    $queryu = "UPDATE artiste SET nickname='$nickname' WHERE username='$new_username'";
    $result = mysqli_query($conn, $queryu);
    if (!$result) $verif = false;
}

if (isset($nb_abonne)) {
    $queryu = "UPDATE artiste SET nb_abonne='$nb_abonne' WHERE username='$new_username'";
    $result = mysqli_query($conn, $queryu);
    if (!$result) $verif = false;
}

if (isset($nb_song)) {
    $queryu = "UPDATE artiste SET nb_song='$nb_song' WHERE username='$new_username'";
    $result = mysqli_query($conn, $queryu);
    if (!$result) $verif = false;
}
print_r($_POST);


echo json_encode(["result" => $verif]);

?>
