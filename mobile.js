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
        $('ul#slides').append("<li id ='start' title =" + parseInt(slideNum) + " onclick = 'tabClick(1)'> Slide " + parseInt(slideNum) + "</li>");
        if(SLIDE_LIMIT > 9)
            limit = 9;
        else  
            limit = SLIDE_LIMIT;    
            
        for(i = 2; i < limit; i++)
        {
        $('ul#slides').append("<li class = 'shadow' title = " + i + " onclick = 'tabClick(" + i +")'> Slide " + i + "</li>");
        }
        $('ul#slides').append("<li id ='end' class = 'shadow' title =" + i + " onclick = 'tabClick("+ i +")'> Slide " + i +"</li>");
        $('ul#slides li:first-child').css({'backgroundColor' : '#949494', 'height' : '35px'}); 
        $('a#right').css({"display" : "inline"});
       //output object
       $.post("getSlides.php", {ppt : PPT},       
        function(data) {
            $.ajax({
            type: "GET",
            url: data,
            dataType: "xml",
            success: parseXml
            });
        });           
    });  
}
function goToAdminPage()
{
    document.location = "loginCAS.php";
}

function getCommand()
{
       $.post("getCommands.php",
        function(data) {
           if(data == "forward"){
			forward();
		   }
		   if(data == "reverse"){
		   reverse();
		   }
		   if(data == "play"){
		   play();
		   }
		   if(data == "pause"){
		   pause();
		   }
		   if (data == "fail") {
			alert('Failed.');
		   }
        });
}

function jumpToSlide(){
  $('#submit').css("background-image", "url('images/jump_onclick.png')");
   var request = $('#textField').val();
   var lower = 0; var upper = 0; var check = 0;
   for(i = 1; i <= SLIDE_LIMIT; i = i + 9){
        check = i + 8;
        if(check > SLIDE_LIMIT){
            check = SLIDE_LIMIT;
        }
        if(request <= check && request >= i)
        {
            lower = i;
            if(i + 8 > SLIDE_LIMIT) { 
            upper = SLIDE_LIMIT; 
            }
            else
                upper = i + 8;
        }
   }
   if(lower == 0){
   $('#textField').attr('value', 'N/A');
        return;
   }
   //check if slide is in current list on screen
   liList = $('ul#slides').children();
   if((liList.length + parseInt(liList.eq(0).attr('title')) - 1) >=  request && request >= parseInt(liList.eq(0).attr('title')))
   {
      liList.eq(parseInt(currentTab) - 1).css({'backgroundColor' : '#7A7A7A', 'height' : '30px'});
      liList.eq(parseInt(currentTab) - 1).addClass("shadow"); 
      currentTab = Math.abs(lower - request) + 1;
      slideNum = request;  
      //output object
      $.post("getSlides.php", {slide: slideNum, ppt : PPT},
      function(data) {         
            $('div#xml').remove();           
            $.ajax({
            type: "GET",
            url: data,
            dataType: "xml",
            success: parseXml
            });
            $('div#slide').hide();                
            $('div#slide').fadeIn();
            liList.eq(currentTab - 1).css({'backgroundColor' : '#949494', 'height' : '35px'});
            liList.eq(currentTab - 1).removeClass("shadow");   
        });      
   }
   else
   {   
       $('a#left').css({"display" : "none"});
       $('a#right').css({"display" : "none"});
       if(lower - 1 > 0) {$('a#left').css({"display" : "inline"}); }
       $('ul#slides li').remove();
       $('ul#slides').append("<li id ='start' title =" + lower + " onclick = 'tabClick(" + lower +")'> Slide " + lower + "</li>");
       $('ul#slides li').addClass("shadow");
       $('ul#slides li').css({'height' : '30px'});
       for(i = (lower + 1); i < upper; i++){
           $('ul#slides').append("<li class = 'shadow' title = " + i + " onclick = 'tabClick(" + i +")'> Slide " + i + "</li>");
       }
       $('ul#slides').append("<li id ='end' class = 'shadow' title =" + i + " onclick = 'tabClick(" + i +")'> Slide " + i + "</li>");
       if(upper < SLIDE_LIMIT) { $('a#right').css({"display" : "inline"}); } 
       
       currentTab = Math.abs(lower - request) + 1;
       slideNum = request;  
       //output object
       $.post("getSlides.php", {slide: slideNum, ppt : PPT},
       function(data) {         
        if($('div#slide').length > 0)  { $('div#xml').remove(); }            
            $.ajax({
            type: "GET",
            url: data,
            dataType: "xml",
            success: parseXml
            });
            $('div#slide').hide();                
            $('div#slide').fadeIn();
            liList = $('ul#slides').children();
            liList.eq(currentTab - 1).css({'backgroundColor' : '#949494', 'height' : '35px'});
            liList.eq(currentTab - 1).removeClass("shadow");  
        });       
   }
   
}

