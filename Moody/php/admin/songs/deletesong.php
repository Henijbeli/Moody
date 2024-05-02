<?php 
include('../../connect.php');

$songname = $_POST['username'];
$sql = "DELETE FROM song WHERE id='$songname'";
$delQuery =mysqli_query($conn,$sql);
if ($delQuery) {
    $data = array(
        'result' => 'success',
    );
} else {
    $data = array(
        'result' => 'error',
        'message' => mysqli_error($conn),
    );
}

echo json_encode($data);
?>