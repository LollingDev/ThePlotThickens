"use strict"
let total_score=0
if(document.title=="Work")
{
    document.body.style.backgroundImage="url('images/desk.jpeg')";
    console.log('changing background')
}

//remove the item, so user can't see it/click again
function remove(item,score)
{
    //remove the item
    let element = document.getElementById(item);
    element.parentNode.removeChild(element);
    total_score=increase_score(item,score);

}

//increase the users score
function increase_score(item,score)
{
    //increase score
    total_score+=score;
    
    //return to chapter 2 if all items found
    if (total_score==100)
    {
        document.location.href = "chapter2.html";
    }

    let progress = document.getElementById("status_bar");
    progress.style.width = total_score/2.5 + '%';//scale to fit status bar width
    return total_score;
}



