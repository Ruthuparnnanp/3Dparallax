const parallax_el=document.querySelectorAll('.parallax');
const main=document.querySelector("main");

let xValue=0,
yValue=0;

let rotateDegree=0;

function update(cursorPosition){
    parallax_el.forEach((el)=>{
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;
        let rotationSpeed = el.dataset.rotation;
    
        let isInLeft=parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
        let zvalue=(cursorPosition-parseFloat(getComputedStyle(el).left) ) * isInLeft *0.1;
    
        el.style.transform=`translate(calc(-50% + ${-xValue * speedx }px),calc(-50% + ${yValue * speedy}px))  perspective(2300px) translateZ(${zvalue * speedz}px) rotateY(${rotateDegree * rotationSpeed}deg)`});
}

update(0);  

parallax_el.forEach((el)=>{
    el.style.transition="0.45s cubic-bezier(.2,.49,.32,.99)";
}); 

window.addEventListener('mousemove',(e)=>{

    if(timeline.isActive()) return;

   xValue=e.clientX - window.innerWidth / 2;
   yValue=e.clientY - window.innerHeight / 2;

   rotateDegree=xValue / (window.innerWidth / 2) * 20;

   update(e.clientX);   
});

if(window.innerWidth >= 725){
    main.style.maxHeight = `${window.innerWidth * 0.6}px` ;
   }
   else{
    main.style.maxHeight = `${window.innerHeight * 1.6}px`;
   }

// ---------------------------GSAP Animation---------------------------------//

let timeline=gsap.timeline();

Array.from (parallax_el).filter(el=>!el.classList.contains('text'))
.forEach((el)=>{

    timeline.from(el,{
        top:`${el.offsetHeight / 2 + el.dataset.distance}px`,
        duration:3, //increase the speed to hide the bug
        ease:'power3.out'
    },'0');

});
timeline.from(
    ".text h1",
    {
        y:
        window.innerHeight - 
        document.querySelector(".text h1").getBoundingClientRect().top + 200,
        duration:1.5,
    },
    "0.5"  //delay
);
timeline.from(".hide",{
    opacity:0,
    duration:3,
},"3");