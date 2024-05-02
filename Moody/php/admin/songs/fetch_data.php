<?php 
include('../../connect.php');

$output = array();
$sql = "SELECT * FROM song";

$totalQuery = mysqli_query($conn, $sql);
$total_all_rows = mysqli_num_rows($totalQuery);
$columns = array(
    0 => 'name',
    1 => 'id_artist',
    2 => 'id_mood',
    3 => 'id_activity',
    4 => 'id_tempo',
    5 => 'id_category',
    6 => 'date'
);
if(isset($_POST['search']['value'])) {
    $search_value = $_POST['search']['value'];
    $sql .= " WHERE song.name LIKE '%".$search_value."%'";
    $sql .= " OR id_artist LIKE '%".$search_value."%'";
    $sql .= " OR id_mood LIKE '%".$search_value."%'";
    $sql .= " OR id_activity LIKE '%".$search_value."%'";
    $sql .= " OR id_tempo LIKE '%".$search_value."%'";
    $sql .= " OR id_category LIKE '%".$search_value."%'";
    $sql .= " OR date LIKE '%".$search_value."%'";
}

if(isset($_POST['order'])) {
    $column_name = $_POST['order'][0]['column'];
    $order = $_POST['order'][0]['dir'];
    $sql .= " ORDER BY ".$columns[$column_name]." ".$order;
} else {
    $sql .= " ORDER BY song.id DESC";
}

if($_POST['length'] != -1) {
    $start = $_POST['start'];
    $length = $_POST['length'];
    $sql .= " LIMIT ".$start.", ".$length;
}   
$query = mysqli_query($conn, $sql);
$count_rows = mysqli_num_rows($query);
$data = array();
while($row = mysqli_fetch_assoc($query)) {
    $sub_array = array();
    $sub_array[] = $row['name'];
    $sub_array[] = $row['id_artist'];
    $sub_array[] = $row['id_mood'];
    $sub_array[] = $row['id_tempo'];
    $sub_array[] = $row['id_activity'];
    $sub_array[] = $row['id_category'];
    $sub_array[] = $row['date'];
    $sub_array[] = '<a href="javascript:void();" data-username="'.$row['id'].'"  class="btn btn-info btn-sm editbtn" >Edit</a>  <a href="javascript:void();" data-id="'.$row['id'].'"  class="btn btn-danger btn-sm deleteBtn" >Delete</a>';
    $data[] = $sub_array;
}

$output = array(
    'draw' => intval($_POST['draw']),
    'recordsTotal' => $total_all_rows,
    'recordsFiltered' => $total_all_rows,
    'data' => $data,
);
echo json_encode($output);
?>
