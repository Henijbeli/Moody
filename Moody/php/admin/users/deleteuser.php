<?php
include('../../connect.php');

// Check if username is provided in the POST request
if(isset($_POST['username'])) {
    $username = $_POST['username'];
    
    // Use prepared statement to prevent SQL injection
    $deleteUserQuery = "DELETE FROM client WHERE username=?";
    $stmt = mysqli_prepare($conn, $deleteUserQuery);
    
    // Bind parameters
    mysqli_stmt_bind_param($stmt, "s", $username);
    
    // Execute the statement
    if(mysqli_stmt_execute($stmt)) {
        $data = array(
            'result' => 'success',
        );
    } else {
        $data = array(
            'result' => 'error',
            'message' => mysqli_error($conn),
        );
    }
    
    // Close statement
    mysqli_stmt_close($stmt);
} else {
    $data = array(
        'result' => 'error',
        'message' => 'Username not provided in the request.',
    );
}

// Encode the response data as JSON and send it back
echo json_encode($data);
?>
