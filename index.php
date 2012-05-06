 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html lang="EN" dir="ltr" xmlns="http://www.w3.org/1999/xhtml">
<head>
<script type = "text/javascript" src = "jquery/jquery1.4.2.js"></script> 
<script type = "text/javascript" src = "jquery/jquery-impromptu.3.1.min.js"></script>
<script type = "text/javascript" src = "mobile.js"></script> 
<link type = "text/css" rel='stylesheet' href = "mobile.css" />
<link type = "text/css" rel='stylesheet' href = "slides/css/slideTemplate.css" />
<SCRIPT language="JavaScript">
//Preload Images
if (document.images) 
{
  preload_image_object = new Image();
  image_url = new Array();
  image_url[0] = "images/jump_hover.png";
  image_url[1] = "images/jump_onclick.png";

   var i = 0;
   for(i=0; i<=1; i++) 
     preload_image_object.src = image_url[i];
}
function checkCommands () {
	setInterval(getCommand, 800 ); 
}
//check for tabs cycle
//document.onkeyup = KeyCheck; 
</SCRIPT>     
  
<title>Mobile Visualization</title>
</head>
 
<body onload="updateClock(); setInterval('updateClock()', 1000 ); loadPresentation(); checkCommands();">
<!-- <audio src="audio/intro.ogg" autoplay=true></audio> -->
<div id = "wrapper">
  <div id = "top">
    <div id= "header">
        <img id = "logo" src="images/logo.png" alt="Mobile Viusalization 1.0" width="563" height="77" />
        <span id = "rightHead"> 
        
            <div id = "nav" >
                <ul>
                  <li><a id = "home" href = "index.php" > Home </a></li>
                  <li><a id = "login" onClick = "goToAdminPage()" > Admin Login</a></li>
                </ul>    
            </div>
              
            <div id = "search">  
                <img id = "bgnSearch" src="images/search_beg.png" width="27" height="25" />            
                <input id = "textField" type="text"  name = "pptfilter" value = "" />
                <input id = "submit" onClick = "jumpToSlide();" type = "button"/>   
            </div>
        </span>
    </div>
    <div id = "tabs">
        <a id = "left" onClick = "left()" > <<< </a>
        <ul id = "slides">
        <!-- DYNAMIC SLIDE CONTENT -->        
        </ul> 
        <a id = "right" onClick = "right()" > >>> </a>
    </div>
  </div>
    <div id = "content">
        <div id = "slide">
        </div>      
    </div> 
    <div id = "toggler">
        <input class = "operation" id = "fullScreen" type="button" name="type" value="Full Screen Mode" onclick="setVisibility('top');">   
    </div>    
	<!--
    <div id = "controlPanel">    
        <input class = "operation" type="button" name="type" value="Forward" onclick="forward();">  
        <input class = "operation" type="button" name="type" value="Reverse" onclick="reverse();">  
        <input class = "operation" type="button" name="type" value="Play" onclick="play();">   
        <input class = "operation" type="button" name="type" value="Pause" onclick="pause();">   
    </div>            
	-->
        <div id = "footer">     
            <span id="copyright">Copyright &copy; 2011 WebSys - All Rights Reserved </span>
            <span id="clock">&nbsp;</span> 
        </div>   
    </div>
</body>
</html>