<?php
include('../../connect.php');

// Check if all required fields are set
if(isset($_POST['name'], $_POST['id_artiste'], $_POST['id_mood'], $_POST['id_tempo'], $_POST['id_activity'], $_POST['id_category'], $_POST['date'])) {
    // Assign POST data to variables
    $name = $_POST['name'];
    $id_artiste = $_POST['id_artiste'];
    $id_mood = $_POST['id_mood'];
    $id_tempo = $_POST['id_tempo'];
    $id_activity = $_POST['id_activity'];
    $id_category = $_POST['id_category'];
    $date = $_POST['date'];
    


    // Prepare and execute the SQL statement
    $sql = "INSERT INTO song (name, id_artist, id_mood, id_tempo, id_activity, id_category, date) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "ssiiiis", $name, $id_artiste, $id_mood, $id_tempo, $id_activity, $id_category, $date);
    $query = mysqli_stmt_execute($stmt);

    if($query) {
        $data = array('result' => 'success');
        echo json_encode($data);
    } else {
        $data = array('result' => 'error');
        echo json_encode($data);
    }

    mysqli_stmt_close($stmt);
    mysqli_close($conn);
} else {
    // Handle case where required fields are not set
    $data = array('result' => 'error', 'message' => 'Required fields are missing.');
    echo json_encode($data);
}
?>
