import anime from 'animejs';
import splt from 'spltjs';
import Prism from 'prismjs';

Prism.highlightAll();

splt({
  reveal: true,
});

anime({
  targets: '.splt .reveal',
  translateY: [72, 0],
  duration: 1000,
  delay: anime.stagger(10, { start: 250 }),
  endDelay: 500,
  easing: 'cubicBezier(.71,-0.77,.43,1.67)',
  complete: (anime.running.length = 0),
});

// copies npm text to clipboard
const copyNPM = document.getElementById('copy-npm');
copyNPM.addEventListener('click', () => {
  navigator.clipboard.writeText('npm i spltjs').then(() => {
    console.log('hey logan we need something here');
  });
});

let navColor = 'var(--blue-2)'; // determines navigation color shift end result
let navIsIntersecting = false; // stops nav from changing colors if not intersecting

// colorizer for features section
function colorizer(color, color2) {
  let colorSplash = document.querySelectorAll('.color-splash');
  let colorSplashLiner = document.querySelectorAll('.color-splash-liner');
  let colorSplashBorder = document.querySelector('.color-splash-border');
  let colorSplashBackground = document.querySelector('.features');
  // get all entities that need to be colorized
  for (let i = 0; i < colorSplash.length; i++) {
    colorSplash[i].style.color = color;
    colorSplash[i].style.stroke = color;
  }
  for (let i = 0; i < colorSplashLiner.length; i++) {
    colorSplashLiner[i].style.background = color;
  }
  colorSplashBorder.style.border = '1px ' + color + ' solid';
  colorSplashBackground.style.background = color2;
  navColor = color2;
}

// features animations

splt({
  target: '.demo',
  reveal: true,
});

let animation;
let exampleAnimation = (x) => {
  if (x == 0) {
    animation = anime({
      targets: '.demo .char',
      translateY: [0, -30],
      duration: 500,
      loop: true,
      direction: 'alternate',
      delay: anime.stagger(40, { start: 500 }),
      easing: 'cubicBezier(.64,-0.38,.43,1.54)',
    });
  }
  if (x == 1) {
    animation = anime({
      targets: '.demo .reveal',
      translateY: [0, -80],
      duration: 600,
      loop: true,
      direction: 'alternate',
      delay: anime.stagger(20, { start: 500 }),
      easing: 'cubicBezier(.64,-0.38,.43,1.54)',
    });
  }
};
exampleAnimation(0);

//

// click functions for features section
let featuresCard = document.querySelectorAll('.features-card');
for (let i = 0; i < featuresCard.length; i++) {
  let liner = document.querySelectorAll('.liner');
  //featuresCard[i].style.opacity = '50%';

  featuresCard[i].addEventListener('click', () => {
    // reset active modifiers
    for (let e = 0; e < featuresCard.length; e++) {
      featuresCard[e].classList.add('opacity-50');
      liner[e].classList.remove('liner-add');
    }

    if (anime.running.length > 0) {
      animation.restart();
    }
    anime.running.length = 0;

    // specific color selections
    if ([i] == 0) {
      colorizer('var(--blue-1)', 'var(--blue-2)');
      exampleAnimation(0);
    } else if ([i] == 1) {
      colorizer('var(--pink-1)', 'var(--pink-2)');
      exampleAnimation(1);
    } else if ([i] == 2) {
      colorizer('var(--yellow-1)', 'var(--yellow-2)');
    } else {
      colorizer('var(--green-1)', 'var(--green-2)');
    }
    // set new active modifiers
    featuresCard[i].classList.remove('opacity-50');
    liner[i].classList.add('liner-add');
    // determine nav position to decide if it needs a background color
    if (navIsIntersecting == true) {
      document.querySelector('header').style.background = navColor;
    }
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    // Loop over the entries
    entries.forEach((entry) => {
      // If the element hits trigger
      if (entry.isIntersecting) {
        //console.log('is intersecting');
        navIsIntersecting = true;
        document.querySelector('header').style.background = navColor;
      } else {
        //console.log('is not intersecting');
        navIsIntersecting = false;
        document.querySelector('header').style.background = 'var(--white)';
      }
    });
  },
  { rootMargin: '-10% 0px -90% 0px' }
);

observer.observe(document.querySelector('.features'));