function tabClick(tab)
{
    liList = $('ul#slides').children();
    lower = $('ul#slides li:first-child').attr('title');
    liList.eq(parseInt(currentTab) - 1).css({'backgroundColor' : '#7A7A7A', 'height' : '30px'});
    liList.eq(parseInt(currentTab) - 1).addClass("shadow"); 
    currentTab = Math.abs(lower - tab) + 1;
    slideNum = tab;   
    //output object
    $.post("getSlides.php", {slide: slideNum, ppt : PPT},
    function(data) {         
      if($('div#slide').length > 0)  { $('div#xml').remove(); }            
            $.ajax({
            type: "GET",
            url: data,
            dataType: "xml",
            success: parseXml
            });
        $('div#slide').hide();                
        $('div#slide').fadeIn();
        liList.eq(currentTab - 1).css({'backgroundColor' : '#949494', 'height' : '35px'});
        liList.eq(currentTab - 1).removeClass("shadow");   
    });     
}
function play()
{ 
    intervalID = setInterval(forward, 2000);
}
function pause()
{
    clearInterval(intervalID);
}
function forward()
{
    if(slideNum == SLIDE_LIMIT)
        clearInterval(intervalID);
        
    liList = $('ul#slides').children();
    var upperSlide = $('ul#slides li:last-child').attr('title');
    if(slideNum == parseInt(upperSlide))
    {
        right();
        //alert(slideNum);
        currentTab = 1;
    }        
    else if(slideNum >= 1 && slideNum < parseInt(upperSlide))
    {
       var child = document.getElementById("slides").children;
       var node = parseInt(currentTab) - 1;
       child.item(node).className = "shadow"; 
       liList.eq(parseInt(currentTab) - 1).css({'backgroundColor' : '#7A7A7A', 'height' : '30px'});
       currentTab++;
       slideNum++;
    
   //output object
   $.post("getSlides.php", {slide: slideNum, ppt : PPT},
    function(data) {         
        if($('div#slide').length > 0)  { $('div#xml').remove(); }            
            $.ajax({
            type: "GET",
            url: data,
            dataType: "xml",
            success: parseXml
            });
            $('div#slide').hide();                
            $('div#slide').fadeIn();
            liList.eq(parseInt(currentTab) - 1).css({'backgroundColor' : '#949494', 'height' : '35px'});
            liList.eq(parseInt(currentTab) - 1).removeClass("shadow");
    }); 
    }   
}

function reverse()
{
    liList = $('ul#slides').children();
    var lowerSlide = $('ul#slides li:first-child').attr('title');        
    if(slideNum == parseInt(lowerSlide))
    {
        //alert(slideNum);
        left();
       // alert(slideNum);
    }            
    else if(slideNum >= 1 && slideNum > parseInt(lowerSlide))
    {
       var child = document.getElementById("slides").children;
       var node = parseInt(currentTab) - 1;
       child.item(node).className = "shadow"; 
       liList.eq(parseInt(currentTab) - 1).css({'backgroundColor' : '#7A7A7A', 'height' : '30px'});
       currentTab--;
       slideNum--;
    
   //output object
   $.post("getSlides.php", {slide: slideNum, ppt : PPT},
    function(data) {         
        if($('div#slide').length > 0)  { $('div#xml').remove(); }            
            $.ajax({
            type: "GET",
            url: data,
            dataType: "xml",
            success: parseXml
            });
            $('div#slide').hide();                
            $('div#slide').fadeIn();
            liList.eq(parseInt(currentTab) - 1).css({'backgroundColor' : '#949494', 'height' : '35px'});
            liList.eq(parseInt(currentTab) - 1).removeClass("shadow");    
    });  
    }
}

