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
    $password_post = mysqli_real_escape_string($con, trim($request->password));
    $message_post = mysqli_real_escape_string($con, trim($request->message));
    $isMentee_post =  filter_var($request->isMentee, FILTER_VALIDATE_BOOLEAN); //boolean

    if (mysqli_connect_errno()) {
        exit('Failed to connect to MySQL: ' . mysqli_connect_error());
    }

    $sql = "";
    if ($isMentee_post) {
        $sql = "SELECT password FROM bouba_userdata_tbl WHERE nickname = '{$menteeNickname_post}'";
    } else {
        $sql = "SELECT password FROM bouba_userdata_tbl WHERE nickname = '{$peerNickname_post}'";
    }
    $qry = mysqli_query($con, $sql);

    while ($row = mysqli_fetch_assoc($qry)) {
        if (password_verify($password_post, $row["password"])) {

            $sql2 = "INSERT INTO bouba_messages_tbl (menteeNickname,peerNickname,message,isFromMentee) VALUES ('{$menteeNickname_post}','{$peerNickname_post}','{$message_post}','{$isMentee_post}')";

            if ($con->query($sql2) === TRUE) {
                echo json_encode(true);
            } else {
                echo json_encode(false);
            }
        }
    }
    mysqli_free_result($qry);
}
