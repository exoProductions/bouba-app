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
    $peerName_post = mysqli_real_escape_string($con, trim($request->peerName));
    $isMentee_post =  filter_var($request->isMentee, FILTER_VALIDATE_BOOLEAN); //boolean

    if (mysqli_connect_errno()) {
        // If there is an error with the connection, stop the script and display the error.
        exit('Failed to connect to MySQL: ' . mysqli_connect_error());
    }

    $sql = "INSERT INTO bouba_chat_tbl (nickname,partnerNickname,isMentee) VALUES ('{$nickname_post}','{$peerName_post}','{$isMentee_post}')";

    if ($con->query($sql) === TRUE) {
        echo json_encode(true);
    }else{
        echo json_encode(false);
    }
}
