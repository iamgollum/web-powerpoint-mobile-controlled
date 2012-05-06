var SLIDE_LIMIT = 0;
var currentTab = 1;
var slideNum = 1;
var liList = "";
var PPT = "";
var intervalID;

function loadPresentation()
{
   var list = "";
   var limit = 0;
   $('a#left').css({"display" : "none"});
   $('a#right').css({"display" : "none"});
   $.post("loadUp.php",
    function(data) {     
        list = data.split(",");
        SLIDE_LIMIT = parseInt(list[0]);
        PPT = list[1];
        $('ul#slides').append("<li id ='start' title =" + parseInt(slideNum) + "> Slide " + parseInt(slideNum) + "</li>");
        if(SLIDE_LIMIT > 9)
            limit = 9;
        else  
            limit = SLIDE_LIMIT;    
            
        //alert(limit); 
        for(i = 2; i < limit; i++)
        {
        $('ul#slides').append("<li class = 'shadow' title = " + i + "> Slide " + i + "</li>");
        }
        $('ul#slides').append("<li id ='end' class = 'shadow' title =" + i + "> Slide " + i + "</li>");
        $('ul#slides li:first-child').css({'backgroundColor' : '#949494', 'height' : '35px'}); 
        $('a#right').css({"display" : "inline"});
       //output object
       $.post("getSlides.php", {ppt : PPT},
        function(data) {   
            //alert(data);    
            $('div#slide').append("<object type='text/html' id = 'obj' data="+ data + ">" + 
                                 "<p> backup content </p></object>");
        });           
    });  
}
function goToAdminPage()
{
    document.location = "admin/";
}

function jumpToSlide(){
}

function play()
{ 
    intervalID = setInterval(forward, 5000 );
}
function pause()
{
    clearInterval(intervalID);
}
function forward()
{
    liList = $('ul#slides').children();
    var upperSlide = $('ul#slides li:last-child').attr('title');
    if(slideNum == parseInt(upperSlide))
    {
        right();
        currentTab = slideNum;
    }        
    else if(slideNum >= 1 && slideNum < parseInt(upperSlide))
    {
       var child = document.getElementById("slides").children;
       var node = parseInt(currentTab) - 1;
       child.item(node).className = "shadow"; 
       liList.eq(parseInt(currentTab) - 1).css({'backgroundColor' : '#7A7A7A', 'height' : '30px'});
       currentTab++;
       slideNum++;
       liList.eq(parseInt(currentTab) - 1).css({'backgroundColor' : '#949494', 'height' : '35px'});
       liList.eq(parseInt(currentTab) - 1).removeClass("shadow");
    }
   //output object
   $.post("getSlides.php", {slide: slideNum, ppt : PPT},
    function(data) {         
        if($('div#slide').length > 0)  { $('div#slide object').remove(); }            
            $('div#slide').append("<object type='text/html' id = 'obj' data="+ data + ">" + 
                             "<p> backup content </p></object>");
            $('div#slide').hide();                
            $('div#slide').fadeIn();
    });    
}

function reverse()
{
    liList = $('ul#slides').children();
    //alert(liList.length);
    var lowerSlide = $('ul#slides li:first-child').attr('title');        
    if(slideNum == parseInt(lowerSlide))
    {
        left();
    }            
    else if(slideNum >= 1 && slideNum > parseInt(lowerSlide))
    {
       var child = document.getElementById("slides").children;
       var node = parseInt(currentTab) - 1;
       child.item(node).className = "shadow"; 
       liList.eq(parseInt(currentTab) - 1).css({'backgroundColor' : '#7A7A7A', 'height' : '30px'});
       currentTab--;
       slideNum--;
       liList.eq(parseInt(currentTab) - 1).css({'backgroundColor' : '#949494', 'height' : '35px'});
       liList.eq(parseInt(currentTab) - 1).removeClass("shadow");
    }
   //output object
   $.post("getSlides.php", {slide: slideNum, ppt : PPT},
    function(data) {         
        if($('div#slide').length > 0)  { $('div#slide object').remove(); }            
            $('div#slide').append("<object type='text/html' id = 'obj' data="+ data + ">" + 
                             "<p> backup content </p></object>");
            $('div#slide').hide();                
            $('div#slide').fadeIn();
    });  
}

