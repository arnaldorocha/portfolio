// CURSOR
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  cursor.style.left=(mx-4)+'px';
  cursor.style.top=(my-4)+'px';
});
function animRing(){
  rx+=(mx-rx-16)*0.12;
  ry+=(my-ry-16)*0.12;
  ring.style.left=rx+'px';
  ring.style.top=ry+'px';
  requestAnimationFrame(animRing);
}
animRing();
document.querySelectorAll('a,button,.proj-card,.chip,.cl-item,.edu-item').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    cursor.style.transform='scale(2.5)';
    ring.style.transform='scale(1.4)';
    ring.style.borderColor='rgba(57,255,138,0.7)';
  });
  el.addEventListener('mouseleave',()=>{
    cursor.style.transform='scale(1)';
    ring.style.transform='scale(1)';
    ring.style.borderColor='rgba(57,255,138,0.4)';
  });
});

// SCROLL REVEAL
const revealEls=document.querySelectorAll('.reveal');
const io=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>e.target.classList.add('visible'),i*60);
      io.unobserve(e.target);
    }
  });
},{threshold:0.1});
revealEls.forEach(el=>io.observe(el));

// BOOT SEQUENCE TEXT
const bootLine=document.querySelector('.boot-line');
const text=bootLine.innerHTML;
bootLine.innerHTML='';
let idx=0;
function typeChar(){
  if(idx<text.length){
    bootLine.innerHTML=text.slice(0,idx+1);
    idx++;
    setTimeout(typeChar,idx<4?0:12);
  }
}
setTimeout(typeChar,300);

// NAV ACTIVE STATE
const sections=document.querySelectorAll('section[id]');
const navLinks=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{
  let current='';
  sections.forEach(s=>{
    if(window.scrollY>=s.offsetTop-100) current=s.id;
  });
  navLinks.forEach(a=>{
    a.style.color=a.getAttribute('href')==='#'+current?'var(--text)':'';
  });
},{ passive:true });
