<?PHP
error_reporting(E_ALL);
$con = mysql_connect("localhost","villem_select","&33rr8#4Ivx#");
if (!$con)
{
die('Could not connect: ' . mysql_error());
}
mysql_select_db("villem_mobile", $con);
date_default_timezone_set('UTC');
if(isset($_POST['scroll']) && isset($_POST['uBound']) || isset($_POST['scroll']) && isset($_POST['lBound']) )
{
    if($_POST['scroll'] == "right")
    {
        scrollRight();
    }
    if($_POST['scroll'] == "left")
    {
        scrollLeft();
    }
} 
if(isset($_POST['ppt']) && !isset($_POST['slide']) && !isset($_POST['scroll']))
{
    $ppt = $_POST['ppt'];
    $result = mysql_query("SELECT * FROM slides WHERE presentation = '$ppt'");
    while($row = mysql_fetch_array($result))
    {
        if($row['slideNum'] == 1)
        {
            echo $row['location'];
            break;
        }
    }
}
if(isset($_POST['slide']) && $_POST['slide'] > 0)
{
    $ppt = $_POST['ppt'];
    $num= $_POST['slide'];
    $result = mysql_query("SELECT * FROM slides WHERE slideNum = $num AND presentation = '$ppt'");
    $row = mysql_fetch_array($result);
    echo $row['location'];    
}

function scrollRight()
{
    $ppt = $_POST['ppt'];
    $lBound = $_POST['lBound'];
    $result = mysql_query("SELECT * FROM slides WHERE slideNum > $lBound AND presentation = '$ppt'"); 
    echo(mysql_num_rows($result));
}
function scrollLeft()
{
    $ppt = $_POST['ppt'];
    $uBound = $_POST['uBound'];
    $result = mysql_query("SELECT * FROM slides WHERE slideNum < $uBound AND presentation = '$ppt'"); 
    echo(mysql_num_rows($result));
}

mysql_close($con);
?>