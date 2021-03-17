import shopSlides from './desktop.js';
import shopSlidesMobiles from './small.js';

const navbarToggleOpen = document.querySelector('.harmburger');
const navbarToggleClose = document.querySelector('.close');
const navMenus = document.querySelector('.nav-menus');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const overlay = document.querySelector('.overlay');
const slideContainer= document.querySelector('.real-class-container');

navbarToggleOpen.addEventListener('click',()=>{
  navMenus.classList.add('active-menu');
  overlay.classList.add('overlay-active')
});

navbarToggleClose.addEventListener('click',()=>{
  navMenus.classList.remove('active-menu');
  overlay.classList.remove('overlay-active')
});


//dynamically add items
const createContainer = (array) =>{
  slideContainer.innerHTML = array.map((shop,slideIndex)=>{
    const {shopHeader , text , image , name} = shop;
    let position = 'next';
    if (slideIndex === 0){position = 'active';}
    if (slideIndex === array.length - 1){position = 'last';}
    return `<div class="slide slide-${position}">
    <div class="left-img">
      <img src="${image}" class="img" alt="${name}">
    </div>
    <div class="right-section">
      <h1>${shopHeader}</h1>
      <p>
        ${text}
      </p>
      <div class="shop">
        <h3>shop now <span><img src="/images/icon-arrow.svg" alt="Arrow-Right"></span> </h3>
      </div>
    </div>
  </div>`;
  }).join('');
};

//now creating the slides function
const startSlider = (type) =>{
  //first get classes to toggle
  const active = document.querySelector('.slide-active');
  const prev = document.querySelector('.slide-last');
  let next = active.nextElementSibling;
  if (!next){
    next = slideContainer.firstElementChild;
  }
  //to set the functions of button. we remove all classes
  //there be lot of next class added already
  active.classList.remove(['slide-active']);
  prev.classList.remove(['slide-last']);
  next.classList.remove(['slide-next']);

  if (type === 'prev'){
    active.classList.add('slide-next');
    prev.classList.add('slide-active');
    next = prev.previousElementSibling;
    if (!next){
      next = slideContainer.lastElementChild;
    }
    next.classList.remove(['slide-next']);
    next.classList.add('slide-last');
    return;
  }

  //the next button
  active.classList.add('slide-last');
  prev.classList.add('slide-next');
  next.classList.add('slide-active');
};

nextBtn.addEventListener('click',()=>{
  startSlider();
});

prevBtn.addEventListener('click',()=>{
  startSlider('prev');
});


window.addEventListener('resize',()=>{
  //check which screen to use
if(window.innerWidth > 768){
  window.addEventListener('resize',createContainer(shopSlides));
}
else{
  window.addEventListener('resize',createContainer(shopSlidesMobiles));
}
});

window.addEventListener('DOMContentLoaded',()=>{
  //check which screen to use
if(window.innerWidth > 768){
  window.addEventListener('resize',createContainer(shopSlides));
}
else{
  window.addEventListener('resize',createContainer(shopSlidesMobiles));
}
});



    

