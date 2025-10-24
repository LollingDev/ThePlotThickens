let stage_number=getCookie("stage");
page_redirect()

function page_redirect(){
    var delay = 8000; // time in milliseconds
    setTimeout(function(){
     window.location = stage_number + ".html";
    },delay);
    
   }