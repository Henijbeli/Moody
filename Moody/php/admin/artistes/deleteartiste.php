<?php
include('../../connect.php');

// Check if username is provided in the request
if(isset($_POST['username'])) {
    $username = $_POST['username'];
    
    // Use prepared statement to prevent SQL injection
    $deleteUserQuery = "DELETE FROM artiste WHERE username=?";
    $stmt = mysqli_prepare($conn, $deleteUserQuery);
    
    // Bind parameters
    mysqli_stmt_bind_param($stmt, "s", $username);
    
    // Attempt to delete the user from the artiste table
    try {
        // Execute the statement
        if(mysqli_stmt_execute($stmt)) {
            // If user is deleted from artiste table, attempt to delete associated records from follow table
            $deleteFollowQuery = "DELETE FROM follow WHERE username=?";
            $stmtFollow = mysqli_prepare($conn, $deleteFollowQuery);

            // Bind parameters
            mysqli_stmt_bind_param($stmtFollow, "s", $username);

            // Execute the statement
            if(mysqli_stmt_execute($stmtFollow)) {
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
            mysqli_stmt_close($stmtFollow);
        } else {
            $data = array(
                'result' => 'error',
                'message' => mysqli_error($conn),
            );
        }
    } catch (mysqli_sql_exception $e) {
        // Handle the exception
        $data = array(
            'result' => 'error',
            'message' => $e->getMessage(),
        );
    }
    
    // Close statement
    mysqli_stmt_close($stmt);
} else {
    // If username is not provided, return an error message
    $data = array(
        'result' => 'error',
        'message' => 'Username not provided in the request.',
    );
}

// Encode the response data as JSON and send it back
echo json_encode($data);
?>
