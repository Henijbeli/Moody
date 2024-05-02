<?php
include('../../connect.php');

// Check if all required fields are set
if(isset($_POST['username'], $_POST['name'], $_POST['last_name'], $_POST['email'], $_POST['pwd'], $_POST['gender'], $_POST['pdp'])) {
    // Assign POST data to variables
    $username = $_POST['username'];
    $name = $_POST['name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $pwd = $_POST['pwd'];
    $gender = $_POST['gender'];
    $pdp = $_POST['pdp'];

    // Prepare and execute the SQL statement
    $sql = "INSERT INTO client (username, name, last_name, email, pwd, gender, pdp) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "sssssss", $username, $name, $last_name, $email, $pwd, $gender, $pdp);
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
