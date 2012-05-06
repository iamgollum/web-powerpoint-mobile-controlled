previous = -1;

function checkSession() {
	$.post("sessioncheck.php");
}

function logout(){
	$.get("logout.php");
	window.location = "http://villem.myrpi.org/mobile/";
}

function loadPres()
{
   var list = "";
   $.post("loadPres.php",
    function(data) {     
        list = data.split(",");

        for(var i = 0; i < list.length-1; i++)
        {
          $('#presentations').append("<option id=\"pres"+i+"\">"+list[i]+"</option>");
        }
        //$('#presentations').append("<option id=\"end\">-End of List-</option>");   
    });  
}

function loadSlides(){
  $('#sortable').children().remove();

  var myselect=document.getElementById("presentations");
  var pres = "";
  for (var i=0; i<myselect.options.length; i++){
      if (myselect.options[i].selected==true){
        pres = myselect.options[i].value;
        break;
      }
  }
  //alert(pres);
  var list = "";
  var title = "";
  $.post("loadSlides.php", {pres:pres}, 
    function(data) {
      list = data.split(",");

      for(var i = 0; i < list.length-1; i++)
      { 
        title = list[i];
        //alert("Data Loaded: " + list[i]);
        $('#sortable').append("<li id = \"item"+i+"\" class=\"ui-state-default\" onclick = \"preview("+i+")\">item"+i+" <a class = \"delSlide\" onclick = \"deleteSlide('"+i+"')\"> X </a><span class =\"marked\" > >> </span></li>");
      }
      
  });

}

function updateSlides(){
  alert('Updating presentation...');
  var result = $('#sortable').sortable("toArray");
  var serialize_array = serialize(result);
  
  var myselect=document.getElementById("presentations");
  var pres = "";
  for (var i=0; i<myselect.options.length; i++){
      if (myselect.options[i].selected==true){
        pres = myselect.options[i].value;
        break;
      }
  }

  $.post("updateSlides.php", {pres:pres, array:serialize_array});
}
        
function deleteSlide(id)
{
  //alert(id);
  //var element = document.getElementById(id);
  //element.parentNode.removeChild(element);
  
  $('#sortable').children("#item"+id).slideUp('slow', function(){$(this).remove();
  $('slideVisual').children().remove();});
}

function preview(num)
{
    if(previous > -1)
    {
        $('#sortable').children("#item" + previous).find('span').css('display', 'none');
        $('#sortable').children("#item" + previous).css('border', 'none');         
    }

    $('#sortable').children("#item" + num).find('span').css('display', 'inline');
    $('#sortable').children("#item" + num).css('border', '1px solid red');

    //change slide preview
    $('#slideVisual').children().remove();
    var myselect=document.getElementById("presentations");
    var pres = "";
    for (var i=0; i<myselect.options.length; i++){
      if (myselect.options[i].selected==true){
        PPT = myselect.options[i].value;
        break;
      }
    }
    //PPT = "Google Security";
    
    //Get slide XML Doc
    $.post("../getSlides.php", {slide: num, ppt : PPT},
        function(data) {
        data = "../" + data;
            $.ajax({
            type: "GET",
            url: data,
            dataType: "xml",
            success: parseXml
            });
        });
    
    //scale text    
    var width = $('#slideVisual').css('width');
    $('#slideVisual').css('font-size', parseInt(width) / 50);
    previous = num;
}

function parseXml(xml)
{
  //parse Slide Data
  $('#slideVisual').append("<h1>" + $(xml).find('title').text() + "</h1>");
  $("#slideVisual").append( "<h2>" + $(xml).find('topic').text() + "</h2>");
    var html = '<ul>';
  $(xml).find('item').each(function()
  {
    html += ("<li>" + $(this).text() + "</li>");
  });
  html += '</ul>';
  $('#slideVisual').append(html);
  $('#slideVisual').append("<div id = 'date'>" + $(xml).find('date').text() + "</div>");
}

function startUpload(){
      document.getElementById('f1_upload_process').style.display = 'block';
      document.getElementById('f1_upload_form').style.visibility = 'hidden';
      return true;
}

function stopUpload(success){
      var result = '';
      if (success == 1){
         result = '<span class="msg">The file was uploaded successfully!<\/span><br/><br/>';
      }
      else {
         result = '<span class="emsg">There was an error during file upload!<\/span><br/><br/>';
      }
      document.getElementById('f1_upload_process').style.display = 'none';
      document.getElementById('f1_upload_form').innerHTML = result + '<label>File: <input name="myfile" type="file" size="30" /><\/label><label><input type="submit" name="submitBtn" class="sbtn" value="Upload" /><\/label>';
      document.getElementById('f1_upload_form').style.visibility = 'visible';      
      return true;   
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

function serialize( mixed_value ) {
    var _getType = function( inp ) {
        var type = typeof inp, match;
        var key;
        if (type == 'object' && !inp) {
            return 'null';
        }
        if (type == "object") {
            if (!inp.constructor) {
                return 'object';
            }
            var cons = inp.constructor.toString();
            match = cons.match(/(\w+)\(/);
            if (match) {
                cons = match[1].toLowerCase();
            }
            var types = ["boolean", "number", "string", "array"];
            for (key in types) {
                if (cons == types[key]) {
                    type = types[key];
                    break;
                }
            }
        }
        return type;
    };
    var type = _getType(mixed_value);
    var val, ktype = '';
    
    switch (type) {
        case "function": 
            val = ""; 
            break;
        case "undefined":
            val = "N";
            break;
        case "boolean":
            val = "b:" + (mixed_value ? "1" : "0");
            break;
        case "number":
            val = (Math.round(mixed_value) == mixed_value ? "i" : "d") + ":" + mixed_value;
            break;
        case "string":
            val = "s:" + mixed_value.length + ":\"" + mixed_value + "\"";
            break;
        case "array":
        case "object":
            val = "a";
            var count = 0;
            var vals = "";
            var okey;
            var key;
            for (key in mixed_value) {
                ktype = _getType(mixed_value[key]);
                if (ktype == "function") { 
                    continue; 
                }
                
                okey = (key.match(/^[0-9]+$/) ? parseInt(key, 10) : key);
                vals += serialize(okey) +
                        serialize(mixed_value[key]);
                count++;
            }
            val += ":" + count + ":{" + vals + "}";
            break;
    }
    if (type != "object" && type != "array") {
      val += ";";
  }
    return val;
}


