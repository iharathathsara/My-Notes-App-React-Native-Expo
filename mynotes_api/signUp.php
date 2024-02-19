<?php 
require "./connection.php";

$fname = $_POST["f"];
$lname = $_POST["l"];
$mobile = $_POST["m"];
$pw = $_POST["p"];
$type = $_POST["t"];

if(empty($fname)){
    echo "Please Enter Your First Name";
}else if(empty($lname)){
    echo "Please Enter Your Last Name";
}else if(empty($mobile)){
    echo "Please Enter Your Mobile Number";
}else if(!preg_match("/07[0,1,2,4,5,6,7,8][0-9]/",$mobile)){
    echo "Invalid Mobile Number";
}else if(empty($pw)){
    echo "Please Enter Your Password";
}else if(empty($type)||$type=="null"){
    echo "Please Select Your Position";
}else{
    $user_rs=Database::search("SELECT * FROM `user` WHERE `mobile`=?","s",[$mobile]);
    if($user_rs->num_rows>0){
        echo "User Already Registed";
    }else{

        Database::iud("INSERT INTO `user` (`fname`,`lname`, `mobile`,`password`,`type_id`) VALUES (?,?,?,?,?)","sssss",[$fname,$lname,$mobile,$pw,$type]);
        
        echo "Success";
    }
}

?>