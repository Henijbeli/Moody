<?php
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

include('connect.php'); 

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
    exit;
}

$songname = $data['songname'] ?? null;
$url = $data['url'] ?? null;
$cover = $data['cover'] ?? null;
$artistName = $data['ArtistName'] ?? null;
$mood = $data['mood'] ?? null;
$category = $data['category'] ?? null;
$activity = $data['activity'] ?? null;
$tempo = $data['tempo'] ?? null;

$id_artist = getArtistId($conn, $artistName);
$id_mood = getMoodId($conn, $mood);
$id_tempo = getTempoId($conn, $tempo);
$id_activity = getActivityId($conn, $activity);
$id_category = getCategoryId($conn, $category);

function getArtistId($conn, $artistName){
    if ($artistName) {
        $req="SELECT username FROM artiste Where nickname='$artistName'";
        $res=mysqli_query($conn,$req);
        if ($row = mysqli_fetch_assoc($res)) {
            return $row['username'];
        } 
    } else {
        return null;
    }
}
function getActivityId($conn, $activity_id){
    if ($activity_id) {
        $req="SELECT id FROM activite Where name='$activity_id'";
        $res=mysqli_query($conn,$req);
        $activity = mysqli_fetch_assoc($res);
        return ($activity ? $activity['id'] : null);
    } else {
        return null;
    }
}


function getCategoryId($conn, $category_id){
    if ($category_id) {
        $req="SELECT id FROM categorie Where name='$category_id'";
        $res=mysqli_query($conn,$req);
        $category = mysqli_fetch_assoc($res);
        return ($category ? $category['id'] : null);
    } else {
        return null;
    }
}

// Function to get tempo ID
function getTempoId($conn, $tempo_name) {
    if ($tempo_name) {
        $req="SELECT id FROM tempo Where name='$tempo_name'";
        $res=mysqli_query($conn,$req);
        $tempo = mysqli_fetch_assoc($res);
        return ($tempo ? $tempo['id'] : null);
    } else {
        return null;
    }
}

function getMoodId($conn, $mood_name) {
    if ($mood_name) {
        $req="SELECT id FROM mood Where name='$mood_name'";
        $res=mysqli_query($conn,$req);
        $mood = mysqli_fetch_assoc($res);
        return ($mood ? $mood['id'] : null);
    } else {
        return null;
    }
}
$stmt = $conn->prepare("INSERT INTO song (name, url, cover, id_artist, id_mood, id_tempo, id_activity, id_category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssiiii", $songname, $url, $cover, $id_artist, $id_mood, $id_tempo, $id_activity, $id_category);
$res = $stmt->execute();
if ($res) {
    echo json_encode(['result' => true, 'message' => 'Song added successfully']);
} else {
    echo json_encode(['result' => false, 'message' => 'Error in database query', 'error' => $stmt->error]);
}



$conn->close();
?>
