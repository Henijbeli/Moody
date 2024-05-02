<?php
header('Access-Control-Allow-Origin: http://localhost:4200'); 
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require_once("connect.php");

// Initialize response variables
$result = 'error';
$imgProfilePath = '';
$message = '';

// Handle POST requests
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve the username from POST data    
    if (!empty($_FILES['imgprofile'])) {
        $imgProfileFile = $_FILES['imgprofile'];
        // Set the directory for profile images
        $uploadDir = "../src/assets/ProfileImages/";

        // Ensure directory exists
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        // Generate a sanitized version of the username
        $sanitizedUsername = isset($_POST['username']) ? preg_replace('/[^a-zA-Z0-9_-]/', '', $_POST['username']) : null; // Removes special characters
        if ($sanitizedUsername) {
            $fileExtension = pathinfo($imgProfileFile['name'], PATHINFO_EXTENSION);
            $filename = $sanitizedUsername . '.' . $fileExtension;
            // Replace spaces with underscores in the filename
            $filename = str_replace(' ', '_', $filename);
            $destination = $uploadDir . $filename;

            // Move the uploaded file
            if (move_uploaded_file($imgProfileFile['tmp_name'], $destination)) {
                $imgProfilePath = $destination;
                $result = 'success';
                $message = 'Profile image uploaded successfully.';
                // Update the profile image path in the database
                $sql = "UPDATE client SET pdp='$imgProfilePath' WHERE username='$sanitizedUsername'";
                $queryResult = mysqli_query($conn, $sql);
                if (!$queryResult) {
                    $message .= " Failed to update profile image in the database.";
                }
            } else {
                $message = 'Failed to save profile image: ' . $imgProfileFile['name'];
            }
        } else {
            $message = 'Username not provided.';
        }
    } else {
        $message = 'No profile image uploaded.';
    }
} else {
    $message = 'Invalid request method. Only POST requests are accepted.';
}

// Final JSON response
echo json_encode([
    'result' => $result,
    'imgprofile' => $imgProfilePath,
    'message' => $message
]);

exit;
?>