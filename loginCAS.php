<?php
  include_once('CAS/CAS.php');
 // phpCAS::setDebug();
  phpCAS::client(CAS_VERSION_2_0,'login.rpi.edu',443,'/cas');
  phpCAS::setNoCasServerValidation();
  phpCAS::forceAuthentication();
  $user = (string)phpCAS::getUser();
  
  mysql_connect("localhost", "villem_select", "&33rr8#4Ivx#") or die(mysql_error());
  mysql_select_db("villem_mobile") or die(mysql_error());
  
  if (mysqli_connect_errno()) {
    $loginError = 'Could not connect to DB: ' . mysqli_connect_error();
    $_SESSION['loginError'] = $loginError;
    header('Location: index.php');
  } 
  else {
    $loginQuery = 'SELECT user FROM user_ids';
    $success = false;
    $result = mysql_query($loginQuery) or die(mysql_errno().':'.mysql_error());
    while($id = mysql_fetch_array($result)){
      if($user == $id[0]){
        $_SESSION['userid'] = $user;
        header('Location: admin');
        $success = true;
      }
    }
    if($success == false){
      $loginError = 'Invalid Credentials!';
      $_SESSION['loginError'] = $loginError;
      $location = "http://villem.myrpi.org/mobile/";
      phpCAS::logoutWithRedirectService($location);
    }
  }
?>