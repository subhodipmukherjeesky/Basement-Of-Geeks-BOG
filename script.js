// HERO SLIDER DATA
const slides = [
  {
    image: 'assets/dsevent.png',
    cta: 'Visit Now',
    title: 'Watch out latest\nDemon Slayer Movie\nMeet Up Event in PVR!'
  },
  {
    image: 'assets/codersmeetup.png',
    cta: 'Join Workshop',
    title: 'Hack Sessions,\nWatch Parties &\nCoder Meetups.'
  },
  {
    image: 'assets/crickettournament.png',
    cta: 'Explore Community',
    title: 'Enjoy your favourite Sports \nFind Your People\nIn Every Guild.'
  }
];

const slidesRoot = document.querySelector('.hero-slides');
const heroTitle = document.getElementById('heroTitle');
const heroCta = document.getElementById('heroCta');

let current = 0;
function renderSlides(){
  slidesRoot.innerHTML = '';
  slides.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = 'slide' + (i === current ? ' active' : '');
    div.style.backgroundImage = `url('${s.image}')`;
    slidesRoot.appendChild(div);
  });
  heroTitle.innerHTML = slides[current].title.replaceAll('\n', '<br/>');
  heroCta.textContent = slides[current].cta;
}
renderSlides();

function go(n){
  current = (current + n + slides.length) % slides.length;
  renderSlides();
}
document.getElementById('prevSlide').addEventListener('click', () => go(-1));
document.getElementById('nextSlide').addEventListener('click', () => go(1));

// Auto-advance
let auto = setInterval(() => go(1), 6000);
['mouseenter','touchstart'].forEach(evt => {
  slidesRoot.addEventListener(evt, () => clearInterval(auto), { once: true });
});

//Clickable cards

//Volunteer & Event Progress Bar Work
(function(){
  function animateValue(el, start, end, duration){
    const range = end - start;
    let startTime = null;
    function step(ts){
      if(!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      el.textContent = Math.round(start + range * progress);
      if(progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function animateProgressBar(barEl, fromPct, toPct, duration){
    let startTime = null;
    function step(ts){
      if(!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const value = fromPct + (toPct - fromPct) * progress;
      barEl.style.width = value + '%';
      if(progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initCard(card){
    const current = parseInt(card.dataset.current, 10) || 0;
    const total = parseInt(card.dataset.total, 10) || 1;
    const pct = Math.min(100, Math.round((current/total)*100));

    const progressInner = card.querySelector('.ves-progress-inner');
    const countCurrent = card.querySelector('.ves-count span:first-child');
    const countTotal = card.querySelector('.ves-count span:last-child');

    if(countTotal) countTotal.textContent = total;
    if(countCurrent) animateValue(countCurrent, 0, current, 800);
    if(progressInner) animateProgressBar(progressInner, 0, pct, 800);
  }

  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.ves-card').forEach(initCard);

    document.getElementById('ves_vol_button')
      .addEventListener('click', e => { e.preventDefault(); alert('Become a Volunteer clicked!'); });
    document.getElementById('ves_evt_button')
      .addEventListener('click', e => { e.preventDefault(); alert('Submit a Session clicked!'); });
  });

  // expose updater
  window.vesUpdateProgress = function(cardId, newCurrent, newTotal){
    const card = document.getElementById(cardId);
    if(!card) return;
    card.dataset.current = newCurrent;
    card.dataset.total = newTotal;
    initCard(card);
  };
})();

//BOG Snap Image and text sliding

const progressBar = document.getElementById("bogsnap1_progressBar");
const stepCounter = document.getElementById("bogsnap1_stepCounter");
const cardDescription = document.getElementById("bogsnap1_desc");
const cardImage = document.getElementById("bogsnap1_image");
const card = document.querySelector(".bogsnap1_card");

let currentStep = 1;
const totalSteps = 5;
const cycleTime = 5000;
let intervalId;

const data = [
  { desc: "Welcome to the frosted glass experience. Let’s start!", 
    bg: "https://picsum.photos/id/1015/800/600" 
  },

  { desc: "Step 2 brings you closer to the magic ✨", 
    bg: "https://picsum.photos/id/1016/800/600" 
  },

  { desc: "Enjoy the smooth animations and aesthetic vibes.", 
    bg: "https://picsum.photos/id/1018/800/600" 
  },

  { desc: "Glassmorphism meets progress tracking.", 
    bg: "https://picsum.photos/id/1020/800/600" 
  },

  { desc: "All done! 🎉 Thanks for trying this card.", 
    bg: "https://picsum.photos/id/1024/800/600" 
  }
];

data.forEach(item => {
  const img = new Image();
  img.src = item.bg;
});

function updateCard() {
  const step = data[currentStep - 1];
  progressBar.style.width = (currentStep / totalSteps) * 100 + "%";
  stepCounter.textContent = `Step ${currentStep} of ${totalSteps}`;
  cardDescription.textContent = step.desc;

  // Smooth image transition
  cardImage.style.opacity = 0;
  setTimeout(() => {
    cardImage.src = step.bg;
    cardImage.onload = () => {
      cardImage.style.opacity = 1;
    };
  }, 300);
}

function autoCycle() {
  updateCard();
  currentStep = currentStep < totalSteps ? currentStep + 1 : 1;
}

function startCycle() {
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(autoCycle, cycleTime);
  updateCard();
}

card.addEventListener("mouseenter", () => clearInterval(intervalId));
card.addEventListener("mouseleave", startCycle);

startCycle();



