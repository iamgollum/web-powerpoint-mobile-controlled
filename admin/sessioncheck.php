<?PHP
session_start();
if(!isset($_SESSION['userid'])) { //no user loged in
 header('Location: /home2/villem/public_html/mobile/index.php');
}
?>