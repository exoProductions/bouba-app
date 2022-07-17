<?php
require 'database.php';

$allChats;

function addChat($row,$nickname, $ind)
{
    global $allChats;

    $chat = [
        'nickname' =>$nickname,
        'partnerNickname' => $row["partnerNickname"],
    ];
    $allChats[$ind] = $chat;
}
//main-----------------------------------------------------------------------------------------------------------
// Get the posted data.
$postdata = file_get_contents("php://input");


if (isset($postdata) && !empty($postdata)) {
    // Extract the data.
    $request = json_decode($postdata);


    // Sanitize.
    $nickname_post = mysqli_real_escape_string($con, trim($request->nickname));
    $password_post = mysqli_real_escape_string($con, trim($request->password));
    $isMentee_post =  filter_var($request->isMentee, FILTER_VALIDATE_BOOLEAN); //boolean

    if (mysqli_connect_errno()) {
        exit('Failed to connect to MySQL: ' . mysqli_connect_error());
    }

    $sql = "SELECT password FROM bouba_userdata_tbl WHERE nickname = '{$nickname_post}'";
    $qry = mysqli_query($con, $sql);

    while ($row = mysqli_fetch_assoc($qry)) {
        if (password_verify($password_post, $row["password"])) {

            $sql2 = "SELECT partnerNickname FROM bouba_chat_tbl WHERE nickname = '{$nickname_post}' AND isMentee = '{$isMentee_post}'";
            $qry2 = mysqli_query($con, $sql2);
        
            $ind=0;
            while ($row2 = mysqli_fetch_assoc($qry2)) {
                addChat($row2,$nickname_post,$ind);
                $ind++;
            }
            echo json_encode($allChats);

        }
    }

    mysqli_free_result($qry);
}
