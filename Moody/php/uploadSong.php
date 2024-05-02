<?php
header('Access-Control-Allow-Origin: http://localhost:4200'); 
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Initialize response variables
$result = 'error';
$songPath = '';
$coverPath = '';
$message = '';

// Handle POST requests
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve the songname from POST data
    $songname = isset($_POST['songname']) ? $_POST['songname'] : null;
    
    if ($songname) {
        if (!empty($_FILES)) {
            foreach ($_FILES as $key => $file) {
                // Set the directory based on file type
                $uploadDir = $key === 'audioFile' ? "../src/assets/SongsSrc/" : ($key === 'imageFile' ? "../src/assets/CoversSrc/" : null);
                if ($uploadDir === null) continue;

                // Ensure directory exists
                if (!is_dir($uploadDir)) {
                    mkdir($uploadDir, 0777, true);
                }

                // Generate a sanitized version of the songname
                $sanitizedSongName = preg_replace('/[^a-zA-Z0-9_-]/', '', $songname); // Removes special characters
                $fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);
                $filename = $sanitizedSongName . '.' . $fileExtension;
                // Replace spaces with underscores in the filename
                $filename = str_replace(' ', '_', $filename);
                $destination = $uploadDir . $filename;

                // Move the uploaded file
                if (move_uploaded_file($file['tmp_name'], $destination)) {
                    if ($key == 'audioFile') {
                        $songPath = $destination;
                    } elseif ($key == 'imageFile') {
                        $coverPath = $destination;
                    }
                } else {
                    $message = 'Failed to save file: ' . $file['name'];
                    echo json_encode(['result' => 'error', 'message' => $message]);
                    exit;
                }
            }
        }

        // Check if both files were uploaded
        if (!empty($songPath) && !empty($coverPath)) {
            $result = 'success';
            $message = 'Files uploaded successfully.';
        } else {
            $message = 'Files were not uploaded successfully.';
        }
    } else {
        $message = 'Song name not provided.';
    }
} else {
    $message = 'Invalid request method. Only POST requests are accepted.';
}

// Final JSON response
echo json_encode([
    'result' => $result,
    'url' => $songPath,
    'cover' => $coverPath,
    'message' => $message
]);

exit;
?>
