<?php
require 'database.php';

$allMentees;

function addMentee($row, $ind)
{
    global $allMentees;

    $mentee = [
        'nickname' =>$row["nickname"],
        'firstNickname' => $row["firstNickname"],
        'preferedPeer' =>$row["preferedPeer"],
        'description' =>$row["description"],
    ];
    //echo json_encode($productsBought);
    $allMentees[$ind] = $mentee;
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

    if (mysqli_connect_errno()) {
        exit('Failed to connect to MySQL: ' . mysqli_connect_error());
    }

    $sql = "SELECT password FROM bouba_userdata_tbl WHERE nickname = '{$nickname_post}'";
    $qry = mysqli_query($con, $sql);

    while ($row = mysqli_fetch_assoc($qry)) {
        if (password_verify($password_post, $row["password"])) {

            $sql2 = "SELECT menteeNickname FROM bouba_chat_tbl WHERE peerNickname = '{$nickname_post}'";
            $qry2 = mysqli_query($con, $sql2);
        
            while ($row2 = mysqli_fetch_assoc($qry2)) {
                $menteeNickname=$row2['menteeNickname'];
                $sql3 = "SELECT nickname,firstNickname,preferedPeer,description FROM bouba_userdata_tbl WHERE nickname='{$menteeNickname}'";
                $qry3 = mysqli_query($con, $sql3);
                
                $ind=0;
                while ($row3 = mysqli_fetch_assoc($qry3)) {
                    addMentee($row3,$ind);
                    $ind++;
                }
            }
            echo json_encode($allMentees);

        }
    }

    mysqli_free_result($qry);
}
