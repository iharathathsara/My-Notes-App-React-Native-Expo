<?php 
require "./connection.php";

$mobile = $_POST["m"];
$pw = $_POST["p"];

 if(empty($mobile)){
    echo "Please Enter Your Mobile Number";
}else if(!preg_match("/07[0,1,2,4,5,6,7,8][0-9]/",$mobile)){
    echo "Invalid Mobile Number";
}else if(empty($pw)){
    echo "Please Enter Your Password";
}else{

    $user_rs=Database::search("SELECT * FROM `user` WHERE `mobile`=? AND `password`=?","ss",[$mobile,$pw]);

    if($user_rs->num_rows>0){

        echo "Success";
    }else{
        echo "Invalide Mobile or Password";
    }

}

?>