function right()
{
var upperSlide = $('ul#slides li:last-child').attr('title');
$.post("getSlides.php", {scroll: "right", lBound: upperSlide, ppt : PPT},
   function(data) {
        if(data == 0)
        {
            currentTab = $('ul#slides').children().length;
        }
        else if(data == 1)
        {
            data = Math.abs(data + upperSlide);
            $('ul#slides').append("<li id ='start' title =" + data + " onclick = 'tabClick(" + data +")'> Slide " + data + "</li>");
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
            $('ul#slides').append("<li id ='start' title =" + (parseInt(upperSlide) + 1) + " onclick = 'tabClick("+ (parseInt(upperSlide) + 1)  +")'> Slide " + (parseInt(upperSlide)+ 1) + "</li>");
            currentTab = 1;
            slideNum = parseInt(upperSlide) + 1;
            for(i = 2 + parseInt(upperSlide); i < limit; i++)
            {
            $('ul#slides').append("<li class = 'shadow' title = " + i + " onclick = 'tabClick("+ i +")'> Slide " + i + "</li>");
            }
            
            $('ul#slides').append("<li id ='end' class = 'shadow' title =" + i + " onclick = 'tabClick("+ i +")'> Slide " + i + "</li>");           
            $('ul#slides li:first-child').css({'backgroundColor' : '#949494', 'height' : '35px'});
            if(i == SLIDE_LIMIT){
            $('a#right').css({"display" : "none"});
            }
            else
                $('a#right').css({"display" : "inline"});            
            liList = $('ul#slides').children();           
        }
       //output object
       $.post("getSlides.php", {slide: slideNum, ppt : PPT},
        function(data) {         
        if($('div#slide').length > 0)  { $('div#xml').remove(); }            
            $.ajax({
            type: "GET",
            url: data,
            dataType: "xml",
            success: parseXml
            });
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
        currentTab = 1;
        slideNum = parseInt(lowerSlide) - parseInt(data);
        }
        else if(data == 1)
        {
        data = Math.abs(data - parseInt(lowerSlide));
        $('ul#slides').append("<li id ='start' title =" + data + " onclick = 'tabClick(" + data +")'> Slide " + data + "</li>");
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
            $('ul#slides').append("<li id ='start' title =" + (parseInt(slideNum)) + " onclick = 'tabClick(" + parseInt(slideNum) +")'> Slide " + (parseInt(slideNum)) + "</li>");
            currentTab = 9;
            for(i = start; i < data; i++)
            {
            $('ul#slides').append("<li class = 'shadow' title = " + i + " onclick = 'tabClick(" + i +")'> Slide " + i + "</li>");
            }
            
            $('ul#slides').append("<li id ='end' title =" + i + " onclick = 'tabClick(" + i +")'> Slide " + i + "</li>");
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
        if($('div#slide').length > 0)  { $('div#xml').remove(); }            
            $.ajax({
            type: "GET",
            url: data,
            dataType: "xml",
            success: parseXml
            });
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
     $('body').css('font-size', '16px');
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
    $('body').css('font-size', $(window).width() / 70);
    
  }
}

function parseXml(xml)
{
  //parse Slide Data
  $('div#slide').append("<div id='xml'>");
  $('div#xml').append("<h1>" + $(xml).find('title').text() + "</h1>");
  $("div#xml").append( "<h2>" + $(xml).find('topic').text() + "</h2>");
  var html = '<ul>';
  $(xml).find('item').each(function()
  {
    html += ("<li>" + $(this).text() + "</li>");
  });
  html += '</ul>';
  $('div#xml').append(html);
  $('div#xml').append("<div id = 'date'>" + $(xml).find('date').text() + "</div>");
  $('div#slide').append("</div>");
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