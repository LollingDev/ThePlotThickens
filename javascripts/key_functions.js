"use strict"


//hover noises when mouse over the button
let hover_button = document.getElementById('options')
document.getElementById('hover_noise')
let	audios = document.querySelectorAll('audio');

  hover_button.addEventListener('mouseover', function() {
    [].forEach.call(audios, function(audio) {
      audio.play();
    });
    }, false);
    
    hover_button.addEventListener('mouseleave', function() {
      audio.pause();
      audio.currentTime = 0;
    }, false);


//when a button is clicked, check where it goes
//or is it just another option
let option_number=0;
const onClick = (event) => {
  option_number=event.target.id;
  if (option_number=="Stage2")
  {
    document.location.href = 'revelation.html';
    setCookie("option",current_option.description,1);
    setCookie("stage","chapter2",1);
  }
  else if (option_number=="Stage3")
  {
    document.location.href = 'interrogation.html';
    setCookie("option",current_option.description,1);
    setCookie("stage","chapter3",1);
  }
  else if(option_number=="Pleading")
  {
    document.location.href = 'pleading.html';
    setCookie("option",current_option.description,1);
  }
  else if (event.target.class=='option')
  {
    select_option(option_number)
  }
}


window.addEventListener('click', onClick);

function clear_page()
{
  document.getElementById('text').innerHTML = "";
  document.getElementById('options').innerHTML = "";
}

//load in text using typewriter effect
function add_text(myList)
{
  update_variables();
  for(let elem in myList)
  {
    const para = document.createElement("p");
    para.innerHTML = myList[elem];
    document.getElementById("text").appendChild(para);
    typewriter();
}
}

function add_options(options)
{
  for(let elem in options)
  {
    const item = document.createElement("a");
    item.innerHTML = options[elem].description;
    item.setAttribute("ID",elem);
    item.class='option'
    document.getElementById("options").appendChild(item);
}
}

//ammended code, found online at https://css-tricks.com/snippets/css/typewriter-effect/
let iSpeed = 10; // time delay of print out
let iIndex = 0; // start printing array at this posision
let iScrollAt = 20; // start scrolling up at this many lines
let iTextPos = 0; // initialise text position
let sContents = ''; // initialise contents variable
let iRow; // initialise current row
let options_appeared = false;

function update_variables()
{
  aText = current_option.text;
  iSpeed = 10; // time delay of print out
  iIndex = 0; // start printing array at this posision
  iArrLength = aText[0].length; // the length of the text array
  iScrollAt = 20; // start scrolling up at this many lines
  iTextPos = 0; // initialise text position
  sContents = ''; // initialise contents variable
  iRow; // initialise current row
}

//typewriter effect (adapted code)
function typewriter()
{
 sContents =  ' ';
 iRow = Math.max(0, iIndex-iScrollAt);
 iMax=aText.length
 let destination = document.getElementById("text");
 while ( iRow < iIndex ) {
  sContents += aText[iRow++] + '<br />';
 }
 if (iIndex<iMax)
 {
 destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
 if ( iTextPos++ == iArrLength ) {
  iTextPos = 0;
  iIndex++;
  if ( iIndex != aText.length ) {
   iArrLength = aText[iIndex].length;
   clearTimeout();
   setTimeout("typewriter()", iSpeed);
  }
 } else {
  clearTimeout();
  setTimeout("typewriter()", iSpeed);
 }
}
//if all the texts have loaded, fade in the options
else{
  options_appear()
}

}

function options_appear()
{
if (options_appeared==false)
{
  add_options(current_option.options)
  options_appeared=true
}

}

//increase height of suspicion bar and update
function update_suspicion(suspicion_inc)
{
  suspicion+=suspicion_inc;
  let element = document.getElementById("progress-bar");
  element.style.height = suspicion + '%';
  localStorage.setItem('suspicion', suspicion);
}

function make_decision(choice)
{
  localStorage.setItem('plead',choice)
}

//code found at https://www.codegrepper.com/code-examples/javascript/how+to+save+thing+in+cookie+js
//setting cookies
function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

//setting cookies
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

//work out which option it is from the list (following cookie return)
function determine_option(all_options,match_desc)
{
  let option=all_options[0]
  for(let item in all_options)
  {
    if(all_options[item].description==match_desc)
    {
        return all_options[item]
    }
  }
  return option
}

function load_option(current_option)
{
  add_text(current_option)
    //if it is a child function... run that 
    if (current_option.constructor.name=="StoryTextChild")
    {
      create_button()
      current_option.local_save()
    }
}