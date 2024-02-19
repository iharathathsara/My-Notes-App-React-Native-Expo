<?php

require "./connection.php";

$mobile = $_POST["mobile"];
// if (isset($mobile)) {
$user_rs = Database::search("SELECT * FROM `user` WHERE `mobile`=?", "s", [$mobile]);
$user_data = $user_rs->fetch_assoc();

$notes_rs = Database::search("SELECT * FROM `note` WHERE `user_id`=?", "s", [$user_data["id"]]);

$notes_num = $notes_rs->num_rows;
$arr = array();
if ($notes_num > 0) {
    for ($x = 0; $x < $notes_num; $x++) {
        $notes_data = $notes_rs->fetch_assoc();
        $img_rs = Database::search("SELECT * FROM `images` WHERE `id`=?", "s", [$notes_data["category_id"]]);
        $img_data = $img_rs->fetch_assoc();

        $img="images/".$img_data["path"];

        $obj = new stdClass();
        $obj->id = $notes_data["id"];
        $obj->title = $notes_data["title"];
        $obj->note = $notes_data["note"];
        $obj->img = $img;
        $obj->datetime = $notes_data["created_date"];
        array_push($arr, $obj);
    }
}
echo json_encode($arr);

// }


?>