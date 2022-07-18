<?php
require 'database.php';

$allNews;

function addNews($row, $ind)
{
    global $allNews;

    $news = [

        'title' => $row["title"],
        'subTitle' => $row["subtitle"],
        'imgTitle' => $row["imgTitle"],
        'isLarge' => filter_var($row["isLarge"], FILTER_VALIDATE_BOOLEAN),
        'link' => $row["link"],
    ];
    $allNews[$ind] = $news;
}
//main-----------------------------------------------------------------------------------------------------------
// Get the posted data.
$postdata = file_get_contents("php://input");


if (isset($postdata) && !empty($postdata)) {
    // Extract the data.
    $request = json_decode($postdata);


    // Sanitize.
    $isMentee_post =  filter_var($request->isMentee, FILTER_VALIDATE_BOOLEAN); //boolean

    if (mysqli_connect_errno()) {
        exit('Failed to connect to MySQL: ' . mysqli_connect_error());
    }


    $sql = "SELECT title,subtitle,imgTitle,isLarge,link FROM bouba_news_tbl WHERE isForMentee = '{$nickname_post}'";

    $qry = mysqli_query($con, $sql);

    $ind = 0;
    while ($row2 = mysqli_fetch_assoc($qry)) {
        addNews($row2, $ind);
        $ind++;
    }
    echo json_encode($allNews);

    mysqli_free_result($qry);
}
