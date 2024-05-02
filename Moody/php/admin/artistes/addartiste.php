<?php 
include('../../connect.php');

$username = $_POST['username'];
$sql = "SELECT COUNT(*) AS count FROM client WHERE username='$username'";
$result = mysqli_query($conn, $sql);

if ($result) {
    $row = mysqli_fetch_assoc($result);
    $count = $row['count'];
    if ($count != 0) {
        $sql = "SELECT COUNT(*) AS count FROM artiste WHERE username='$username'";
        $result = mysqli_query($conn, $sql);
        if ($result) {
            $row = mysqli_fetch_assoc($result);
            $count = $row['count'];
            if ($count == 0) {
                $nickname = $_POST['nickname'];
                $nb_abonne = $_POST['nb_abonne'];
                $nb_song = $_POST['nb_song'];

                $insert_sql = "INSERT INTO artiste (username, nickname, nb_abonne, nb_song) VALUES ('$username', '$nickname', '$nb_abonne', '$nb_song')";
                $insert_query = mysqli_query($conn, $insert_sql);

                if ($insert_query) {
                    $data = array(
                        'result' => 'success'
                    );
                } else {
                    $data = array(
                        'result' => 'error',
                        'message' => mysqli_error($conn)
                    );
                }
            } else {
                $data = array(
                    'result' => 'error',
                    'message' => 'Username already exists in the artiste table'
                );
            }
        } else {
            $data = array(
                'result' => 'error',
                'message' => mysqli_error($conn)
            );
        }
    } else {
        $data = array(
            'result' => 'error',
            'message' => 'Username dosent exists in the client table'
        );
    }
} else {
    $data = array(
        'result' => 'error',
        'message' => mysqli_error($conn)
    );
}

echo json_encode($data);
?>
