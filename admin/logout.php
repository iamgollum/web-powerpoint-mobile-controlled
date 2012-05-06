<?PHP
include_once('/home2/villem/public_html/mobile/CAS/CAS.php');
phpCas::client(SAML_VERSION_1_1, 'login.rpi.edu', 443, 'cas');
phpCas::setNoCasServerValidation();
phpCas::forceAuthentication();
phpCas::logout();
session_destroy();
?>