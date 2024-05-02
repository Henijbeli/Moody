<?php 
include('../../connect.php');
$username = $_POST['username'];
$sql = "SELECT * FROM artiste WHERE username='$username' LIMIT 1";
$query = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($query);
echo json_encode($row);
?>
