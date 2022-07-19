<?php
require 'database.php';

$allPeers;

function addPeer($row, $ind)
{
    global $allPeers;

    $peer = [
        'nickname' => $row["nickname"],
        'firstNickname' => $row["firstNickname"],
        'age' => filter_var($row["age"], FILTER_VALIDATE_INT),
        'gender' => $row["gender"],
        'language' => $row["language"],
        'description' => $row["description"],
    ];
    //echo json_encode($productsBought);
    $allPeers[$ind] = $peer;
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

            $sql2 = "SELECT nickname,firstNickname,age,gender,language,description FROM bouba_userdata_tbl WHERE isMentee = false AND verified=true";
            $qry2 = mysqli_query($con, $sql2);

            $ind = 0;
            while ($row2 = mysqli_fetch_assoc($qry2)) {
                addPeer($row2, $ind);
                $ind++;
            }
            echo json_encode($allPeers);
        }
    }

    mysqli_free_result($qry);
}
