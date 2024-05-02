<?php 
include('../../connect.php');

$output= array();
$sql = "SELECT * FROM artiste ";

$totalQuery = mysqli_query($conn,$sql);
$total_all_rows = mysqli_num_rows($totalQuery);

$columns = array(
    0 => 'username',
    1 => 'nickname',
    2 => 'nb_abonne',
    3 => 'nb_song',
);

if(isset($_POST['search']['value']))
{
    $search_value = $_POST['search']['value'];
    $sql .= " WHERE username like '%".$search_value."%'";
    $sql .= " OR nickname like '%".$search_value."%'";
    $sql .= " OR nb_abonne like '%".$search_value."%'";
    $sql .= " OR nb_song like '%".$search_value."%'";
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
    $sub_array[] = $row['nickname'];
    $sub_array[] = $row['nb_abonne'];
    $sub_array[] = $row['nb_song'];

    $sub_array[] = '<a href="javascript:void();" data-id="'.$row['username'].'" class="btn btn-info btn-sm editbtn" >Edit</a>  <a href="javascript:void();" data-id="'.$row['username'].'" class="btn btn-danger btn-sm deleteBtn" >Delete</a>';
    $data[] = $sub_array;
}

$output = array(
    'draw'=> intval($_POST['draw']),
    'recordsTotal' =>$count_rows ,
    'recordsFiltered'=>   $total_all_rows,
    'data'=>$data,
);
echo  json_encode($output);
?>
