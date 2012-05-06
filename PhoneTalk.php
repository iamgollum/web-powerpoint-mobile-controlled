<?php
	error_reporting(E_ALL);
	$con = mysql_connect("localhost", "villem_write", "23]ALn+E,HC~");
	if (!$con) {
		die('Could not connect: ' . mysql_error());
	}
	mysql_select_db("villem_mobile", $con);
		$command = $_POST['command'];
		
	if ($command == 'forward') {
		$query = "INSERT INTO commands (command) VALUE ('forward')";
		$result = mysql_query($query);
	}

	if ($command == 'reverse') {
		$query = "INSERT INTO commands (command) VALUE ('reverse')";
		$result = mysql_query($query);
	}

	if ($command == 'play') {
		$query = "INSERT INTO commands (command) VALUE ('play')";
		$result = mysql_query($query);
	}

	if ($command == 'pause') {
		$query = "INSERT INTO commands (command) VALUE ('pause')";
		$result = mysql_query($query);
	}
	mysql_close($con);
?>
