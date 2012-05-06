<?PHP
  error_reporting(E_ALL);
  $con = mysql_connect("localhost","villem_select", "&33rr8#4Ivx#");
  if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
  mysql_select_db("villem_mobile", $con);
  date_default_timezone_set('UTC');
  
  $load = "yes";
  $item = $_POST['pres'];
  //echo($item);
  $result = mysql_query("SELECT * FROM slides WHERE presentation = '$item'");
  while($row = mysql_fetch_array($result))
  {
     echo ($row['title'].",");
  }
  mysql_close($con);
?>
