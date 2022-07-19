<?php
require 'database.php';

//main-----------------------------------------------------------------------------------------------------------
// Get the posted data.
$postdata = file_get_contents("php://input");


if (isset($postdata) && !empty($postdata)) {
    // Extract the data.
    $request = json_decode($postdata);


    // Sanitize.
    $menteeNickname_post = mysqli_real_escape_string($con, trim($request->menteeNickname));
    $peerNickname_post = mysqli_real_escape_string($con, trim($request->peerNickname));
    $isMentee_post =  filter_var($request->isMentee, FILTER_VALIDATE_BOOLEAN); //boolean

    if (mysqli_connect_errno()) {
        // If there is an error with the connection, stop the script and display the error.
        exit('Failed to connect to MySQL: ' . mysqli_connect_error());
    }
    $sql = "";
    if ($isMentee_post) {
        $sql = "DELETE FROM bouba_chat_tbl WHERE menteeNickname='{$menteeNickname_post}' AND peerNickname='{$peerNickname_post}' ";
    } else {
        $sql = "UPDATE bouba_chat_tbl SET accepted=false WHERE menteeNickname='{$menteeNickname_post}' AND peerNickname='{$peerNickname_post}' ";
    }

    if ($con->query($sql) === TRUE) {
        echo json_encode(true);
    } else {
        echo json_encode(false);
    }
}
