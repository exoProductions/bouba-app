<?php
require 'accessHeaders.php';

define('DB_HOST', 'avuwaker.mysql.db.hostpoint.ch');
define('DB_USER', 'avuwaker_root');
define('DB_PASS', 'asdf12345gtx-10-80');
define('DB_NAME', 'avuwaker_exoProductions');

function connect()
{
  $connect = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

  if (mysqli_connect_errno($connect)) {
    die("Failed to connect:" . mysqli_connect_error());
  }

  mysqli_set_charset($connect, "utf8");

  return $connect;
}

$con = connect();
