"use strict"
//retrieve suspicion bar
let suspicion=parseInt(localStorage.getItem('suspicion'))
let police_called=localStorage.getItem('police_called')
update_suspicion(0)


class StoryTextParent{
    constructor(description, text, suspicion, options) {
        this.description = description;
        this.options=options;
        this.text=text;
        this.suspicion=suspicion;

      }
    }

class StoryTextChild{
  constructor(description, text,suspicion){
    this.description=description
    this.text=text
    this.suspicion=suspicion

  }
}

const a_text=[`As you had grown to expect, the time comes where you are 
called in for questioning. The police inform you they are just looking
 for more information and as a close friend of the victim you could provide useful insight. `, 

 `You see your now deceased victim's family 
 wailing in the corner. Clearly, they have undergone some grilling. 
 Do you want to stop and speak to him or head on in now? `]

const b_text=[`You speak to the family, offering your condolences. The shock 
of seeing the result of your actions unsettles you slightly and you hope it 
will not disturb you for the interrogation. `,

`The mother hugs you. She cries ‘Oh I never should have let my precious child date 
that monster... look where it’s left us’. You smirk to yourself proud that she isn’t 
on to you... but quickly stop yourself realising it’s probably not the smartest action.`  
  ]

  const c_text=[`You head into the interrogation room. The duty offer asks you if you’d like to
   take in a lawyer with you. You worry it could raise suspicions but it also may be sensible if things get heated.   `,
   `What would you like to do?`]


  let d_text=[`Your lawyer offers you some free advice ahead of your interrogation: `]

let d1=`"As far as the police are aware you could be a suspect in this investigation... however
because they have not heard from you yet they are expecting you to tell them that 
you know very little"`
let d2=`"Because you have already called the police they are far less likely to believe it was
you. However, you are still a suspect so you should explain why you were there or offer
an explanation "`

const e_text=[`You finally head in and have the biggest decision to make yet...`,
`The statement you give to the police`]

if (police_called=='false')
{
  d_text=d_text.concat(d1);
}
else
{
  d_text=d_text.concat(d2);
}

//set up story paths
const option_e=new StoryTextChild("Head on in",e_text,0)
const option_d=new StoryTextParent("Get lawyer",d_text,5,[option_e])
const option_c=new StoryTextParent("Head to interrogation room",c_text,0,[option_d,option_e])
const option_b=new StoryTextParent("Speak to them",b_text,0,[option_c])
const option_a=new StoryTextParent("Start",a_text,0,[option_b,option_c])

var all_options=[option_a,option_b,option_c,option_d,option_e]

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
  add_text(current_option.text);
  update_suspicion(current_option.suspicion)
  console.log('Option selected'+suspicion)


  //if it is a child function... run that 
  if (current_option.constructor.name=="StoryTextChild")
  {
    create_button()
  }
}

function create_button()
{
  const item = document.createElement("a");
  item.innerHTML = "continue...";
  item.setAttribute("ID","Pleading");
  item.class='option'
  document.getElementById("options").appendChild(item);
}


  


  
