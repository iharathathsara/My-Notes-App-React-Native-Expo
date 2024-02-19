<?php

require "./connection.php";

$noteCategory_rs = Database::search("SELECT * FROM `category`");

$arr = array();

$noteCategory_num = $noteCategory_rs->num_rows;
if ($noteCategory_num > 0) {
    for ($x = 0; $x < $noteCategory_num; $x++) {
        $noteCategory_data = $noteCategory_rs->fetch_assoc();

        $obj = new stdClass();
        $obj->label = $noteCategory_data["name"];
        $obj->value = $noteCategory_data["id"];
        $obj->icon = $noteCategory_data["images_id"];
        array_push($arr, $obj);
    }
}

echo json_encode($arr);
?>