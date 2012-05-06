<?php
	error_reporting(E_ALL);
	$con = mysql_connect("localhost","villem_deltselc", "dP68Tu4oaK4o");
	if (!$con) {
		die('Could not connect: ' . mysql_error());
	}
	mysql_select_db("villem_mobile", $con);

	$query = "SELECT * from commands";

	$result = mysql_query($query);
	$count = -1;
	while ($row = mysql_fetch_array($result)) {
		$count++;
		if ($count == 0) {
			echo $row['command'];
			$delete = "DELETE FROM commands LIMIT 1";
			$deleteres = mysql_query($delete);
			break;
		}
	}
	if ($count == -1) {
	}
?>