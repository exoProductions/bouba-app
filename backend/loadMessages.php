<?php
require 'database.php';

$allMessages;

function addMessage($row, $ind)
{
    global $allMessages, $menteeNickname_post, $peerNickname_post;

    $chat = [
        'ID' => filter_var($row["ID"], FILTER_VALIDATE_INT),
        'menteeNickname' => $menteeNickname_post,
        'peerNickname' => $peerNickname_post,
        'message' => $row["message"],
        'isFromMentee' => filter_var($row["isFromMentee"], FILTER_VALIDATE_BOOLEAN),
    ];
    $allMessages[$ind] = $chat;
}
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

            $sql2 = "SELECT ID,message,isFromMentee FROM bouba_messages_tbl WHERE menteeNickname = '{$menteeNickname_post}' AND peerNickname='{$peerNickname_post}' ";

            $qry2 = mysqli_query($con, $sql2);

            $ind = 0;
            while ($row2 = mysqli_fetch_assoc($qry2)) {
                addMessage($row2, $ind);
                $ind++;
            }
            echo json_encode($allMessages);
        }
    }

    mysqli_free_result($qry);
}
