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

    if (mysqli_connect_errno()) {
        exit('Failed to connect to MySQL: ' . mysqli_connect_error());
    }
    /*$userdata = [
        'nicknameChanged'=>false,
        'oldNickname'=>"",
        'firstNickname' => "asdf",
        'nickname' => "asdfdf",
        'password' => "asdfasdf",
        'description' => "asdfadfaasdf",
        'perferedPeer' => "asdfasdff",
        'isMentee' => false,
    ];
    echo json_encode($userdata);
*/
    
    $sql = "SELECT password,firstNickname,preferedPeer,description,isMentee,age,gender,language FROM bouba_userdata_tbl WHERE nickname = '{$nickname_post}'";
    $qry = mysqli_query($con, $sql);

    while ($row = mysqli_fetch_assoc($qry)) {
    if(password_verify($password_post, $row["password"])){
            // echo json_encode($row['description']);  
            $userdata = [
                'nicknameChanged'=>false,
                'oldNickname'=>"",
                'firstNickname' => $row["firstNickname"],
                'nickname' => $nickname_post,
                'password' => $password_post,
                'description' => $row["description"],
                'perferedPeer' => $row["preferedPeer"],
                'isMentee' => filter_var($row["isMentee"], FILTER_VALIDATE_BOOLEAN),
                'age' => filter_var($row["age"], FILTER_VALIDATE_INT),
                'gender' => $row["gender"],
                'language' => $row["language"],
    
            ];
            echo json_encode($userdata);
    }
    }

    mysqli_free_result($qry);
    
}
