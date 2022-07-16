<?php
require 'database.php';

//main-----------------------------------------------------------------------------------------------------------
// Get the posted data.
$postdata = file_get_contents("php://input");


if (isset($postdata) && !empty($postdata)) {
    // Extract the data.
    $request = json_decode($postdata);


    // Sanitize.
    $nicknameChanged_post = filter_var($request->nicknameChanged, FILTER_VALIDATE_BOOLEAN); //boolean
    $oldNickname_post = mysqli_real_escape_string($con, trim($request->oldNickname));
    $nickname_post = mysqli_real_escape_string($con, trim($request->nickname));
    $password_post = mysqli_real_escape_string($con, trim($request->password));
    $description_post = mysqli_real_escape_string($con, trim($request->description));
    $age_post = mysqli_real_escape_string($con, filter_var($request->age, FILTER_VALIDATE_INT));
    $gender_post = mysqli_real_escape_string($con, trim($request->gender));
    $language_post = mysqli_real_escape_string($con, trim($request->language));
    $isMentee_post = filter_var($request->isMentee, FILTER_VALIDATE_BOOLEAN); //boolean

    if (mysqli_connect_errno()) {
        // If there is an error with the connection, stop the script and display the error.
        exit('Failed to connect to MySQL: ' . mysqli_connect_error());
    }
    
    if ($nicknameChanged_post) {
        $sql = "SELECT nickname FROM bouba_userdata_tbl WHERE nickname='{$nickname_post}'";
        $result = $con->query($sql);

        if ($result->num_rows > 0) {
            echo json_encode(false);
        } else {

            $hashed_password = password_hash($password_post, PASSWORD_DEFAULT);

            $sql = "UPDATE bouba_userdata_tbl SET nickname='{$nickname_post}',password='{$hashed_password}',preferedPeer='1',description='{$description_post}',isMentee='{$isMentee_post}', age={$age_post},gender='{$gender_post}',language='{$language_post}' WHERE nickname='{$oldNickname_post}'";

            if ($con->query($sql) === TRUE) {
                echo json_encode(true);
            }
        }
    } else {
        $hashed_password = password_hash($password_post, PASSWORD_DEFAULT);

        $sql = "UPDATE bouba_userdata_tbl SET password='{$hashed_password}',preferedPeer='1',description='{$description_post}',isMentee='{$isMentee_post}',age={$age_post},gender='{$gender_post}',language='{$language_post}' WHERE nickname='{$nickname_post}'";

        if ($con->query($sql) === TRUE) {
            echo json_encode(true);
        }
    }
    
}
