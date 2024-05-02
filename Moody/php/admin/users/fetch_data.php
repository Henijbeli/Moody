<?php 
include('../../connect.php');

$output= array();
$sql = "SELECT * FROM client ";

$totalQuery = mysqli_query($conn,$sql);
$total_all_rows = mysqli_num_rows($totalQuery);

$columns = array(
	0 => 'username',
	1 => 'name',
	2 => 'last_name',
	3 => 'email',
    4 => 'pwd',
    6 => 'gender',


);

if(isset($_POST['search']['value']))
{
	$search_value = $_POST['search']['value'];
	$sql .= " WHERE username like '%".$search_value."%'";
	$sql .= " OR name like '%".$search_value."%'";
	$sql .= " OR last_name like '%".$search_value."%'";
	$sql .= " OR email like '%".$search_value."%'";
    $sql .= " OR pwd like '%".$search_value."%'";
    $sql .= " OR gender like '%".$search_value."%'";

}

if(isset($_POST['order']))
{
	$column_name = $_POST['order'][0]['column'];
	$order = $_POST['order'][0]['dir'];
	$sql .= " ORDER BY ".$columns[$column_name]." ".$order."";
}
else
{
	$sql .= " ORDER BY username desc";
}

if($_POST['length'] != -1)
{
	$start = $_POST['start'];
	$length = $_POST['length'];
	$sql .= " LIMIT  ".$start.", ".$length;
}	

$query = mysqli_query($conn,$sql);
$count_rows = mysqli_num_rows($query);
$data = array();
while($row = mysqli_fetch_assoc($query))
{
	$sub_array = array();
	$sub_array[] = $row['username'];
	$sub_array[] = $row['name'];
	$sub_array[] = $row['last_name'];
	$sub_array[] = $row['email'];
	$sub_array[] = $row['pwd'];
    $sub_array[] = $row['gender'];


	$sub_array[] = '<a href="javascript:void();" data-username="'.$row['username'].'"  class="btn btn-info btn-sm editbtn" >Edit</a>  <a href="javascript:void();" data-id="'.$row['username'].'"  class="btn btn-danger btn-sm deleteBtn" >Delete</a>';
	$data[] = $sub_array;
}

$output = array(
	'draw'=> intval($_POST['draw']),
	'recordsTotal' =>$count_rows ,
	'recordsFiltered'=> $total_all_rows,
	'data'=>$data,
);
echo  json_encode($output);
?>
