<?php
require 'database.php';

//main-----------------------------------------------------------------------------------------------------------
// Get the posted data.
$postdata = file_get_contents("php://input");


if (isset($postdata) && !empty($postdata)) {
    // Extract the data.
    $request = json_decode($postdata);


    // Sanitize.
    $nickname_post = mysqli_real_escape_string($con, trim($request->nickname));
    $password_post = mysqli_real_escape_string($con, trim($request->password));
    $description_post = mysqli_real_escape_string($con, trim($request->description));
    $isMentee_post =  filter_var($request->isMentee, FILTER_VALIDATE_BOOLEAN); //boolean
    if (mysqli_connect_errno()) {
        // If there is an error with the connection, stop the script and display the error.
        exit('Failed to connect to MySQL: ' . mysqli_connect_error());
    }


    $sql = "SELECT nickname FROM bouba_userdata_tbl WHERE nickname='{$nickname_post}'";
    $result = $con->query($sql);

    if ($result->num_rows > 0) {
        echo json_encode(false);
    } else {
        
        $hashed_password = password_hash($password_post, PASSWORD_DEFAULT);

        $sql = "INSERT INTO bouba_userdata_tbl (nickname,firstNickname) VALUES ('{$nickname_post}','{$nickname_post}')";

        if ($con->query($sql) === TRUE) {
           echo json_encode(true);
        }
        
    }
    
}
