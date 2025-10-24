"use strict"

let suspicion=parseInt(localStorage.getItem('suspicion'));
let police_called=localStorage.getItem('police_called')

class StoryTextParent{
    constructor(description, text, suspicion, options) {
        this.description = description;
        this.options=options;
        this.text=text;
        this.suspicion=suspicion;

      }
    }

class StoryTextChild{
  constructor(description, text, suspicion, crime_scene_evidence,role_played){
    this.description=description
    this.text=text
    this.suspicion=suspicion
    this.crime_scene_evidence=crime_scene_evidence
    this.role_played=role_played
  }

  local_save()
  {
    localStorage.setItem('evidence',this.crime_scene_evidence)
    localStorage.setItem('role',this.role_played)
  }
}


const a_text=[`After the shocking realisation that during the struggle of the night you
strangled your friend to death you are left with some pretty challenging decisions. `,

`Now you may have noticed that colour changing bar at the bottom of the screen... that is your suspicion level. 
Suspicious decisions will raise this bar...`,


`You could carry on as before, as if you never realised that it was you who killed her,
maybe there's an easier way out, or you could pull yourself together and start to remedy the situation`]


const b_text=[`You decide to play ignorant. After all,
 no one should have any reason to expect you... `,

 `You try to get some sleep and head to work as if all is normal.  `,

 `Monday morning rolls around. You definitely look tired
  but imagine you can pass it off as just typical Monday blues.`,  

 

  `First thing you step through the doors of your office job 
  and your colleague, Suzy, exclaims how tired you look. 
  Do you admit you’ve had a rough weekend and are tired hoping she might leave you alone. 
  Or just play it off as not having had your morning coffee? `]


const c_text=[`You examine the crime scene, looking 
at the absolute mess. It was clearly a struggle.  `,

`You wonder what is best to do now: dispose of the body
 so they can’t investigate for murder just yet or to
  clear your prints so the murder can’t be tied back to you?  `]
  

const d_text=[`You explain to your colleague you had a
 rough night but would rather not talk about it – you
  know that Suzie can read between the lines though
   and you see her judging eyes.  `,

   `You wonder if you should give her a little 
   bit more to keep her from being suspicious of you.  `,
  
   `Do you want to drum up sympathy and 
   play the role of victim or return to your desk? `]

const e_text=[`You shrug it off as if you were running
 late this morning and haven’t yet had your morning coffee.`, 

 `Ugh classic Monday... `]

 const f_text=[`You bundle up the body into a garbage sack. It absolutely stinks. `,
 `
 The best solution seems to be to take it to the tip. That place stinks and 
 no one will suspect anything of you carrying some big garbage bag.   `]

 const g_text = [`You clear your prints from the scene and step back to admire what a fantastic job
 you have done at cleaning up. `,
 `The dead body doesn’t look great lying on the floor... do you want to do something about that still?   `]

const h_text=[`Suzie takes you for a nice
 chat and reassures you significantly. `,

 `You tell her how sad and scared you feel... 
 playing the role of victim as if it could have 
 been you murdered. ` ]


 const i_text=[`You return to your desk and power 
 through the work day, taking the suspicious looks from around.`,

  `You are grateful for it to finally come to an end 
  although you are completely aware the consequences
   are soon to catch up with you.  `]

  const j_text = [`You stick to your story and fetch 
  a coffee despite feeling nauseous.  `,

  `Suzie looks on approvingly and although you are sure
   she isn’t convinced at least your story of needing a 
   coffee is slightly more convincing. `]

const k_text=[`You go back to your desk, continuing 
on with the work you had to do.  `,

`Suzie glances at you furtively and you realise
 not getting a coffee hasn’t looked great. Nevermind... `,`
  
  You are grateful for when the workday finally  ends.` ]

var l_text=[`After disposing of the body, you begin to clear the prints from the scene.
 Wiping down every surface there is barely a trace of you having been here.  `]


 const m_text=[`You leave the scene, having erased the body
  from the equation. It will make it far harder for them to carry 
  on with investigations. `]

  var n_text=[`You then proceed to hide the body, 
  very much relieved there is no evidence of murder... this could be a missing persons case for all you know.   `]

  const o_text=[`You leave the scene, having cleared any trace of you being there especially as a murderer.` , 
  `The dead body will provide some evidence but there is far less to incriminate you now.  `]

const busted_text=[`Asides from the very fact you are there cleaning 
up the scene and the police you called arrive. WHAT THE HELL were you thinking?!`]

//change suspicion if the user has called police
let police_suspicion=5
if (police_called==true)
{
  l_text=l_text.concat(busted_text);
  n_text=n_text.concat(busted_text);
  police_suspicion=60;
}


//set up all story nodes
const option_h=new StoryTextChild("Have a chat",h_text,5,'all','victim')
const option_i=new StoryTextChild("Return to desk",i_text,10,'all','victim')
const option_j=new StoryTextChild("Fetch coffee",j_text,7,'all','clueless')
const option_k=new StoryTextChild("Return to your desk",k_text,15,'all','clueless')
const option_l=new StoryTextChild("Clean prints",l_text,police_suspicion,'zero','zero')
const option_m=new StoryTextChild("Leave scene",m_text,-5,'prints','zero')
const option_n=new StoryTextChild("Dispose of body",n_text,police_suspicion,'zero','zero')
const option_o=new StoryTextChild("Leave scene",o_text,-5,'body','zero')
const option_d=new StoryTextParent("Long weekend",d_text,5,[option_h,option_i])
const option_e=new StoryTextParent("Lack of coffee",e_text,3,[option_j,option_k])
const option_f=new StoryTextParent("Dispose of the body",f_text,2,[option_l,option_m])
const option_g=new StoryTextParent("Clear prints",g_text,0,[option_n,option_o])
const option_c=new StoryTextParent("Clean the crime scene", c_text,4,[option_f,option_g])
const option_b=new StoryTextParent("Play ignorant",b_text,0,[option_d,option_e])
const option_a=new StoryTextParent("Start",a_text,11,[option_b,option_c])

var all_options=[option_a,option_b,option_c,option_d,option_e,option_f,option_g,option_h,option_i,option_j,option_k,option_l,option_m,option_n,option_o]


//load in option
let cookie_option=getCookie("option")
let current_option=determine_option(all_options,cookie_option)
load_option(current_option)
var aText = current_option.text
var iArrLength = aText[0].length;
var iMax=aText.length -1;


function select_option()
{
  //get the item
  clear_page();
  options_appeared=false;
  current_option=current_option.options[option_number];
  setCookie("option",current_option.description,1);
  add_text(current_option.text);
  update_suspicion(current_option.suspicion)

  //if it is a child function... run that 
  if (current_option.constructor.name=="StoryTextChild")
  {
    create_button()
    current_option.local_save()
  }
  if (current_option.description=='Clear prints' ||current_option.description=='Clean prints')
  {
    document.location.href="cleangame.html"
  }
  else if (current_option.description=='Clear prints' ||current_option.description=='Clean prints')
  {
    document.location.href="cleangame.html"
  }
  else if (current_option==option_d ||current_option==option_e)
  {
    document.location.href="workgame.html"
  }
}

function create_button()
{
  const item = document.createElement("a");
  item.innerHTML = "continue...";
  item.setAttribute("ID","Stage3");
  item.class='option'
  document.getElementById("options").appendChild(item);
}


  
