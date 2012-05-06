<?PHP
  error_reporting(E_ALL);
  $con = mysql_connect("localhost","villem_delwriup", "~.&1-fd9p}CT");
  if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
  mysql_select_db("villem_mobile", $con);
  date_default_timezone_set('UTC');
  
  $load = "yes";
  $item = unserialize($_POST['array']);
  $pres = $_POST['pres'];
  $k = 0;
  mysql_query("DELETE FROM slides WHERE presentation = '$pres'");
  $location = "slides" . DIRECTORY_SEPARATOR . $i . ".html";
  foreach($item as $i){
    mysql_query("INSERT INTO slides (slideNum, title, location, presentation) VALUES ('$k', '$i','$location','$pres')");
    $k++;
  }
  mysql_query("update presentations set numOfSlides='$k' where presentation = '$pres'");
  /*echo($item);
  
  
  while($row = mysql_fetch_array($result))
  {
     echo ($row['title'].",");
  }*/
  mysql_close($con);
?>
