<?php
require "./connection.php";

$id = $_POST["id"];

$user_rs = Database::search("SELECT * FROM `note` WHERE `id`=?", "s", [$id]);
$note_data = $user_rs->fetch_assoc();

$arr = array();
$obj = new stdClass();

$obj->title = $note_data["title"];
$obj->note = $note_data["note"];
$obj->categoryId = $note_data["category_id"];

array_push($arr, $obj);

echo json_encode($arr);


?>