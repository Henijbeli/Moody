<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-type: application/json');
// Connection

require_once("connect.php");
require_once("autoload.php");

use Firebase\JWT\JWT;

$json_data = json_decode(file_get_contents('php://input'), true); 

// Display the received password for debugging
//echo $json_data['pwd'];
function email_check($useremail, $conn){
    if(filter_var($useremail, FILTER_VALIDATE_EMAIL)){
        return true;
    }
}

function final_username($useremail, $conn)
{
    if(filter_var($useremail, FILTER_VALIDATE_EMAIL)){
        $req = "SELECT username FROM client WHERE email='$useremail'";
        $res = mysqli_query($conn, $req);
        if ($row = mysqli_fetch_assoc($res)) {
            return $row['username'];
        }
        return false;
    }
}

if (!empty($json_data['username']) && !empty($json_data['pwd'])) {
    $username = $json_data['username'];
    $password = $json_data['pwd'];

    if (email_check($username,$conn)) {
        $username = final_username($username, $conn);
    }
    
    // retrieve user data using MySQLi prepared statement
    $stmt = $conn->prepare("SELECT * FROM client WHERE username = ?");
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
   
    
    // compare passwords
    if ($user) {
        $stored_pw = $user['pwd']; // Assuming password field in database is 'pwd'
        // Insecure password comparison, should use password_verify() if passwords are hashed
        if ($password === $stored_pw) {
           auth($username,$password);
        } else {
            echo json_encode(array("result" => "Password is incorrect"));
        }
    } else {
        echo json_encode(array("result" => "Username is incorrect"));
    }
} else {
    echo json_encode(array("result" => "Missing username or password"));
}

function auth($username, $password)
{                  
    // jwt token generation             
    $secret_key = ""; 
    $issuer_claim = "localhost"; 
    $audience_claim = "localhost"; 
    $issuedat_claim = time(); 
    $notbefore_claim = $issuedat_claim + 10; 
    $expire_claim = $issuedat_claim + 3600; 

    $token = array(
        "iss" => $issuer_claim,
        "aud" => $audience_claim,
        "iat" => $issuedat_claim,
        "nbf" => $notbefore_claim,
        "exp" => $expire_claim,
        "data" => array(
            "username" => $username,
            "pwd" => $password,
        )
    );
    // You need to include the JWT library here.
    // Assuming JWT class exists and is properly configured.
    $jwt = JWT::encode($token, $secret_key); 
    echo json_encode(array("result" => true, "jwt" => $jwt));
} 

?>
