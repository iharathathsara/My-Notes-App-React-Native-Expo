<?php 
require "./connection.php";

$id = $_POST["id"];
$title = $_POST["title"];
$type = $_POST["type"];
$note = $_POST["note"];

if(empty($title)){
    echo "Please Enter Note Title";
}else if(empty($type)||$type=="null"){
    echo "Please Select Note Type";
}else if(empty($note)){
    echo "Type Your Note";
}else{

    $d = new DateTime();
        $tz = new DateTimeZone("Asia/Colombo");
        $d->setTimezone($tz);
        $date = $d->format("Y-m-d H:i:s");

    Database::iud("UPDATE `note` SET  `title`=?,`note`=?,`category_id`=? WHERE id=?","ssss",[$title,$note,$type,$id]);
    echo "Success";
}

?>