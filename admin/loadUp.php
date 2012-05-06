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
$result = mysql_query("SELECT * FROM presentations WHERE presentation = " + id+ "");
while($row = mysql_fetch_array($result))
{
    if($row['load'] == 'yes')
    {
       echo ($row['numOfSlides'] . "," . $row['presentation']);
       break;
    }
}
mysql_close($con);
?>