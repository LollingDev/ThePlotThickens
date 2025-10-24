"use strict"

let plead=localStorage.getItem('plead')
let suspicion=(localStorage.getItem('suspicion'))
let police_called=localStorage.getItem('police_called')
let evidence=localStorage.getItem('evidence')
let role=localStorage.getItem('role')
let body = document.getElementById("gradient");
setCookie("stage","endscreen",1);

let result='lose'
let reasoning=''
//Check if the user made winning choices
if(plead=='clueless' && suspicion<50 && evidence=='none'&&police_called=='false')
{
    reasoning='Your clueless act worked due to lack of evidence at the scene and having not called the police. No one could tie you to the crime'
    result='win'
}
else if(plead=='clueless')
{
    if(police_called=='true')
    {
        reasoning='Your clueless act failed, you called the police so they suspicious of why you would pretend to know very little about the crime'
    }
    else if(suspicion>49)
    {
        reasoning='Your clueless act failed, you had raised far too many suspicions'
    }
    else
    {
        reasoning='Evidence was found at the crime scene that linked you to murder'
    }

}
else if(plead=='neutral' && suspicion<40 && (evidence=='prints' || evidence=='body' || evidence=='zero')&&police_called=='false')
{
    result='win'
    reasoning='Your neutrual act worked due to lack of suspicion, the limited number of evidence and having not called the police'
}
else if(plead=='neutral')
{
    if(police_called=='true')
    {
        reasoning='Your neutral act failed, you called the police so they suspicious of why you would pretend to know very little about the crime'
    }
    else if(suspicion>39)
    {
        reasoning='Your neutral act failed, you had raised far too many suspicions'
    }
    else
    {
        reasoning='Evidence was found at the crime scene that linked you to the crime, you should have got rid of everything'
    }
}

else if(plead=="blame partner" && suspicion<60 && (evidence=='body' || evidence=='zero'))
{
    result='win'
}
else if(plead=='blame partner')
{
    if(evidence=='prints' || evidence=='all')
    {
        reasoning='Your blame act failed, due to your prints being found at the scene'
    }
    else
    {
        reasoning="Your act failed, you had raised far too many suspicions, blaming someone else didn't look great for you"
    }

}
else if(plead=='victim' && suspicion<30 && police_called=='true' && role=='victim')
{
    result='win'
}
else if(plead=='victim')
{
    if(police_called=='false')
    {
        reasoning="The police didn't believe you could have also been a victim as you never called them"
    }
    else
    {
        reasoning="Your actions haven't reflected those of a victim, you didn't convince anyone"
    }
}


//set up green gradient and load in text
if (result=='win')
{
    var img = document.createElement('img');
    img.src = 'images/win.png';
    document.getElementById('result').appendChild(img);
    const item = document.createElement("a");
item.innerHTML = reasoning;
document.getElementById("info").appendChild(item);
    document.body.style.background = 
    "linear-gradient(to left, " 
    + "#19391B"
    + ", " 
    + "#000000"
    + ")";
    css.textContent = body.style.background + ";";

}
//set up all red gradient and losing text
else
{
    var img = document.createElement('img');
    img.src = 'images/lose.png';
    document.getElementById('result').appendChild(img);
    const item = document.createElement("a");
    item.innerHTML = reasoning;
    document.getElementById("info").appendChild(item);
    document.body.style.backgroundColor = "red";
    document.body.style.background = 
    "linear-gradient(to left, " 
    + "#790707"
    + ", " 
    + "#000000"
    + ")";
    css.textContent = body.style.background + ";";

}







