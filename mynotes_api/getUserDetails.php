<?php

require "./connection.php";

$mobile = $_POST["mobile"];
$user_rs = Database::search("SELECT * FROM `user` WHERE `mobile`=?", "s", [$mobile]);
$user_data = $user_rs->fetch_assoc();

$type_rs=Database::search("SELECT * FROM `type` WHERE `id`=?","s",[$user_data["type_id"]]);
$type_data=$type_rs->fetch_assoc();

$img_rs=Database::search("SELECT * FROM `images` WHERE `id`=?","s",[$type_data["images_id"]]);
$img_data=$img_rs->fetch_assoc();

$name = $user_data["fname"]." ".$user_data["lname"];
$imgpath="images/".$img_data["path"];

$arr = array();

$obj = new stdClass();
$obj->name = $name;
$obj->type = $type_data["name"];
$obj->img = $imgpath;
array_push($arr, $obj);

echo json_encode($arr);

// echo "ok";


?>