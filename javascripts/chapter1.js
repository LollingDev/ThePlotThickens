"use strict"


class StoryTextParent{
    constructor(description, text, options) {
        this.description = description;
        this.options=options;
        this.text=text;

      }
    }

class StoryTextChild{
  constructor(description, text,police_called,suspicion_raised){
    this.description=description
    this.text=text
    this.police_called=police_called
    this.suspicion_raised=suspicion_raised
    localStorage.setItem('return_info','none')
  }

  local_save()
{
  localStorage.setItem('police_called', this.police_called);
  localStorage.setItem('suspicion',this.suspicion_raised);
}
}


const a_text=[`You awake from your sleep, gasping for air. That was quite possibly the
 worst sleep of your life. Nightmares replaced your sweet slumber with images of murderous gore. From the fogginess
of your thoughts you slowly begin to distinguish your dreams from reality,
waiting as the overshadowing demons disappear. `,

`
You stare at your hands, praying for your eyes to unblur and the crimson
stains to fade away. But something isn't right...`,

`The blood covering your hands doesn't fade and you are clearly injured.
You realise your friend is in a state 
similar to those of your nightmares. Her neck is scratched beyond battering and you find it
hard to imagine that she would still have a pulse.`,

`Just in case, you go over to check her pulse. In the search for the heartbeat, you can feel the cold lifelessness
of her body. Expectedly, there is no sign of life.`,

`An overwhelming sense of fear fills you... Imagining that it could have been you lying stone cold
on the floor. Wondering if you should leave this place you are met with 2 options:`]


const b_text=[`You decide the best possible solution is to get out of here.
 It doesn’t feel safe for you to linger around. 
The only problem is the bloody marks covering your hands, neck and face... 
it isn’t really ‘public attire’.`,

`
Coming to your senses, you realise this is your (now dead) friend’s house
 and that it is only a short walk to your home.
 Do you gather your belongings and shower here? 
 Or are you keen to leave immediately and head home?`]


 const c_text=[`You decide to stay for a little bit longer to gather your thoughts.
  From the more sensible perspective you realise that there are far more logical options
   than immediately fleeing the situation. You begin to feel far more calm and start
    to grasp a hold of the situation.`,

    `You realise there are 2 quite pressing problems: the dead body with you and
  your own physical state of injury. What would you like to do immediately?
 `]

 const d_text=[`You decide to leave after some careful personal grooming
  and collection of your belongings. You feel far better that you won’t 
  be running into the streets covered in blood. `,

  `You make the walk home and begin to feel much safer. `,
  
  `You are safely back home. You think it could be a sensible decision
   to call the police and inform them but something is stopping you… `,
  
   `You wonder if it’s best to get a good night sleep and head to bed 
   after the chaos of the day or to call the police now.    `
  ]

const e_text=[`You leave immediately and head home.
 You are just relieved to be free from the scene and give 
 yourself time to recover. `,

 `Fortunately it’s a short walk home so you manage to avoid
  too many funny glances, with the exception of a clearly
   nosey neighbour peering out who gives you quite the glare. `,
  
   `It's when you are home it dawns on you...`
  
  ]

const f_text=[`You alert the police and they inform you
 they will be there as quick as possible. Unfortunately 
 that will be up to 4 hours due to your rural location. `,

 `The police advise you return home and find a safe location 
 and that they will investigate the scene as quickly as possible.` 
  ]

const g_text=[`You check yourself thoroughly for cuts. 
Fortunately you seem to be far less damaged than your friend.`,


`Your neck is scratched showing clear signs of struggle 
but the battering of your hands and blood stained on them
 is more indicative that you were the winner of any kind of 
 brutality. At this point it dawns on you…
`]

const h_text=[`You make the executive decision to call the police now.
 As you are speaking they ask you grilling questions about the state 
 of your friend. You explain that her neck was viciously battered and 
 that it was just you two there.`,

 `They ask you about your own state. `,
  
 `Upon retelling them you start to change your story.
  You realise it probably doesn’t sound great that you were 
  severely less bruised and your hands were the ones covered in blood. `,
  
  `It’s at this moment you realise that telling the
   police could have been a big mistake because… `
  ]

const i_text=[`Something about calling the police didn’t quite feel right.`, 

`At home you decide to clean yourself up,
 washing away the blood and stress of the day. `,
  
  
 `In true Eureka style, you watch the blood dripping
  off your body in the shower and begin to think more
   deeply about the chaos of the day. It’s at this point
    you realise that… `
  ]

const l_text=[`You follow the police’s advice and travel to 
your partners home despite it being further out of town. `,

`You get quite a few odd glances, realising 
that it is most likely due to the blood that you never washed off. `,
  
`Being back your partner is definitely shocked at the state
 of you but you clean up and are reassured that everything 
 is okay. Slowly being brought back to your senses. `,
  
  
 `Follow police’s advice, travel to your partners house,
  further out of town. `

  ]


//assign all the nodes from the pages
const option_m=new StoryTextChild("Travel home",e_text,true,3)
const option_l=new StoryTextChild("Travel to your partners house",l_text,true,10)
const option_k=new StoryTextChild("Take shower",i_text,false,10)
const option_j=new StoryTextChild("Call police",h_text,true, 6)
const option_i=new StoryTextChild("Relax",i_text,false,4)
const option_h=new StoryTextChild("Call the police", h_text,true,4)
const option_g=new StoryTextChild("Check yourself for cuts",g_text,false,2)
const option_f=new StoryTextParent("Alert police",f_text,[option_l,option_m])
const option_d=new StoryTextParent("Gather belongings and shower", d_text, [option_h,option_i]) 
const option_e=new StoryTextParent("Leave immediately", e_text, [option_j,option_k])
const option_c=new StoryTextParent("Stay a while to gather your thoughts", c_text,[option_f,option_g])
const option_b=new StoryTextParent("Flee the situation",b_text,[option_d,option_e])
const option_a=new StoryTextParent("Start",a_text,[option_b,option_c])

var all_options=[option_a,option_b,option_c,option_d,option_e,option_f,option_g,option_h,option_i,option_j,option_k,option_l,option_m]

//load in option
let cookie_option=getCookie("option")
let current_option=determine_option(all_options,cookie_option)
load_option(current_option)

var aText = current_option.text
var iArrLength = aText[0].length;
var iMax=aText.length -1;
let suspicion=0

function select_option()
{
  //get the item
  setCookie("option",current_option.description,1);
  clear_page();
  options_appeared=false;
  current_option=current_option.options[option_number];
  add_text(current_option.text);
  setCookie("option",current_option.description,1);

  //if it is a child function... run that 
  if (current_option.constructor.name=="StoryTextChild")
  {
    create_button()
    current_option.local_save()
  }
}

function create_button()
{
  const item = document.createElement("a");
  item.innerHTML = "continue...";
  item.setAttribute("ID","Stage2");
  item.class='option'
  document.getElementById("options").appendChild(item);
}


  
