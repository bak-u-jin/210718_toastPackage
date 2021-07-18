function setToast(toastPosition, type){
  let toast = document.createElement('span');
  toast.className = "toast";
  toast.style.width="300px";
  toast.style.padding="20px 20px 10px 20px";
  toast.style.color="#fff";
  toast.style.cursor='pointer';
  toast.style.borderRadius="5px";
  toast.style.position="fixed";
  toast.style.top="0";
  toast.style.left="50%";
  toast.style.transform = "translate(-50%,0)";
  toast.style.zIndex = 15;
  
  toast.style.background="#96BAFF";
  if(type == "warning")
    toast.style.background="#FF616D";


  toast.animate([
    { transform: 'translate(-50%,-100%)' },
    { transform: `translate(-50%,${120 + toastPosition}%)`,offset: 0.5 },
    { transform: `translate(-50%,${84 + toastPosition}%)`,offset: 0.65 },
    { transform: `translate(-50%,${100 + toastPosition}%)` }
  ], {
    duration: 500,
    fill:"forwards",
    easing:"cubic-bezier(.5,.75,.45,.24)",
  });

  toast.addEventListener('click', (e) => {
    toast.remove(e.target);
  });

  toast.addEventListener('mouseover', () =>{
    toast.animate([
      {transform:'translate(-50%,100%) scale(1.04)'}
    ],{
      duration:0,
      fill:"forwards",
    })
  })
  
  toast.addEventListener('mouseout',() =>{
    toast.animate([
      {transform:'translate(-50%,100%) scale(1)'}
    ],{
      duration:0,
      fill:"forwards",
    })
  })
  
  return toast;
}

function setToastText(str){
  let toastText = document.createElement('div');
  toastText.style.height="100%";
  toastText.innerText = str;

  return toastText
}

function setTimeBar(){
  let timeBar = document.createElement('span');

  timeBar.style.display= "inline-block";
  timeBar.style.height= "5px";
  timeBar.style.borderRadius="5px";
  timeBar.style.background= "#fff";

  return timeBar;
}

function pratice(str, type){
  let countToast = document.getElementsByClassName("toast").length;
  
  let toastMargin = 20;
  let toastPosition = countToast * (100 + toastMargin);

  const body = document.body;
  let toast = setToast(toastPosition, type);
  let toastText = setToastText(str);
  let timeBar = setTimeBar();
  let icon = document.createElement('img');
  icon.src = './img/tick.svg';
  icon.style.width="30px";

  let timeBarAni = timeBar.animate([
    {width:"100%"},
    {width:"0%"}
  ],2000)

  toast.addEventListener('mouseover', ()=>{
    timeBarAni.pause();
  })

  toast.addEventListener('mouseout', ()=>{
    timeBarAni.play();
  })

  timeBarAni.onfinish = ()=>{
    toast.animate([
      {transform:`translate(-50%,${100 + toastPosition}%)`},
      {transform:`translate(-50%,-100%)`}
    ],{
      duration: 300,
      fill:"forwards",
      easing:'ease-in-out'
    }).onfinish = () =>{
      toast.remove(toast);
    }
  }
  
  toast.append(icon);
  toast.append(toastText);
  toast.append(timeBar);
  body.append(toast);
}


export default pratice;