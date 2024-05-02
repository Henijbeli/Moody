<?php 
include('../connect.php');
$songname = $_POST['songname'];
$sql = "SELECT * FROM song WHERE songname='$songname' LIMIT 1";
$query = mysqli_query($con,$sql);
$row = mysqli_fetch_assoc($query);
echo json_encode($row);
?>
