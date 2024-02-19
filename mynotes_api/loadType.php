<?php 

require "./connection.php";

$userType_rs = Database::search("SELECT * FROM `type`");

$arr = array();

$userType_num=$userType_rs->num_rows;
if($userType_num>0){
    for($x=0;$x<$userType_num;$x++){
        $userType_data=$userType_rs->fetch_assoc();
        $obj = new stdClass();
        $obj->label = $userType_data["name"];
        $obj->value = $userType_data["id"];
        array_push($arr,$obj);
    }
}
echo json_encode($arr);
?>