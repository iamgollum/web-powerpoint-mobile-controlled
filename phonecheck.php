<?php
error_reporting(E_ALL);
	$con = mysql_connect("localhost","villem_select", "&33rr8#4Ivx#");
	if (!$con) {
		die('Could not connect: ' . mysql_error());
	}
	mysql_select_db("villem_mobile", $con);
	
	$query = "SELECT phone_code from user_ids";
	
	$result = mysql_query($query);
	$code = $_POST['code'];
	
	while($row = mysql_fetch_array($result)) {
    if($row['phone_code'] == $code) {
		echo 'true';
    }
	else {
		echo 'false';
	}
	mysql_close($con);
}

?>