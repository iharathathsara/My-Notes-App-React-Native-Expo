<?php 
require "./connection.php";

$title = $_POST["title"];
$type = $_POST["type"];
$note = $_POST["note"];
$mobile = $_POST["mobile"];

if(empty($title)){
    echo "Please Enter Note Title";
}else if(empty($type)||$type=="null"){
    echo "Please Select Note Type";
}else if(empty($note)){
    echo "Type Your Note";
}else{

    $user_rs=Database::search("SELECT * FROM `user` WHERE `mobile`=?","s",[$mobile]);
    $user_data=$user_rs->fetch_assoc();

    $d = new DateTime();
        $tz = new DateTimeZone("Asia/Colombo");
        $d->setTimezone($tz);
        $date = $d->format("Y-m-d H:i:s");

    Database::iud("INSERT INTO `note` (`title`,`note`,`category_id`,`created_date`,`user_id`) values (?,?,?,?,?)","sssss",[$title,$note,$type,$date,$user_data["id"]]);
    echo "Success";
}

?>