function right()
{
var upperSlide = $('ul#slides li:last-child').attr('title');
$.post("getSlides.php", {scroll: "right", lBound: upperSlide, ppt : PPT},
   function(data) {
        if(data == 0)
        {
            //alert("REACHED END OF PRESENTATION!");
            currentTab = $('ul#slides').children().length;
        }
        else if(data == 1)
        {
        data = Math.abs(data + upperSlide);
        $('ul#slides').append("<li id ='start' title =" + data + "> Slide " + data + "</li>");
        }
        else
        {
            $('ul#slides li').remove();
            if(data > 9)
                data = 9;
            var limit =  parseInt(data) + parseInt(upperSlide);
            //Check if last slide will be displayed
            if((data + upperSlide) == SLIDE_LIMIT)
            {
                limit = 9;
            }
            if((parseInt(upperSlide) + 1) == 1){
            $('a#left').css({"display" : "none"});
            }
            else
                $('a#left').css({"display" : "inline"});
            $('ul#slides').append("<li id ='start' title =" + (parseInt(upperSlide) + 1) + "> Slide " + (parseInt(upperSlide)+ 1) + "</li>");
            currentTab = 1;
            slideNum = parseInt(upperSlide) + 1;
            for(i = 2 + parseInt(upperSlide); i < limit; i++)
            {
            $('ul#slides').append("<li class = 'shadow' title = " + i + "> Slide " + i + "</li>");
            }
            
            $('ul#slides').append("<li id ='end' class = 'shadow' title =" + i + "> Slide " + i + "</li>");           
            $('ul#slides li:first-child').css({'backgroundColor' : '#949494', 'height' : '35px'});
            if(i == SLIDE_LIMIT){
            $('a#right').css({"display" : "none"});
            }
            else
                $('a#right').css({"display" : "inline"});            
            liList = $('ul#slides').children();
            //alert("Children: " + liList.length);            
        }
       //output object
       $.post("getSlides.php", {slide: slideNum, ppt : PPT},
    function(data) {         
        if($('div#slide').length > 0)  { $('div#slide object').remove(); }            
            $('div#slide').append("<object type='text/html' id = 'obj' data="+ data + ">" + 
                             "<p> backup content </p></object>");
            $('div#slide').hide();                
            $('div#slide').fadeIn();
    });         
   });
}

function left()
{
var lowerSlide = $('ul#slides li:first-child').attr('title');
$.post("getSlides.php", {scroll: "left", uBound: lowerSlide, ppt : PPT},
   function(data) {
        if(data == 0)
        {
        //alert("At Begining Already!");
        currentTab = 1;
        slideNum = parseInt(lowerSlide) - parseInt(data);
        }
        else if(data == 1)
        {
        data = Math.abs(data - parseInt(lowerSlide));
        $('ul#slides').append("<li id ='start' title =" + data + "> Slide " + data + "</li>");
        }
        else
        {
            $('ul#slides li').remove();
            if(data > 9)
                data = 9;   
            slideNum =  parseInt(lowerSlide) - parseInt(data);
            var limit = parseInt(lowerSlide) - 1;
            var start = 1 + parseInt(slideNum);
            if(slideNum == 1){
            $('a#left').css({"display" : "none"});
            }
            else
                $('a#left').css({"display" : "inline"});
            $('ul#slides').append("<li id ='start' title =" + (parseInt(slideNum)) + "> Slide " + (parseInt(slideNum)) + "</li>");
            currentTab = 9;
            for(i = start; i < data; i++)
            {
            $('ul#slides').append("<li class = 'shadow' title = " + i + "> Slide " + i + "</li>");
            }
            
            $('ul#slides').append("<li id ='end' title =" + i + "> Slide " + i + "</li>");
            if(i == SLIDE_LIMIT){
            $('a#right').css({"display" : "none"});
            }
            else
                $('a#right').css({"display" : "inline"});                 
            $('ul#slides li:last-child').css({'backgroundColor' : '#949494', 'height' : '35px'});
            $('ul#slides li:first-child').css({'height' : '30px'});
            $('ul#slides li:first-child').addClass("shadow");
            liList = $('ul#slides').children();
            slideNum = parseInt(lowerSlide) - 1;
        }
       //output object
       $.post("getSlides.php", {slide: slideNum, ppt : PPT},
    function(data) {         
        if($('div#slide').length > 0)  { $('div#slide object').remove(); }            
            $('div#slide').append("<object type='text/html' id = 'obj' data="+ data + ">" + 
                             "<p> backup content </p></object>");
            $('div#slide').hide();                
            $('div#slide').fadeIn();
    });                 
   });
}

function setVisibility(id) 
{
  if(document.getElementById(id).style.display == "none"){
    document.getElementById(id).style.display = "block";  
    $("#footer").css('display', 'block');
    $("#footer").css('display', 'block');
    $("#wrapper").css('height', "760px");
    $("#wrapper").css('width', "1024px");
    $("#content").css('height', "465px");
    $("#content").css('width', "1020px");
    $("#fullScreen").attr('value', 'Presentation Mode');
  }
  else
  { 
    document.getElementById(id).style.display = "none";
    $("#footer").css('display', 'none');
    $("#wrapper").css('height', $(window).height() + "px");
    $("#wrapper").css('width', "100%");
    $("#content").css('height', $(window).height() + "px");
    $("#content").css('width', "100%");
    $("#fullScreen").attr('value', 'Web Site Mode');
    
  }
}
    
function updateClock()
{
  var currentTime = new Date();

  var currentHours = currentTime.getHours();
  var currentMinutes = currentTime.getMinutes();
  var currentSeconds = currentTime.getSeconds();

  // Pad the minutes and seconds with leading zeros, if required
  currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
  currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

  // Choose either "AM" or "PM" as appropriate
  var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

  // Convert the hours component to 12-hour format if needed
  currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

  // Convert an hours component of "0" to "12"
  currentHours = ( currentHours == 0 ) ? 12 : currentHours;

  // Compose the string for display
  var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;

  // Update the time display
  document.getElementById("clock").firstChild.nodeValue = currentTimeString;
}