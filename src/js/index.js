import anime from 'animejs';
import splt from 'spltjs';
import Prism from 'prismjs';

Prism.highlightAll();

splt({
  reveal: true,
});

let heroTextAnimation = anime({
  targets: '.splt .reveal',
  translateY: [72, 0],
  duration: 700,
  delay: anime.stagger(15, { start: 250 }),
  easing: 'cubicBezier(.6,-1.5,.1,1.9)',
});

// logo animation and trigger + throttling
splt({
  target: '.version',
  reveal: true,
});

const logo = document.getElementById('logo');
logo.addEventListener('mouseenter', () => {
  if (anime.running.length > 1) {
  } else {
    let versionAnimation = anime({
      targets: '.version .reveal',
      translateY: [
        { value: [0, -32], duration: 400, delay: anime.stagger(15, { start: 150 }) },
        { value: [32, 0], duration: 600, delay: anime.stagger(15) },
      ],
      easing: 'cubicBezier(.6,-1.5,.1,1.5)',
    });
  }
});

let npmAnimation = anime({
  targets: '#npm-container',
  translateY: [30, 0],
  rotate: [6, 0],
  opacity: [0, 1],
  duration: 800,
  delay: 900,
  easing: 'cubicBezier(.6,-1.5,.1,1.9)',
});

let valueCardAnimations = anime({
  targets: '.value-card',
  translateY: [120, 0],
  duration: 900,
  delay: anime.stagger(200, { start: 500 }),
  easing: 'cubicBezier(.6,-1.5,.1,1.9)',
});

// npm click animation card creation setup
let count = 0; // helps decide which color to use
let copiedMsgCreate = () => {
  let copiedMessage = document.createElement('div');
  copiedMessage.classList.add('copied-message');
  if (count == 1) {
    copiedMessage.classList.add('cmBlue');
  } else if (count == 2) {
    copiedMessage.classList.add('cmPink');
  } else if (count == 3) {
    copiedMessage.classList.add('cmYellow');
  } else if (count == 4) {
    copiedMessage.classList.add('cmGreen');
  }
  copiedMessage.setAttribute('id', ['clip'] + count);
  copiedMessage.innerHTML = 'Copied to clipboard!';
  copyNPM.appendChild(copiedMessage);

  copiedMsgCreate.destroy = () => {
    copiedMessage.remove();
  };
};

// copies npm text to clipboard
const copyNPM = document.getElementById('copy-npm');
copyNPM.addEventListener('click', () => {
  // after click animation setup
  navigator.clipboard.writeText('npm i spltjs').then(() => {
    count = count + 1;
    if (count == 5) {
      count = 1;
    }
    anime({
      begin: copiedMsgCreate(),
      targets: '#clip' + count,
      translateY: {
        value: [
          -20,
          () => {
            return anime.random(-70, -120);
          },
        ],
        duration: 1200,
      },
      rotate: () => {
        return anime.random(15, -15);
      },
      opacity: [
        { value: [0, 1], duration: 400 },
        { value: [1, 0], duration: 500 },
      ],
      duration: 500,
      easing: 'cubicBezier(.21,.9,.52,.95)',
      complete: copiedMsgCreate.destroy,
    });
  });
});

let navColor = 'var(--blue-2)'; // determines navigation color shift end result
let navIsIntersecting = false; // stops nav from changing colors if not intersecting

// colorizer for features section
let colorizer = (color, color2) => {
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
};

// features section animations

splt({
  target: '.demo',
  reveal: true,
});
let noSPLT = false; // primer for revert in animation 3

let animation;
let exampleAnimation = (x) => {
  if (x == 0) {
    animation = anime({
      targets: '.demo .char',
      translateY: [0, -30],
      duration: 300,
      loop: true,
      direction: 'alternate',
      delay: anime.stagger(30, { start: 500 }),
      easing: 'cubicBezier(.64,-0.38,.43,1.54)',
    });
    noSPLT = false;
  } else if (x == 1) {
    animation = anime({
      targets: '.demo .reveal',
      translateY: [80, 0],
      duration: 600,
      loop: true,
      direction: 'alternate',
      delay: anime.stagger(20, { start: 500 }),
      endDelay: 300,
      easing: 'cubicBezier(.64,-0.38,.43,1.54)',
    });
    noSPLT = false;
  } else if (x == 2) {
    animation = anime({
      targets: '.demo .reveal',
      translateY: [80, 0],
      duration: 600,
      delay: anime.stagger(10, { start: 500 }),
      easing: 'cubicBezier(.64,-0.38,.43,1.54)',
      complete: () => {
        anime({
          targets: '.demo #c1, .demo #c2, .demo #c3',
          keyframes: [{ translateY: -80 }, { scale: 0.8 }, { rotate: 35 }, { rotate: 0 }, { scale: 1 }, { translateY: 0 }],
          duration: 3800,
          endDelay: 100,
          delay: anime.stagger(80, { start: 500 }),
          easing: 'cubicBezier(1,-1.6,.35,2.06)',
          complete: () => {
            anime({
              targets: '.demo .reveal',
              translateY: [0, -80],
              duration: 600,
              delay: anime.stagger(10, { start: 500 }),
              easing: 'cubicBezier(.64,-0.38,.43,1.54)',
              complete: animation.restart,
            });
          },
        });
      },
    });
    noSPLT = false;
  } else if (x == 3) {
    animation = anime({
      targets: '.demo .char',
      translateY: () => {
        return anime.random(-30, 30);
      },
      duration: 500,
      direction: 'alternate',
      loop: 1,
      delay: anime.stagger(50, { from: 'center', start: 500 }),
      easing: 'cubicBezier(.71,-5,.43,5)',
      complete: () => {
        splt.revert();
        noSPLT = true; // primer triggered, next click will resplit
      },
    });
  }
};
exampleAnimation(0);

//

// reset reveal position
let revealReset = () => {
  let reveals = document.querySelectorAll('.reveal');
  for (let i = 0; i < reveals.length; i++) {
    reveals[i].style.transform = 'translateY(0px)';
  }
};

// click functions for features section
let featuresCard = document.querySelectorAll('.features-card');
let navBackground = document.querySelector('header');
for (let i = 0; i < featuresCard.length; i++) {
  let liner = document.querySelectorAll('.liner');

  featuresCard[i].addEventListener('click', () => {
    // resplit characters
    if (noSPLT == true) {
      splt({
        target: '.demo',
        reveal: true,
      });
    }
    // reset active modifiers
    for (let e = 0; e < featuresCard.length; e++) {
      featuresCard[e].classList.add('opacity-50');
      liner[e].classList.remove('liner-add');
    }

    // resets animations to 0 to cleanly play them with each click
    if (anime.running.length > 0) {
      animation.restart();
    }
    anime.running.length = 0;

    // specific color selections
    if ([i] == 0) {
      colorizer('var(--blue-1)', 'var(--blue-2)');
      revealReset();
      exampleAnimation(0);
    } else if ([i] == 1) {
      colorizer('var(--pink-1)', 'var(--pink-2)');
      exampleAnimation(1);
    } else if ([i] == 2) {
      colorizer('var(--yellow-1)', 'var(--yellow-2)');
      exampleAnimation(2);
    } else if ([i] == 3) {
      colorizer('var(--green-1)', 'var(--green-2)');
      revealReset();
      exampleAnimation(3);
    }
    // set new active modifiers
    featuresCard[i].classList.remove('opacity-50');
    liner[i].classList.add('liner-add');
    // determine nav position to decide if it needs a background color
    if (navIsIntersecting == true) {
      navBackground.style.background = navColor;
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

// testimonial magnetic hover
let magnets = document.querySelectorAll('.testimonial-card');
let strength = 50;

magnets.forEach((magnet) => {
  magnet.addEventListener('mousemove', moveMagnet);
  magnet.addEventListener('mouseout', (event) => {
    anime({
      targets: event.currentTarget,
      duration: 1500,
      translateX: 0,
      translateY: 0,
    });
  });
});

function moveMagnet(event) {
  let magnetButton = event.currentTarget;
  let bounding = magnetButton.getBoundingClientRect();

  //console.log(magnetButton, bounding)

  anime({
    targets: magnetButton,
    duration: 1000,
    translateX: ((event.clientX - bounding.left) / magnetButton.offsetWidth - 0.5) * strength,
    translateY: ((event.clientY - bounding.top) / magnetButton.offsetHeight - 0.5) * strength,
  });
}

// hamburger menu
let hamburgerClicked = false;
const hamburgerWrapper = document.querySelector('.hamburger-wrapper');
const topLine = document.querySelector('.ham-line-1');
const bottomLine = document.querySelector('.ham-line-2');
const fontColorBlack = document.querySelectorAll('.font-color-black');
const mobileMenu = document.querySelector('.mobile-menu');
const body = document.querySelector('body');

let mobileMenuAnimation = () => {
  anime({
    targets: '.mobile-item.menu',
    translateY: [32, 0],
    opacity: [0, 1],
    duration: 700,
    delay: anime.stagger(50),
    easing: 'cubicBezier(.6,-1.5,.1,1.9)',
  });
};

let hamburgerClickTrue = () => {
  topLine.style.top = '50%';
  topLine.style.transform = 'rotate(45deg)';
  topLine.style.background = 'var(--white)';
  bottomLine.style.top = '50%';
  bottomLine.style.transform = 'rotate(-45deg)';
  bottomLine.style.background = 'var(--white)';
  for (let i = 0; i < fontColorBlack.length; i++) {
    fontColorBlack[i].style.color = 'var(--white)';
  }
  navBackground.style.background = 'var(--black)';
  body.style.height = '100vh';
  body.style.overflow = 'hidden';
  mobileMenu.style.display = 'block';
  setTimeout(() => {
    mobileMenu.style.opacity = '1';
  }, 0);
  logo.style.color = 'var(--white)';
  mobileMenuAnimation();
  hamburgerClicked = true;
};

let hamburgerClickFalse = () => {
  topLine.style.top = '35%';
  topLine.style.transform = 'rotate(0deg)';
  topLine.style.background = 'var(--black)';
  bottomLine.style.top = '65%';
  bottomLine.style.transform = 'rotate(0deg)';
  bottomLine.style.background = 'var(--black)';
  for (let i = 0; i < fontColorBlack.length; i++) {
    fontColorBlack[i].style.color = 'var(--black)';
  }
  if (navIsIntersecting == true) {
    navBackground.style.background = navColor;
  } else {
    navBackground.style.background = 'var(--white)';
  }
  body.style.height = 'auto';
  body.style.overflow = 'visible';
  mobileMenu.style.opacity = '0';
  setTimeout(() => {
    mobileMenu.style.display = 'none';
  }, 300);
  hamburgerClicked = false;
};

hamburgerWrapper.addEventListener('click', () => {
  if (hamburgerClicked == false) {
    hamburgerClickTrue();
  } else {
    hamburgerClickFalse();
  }
});

let mobileMenuItems = document.querySelectorAll('.mobile-item');

for (let i = 0; i < mobileMenuItems.length; i++) {
  mobileMenuItems[i].addEventListener('click', () => {
    hamburgerClickFalse();
  });
}

// added to kick the user out of hamburger mode should the browser be resized
window.addEventListener('resize', () => {
  hamburgerClickFalse();
});

// support button functionality
const closeBtn = document.querySelector('.x');
const supportCard = document.querySelector('.support-card');
closeBtn.addEventListener('click', () => {
  supportCard.style.display = 'none';
});

setTimeout(() => {
  anime({
    targets: '.support-card',
    translateY: [32, 0],
    translateX: ['-50%', '-50%'],
    opacity: [0, 1],
    duration: 900,
    easing: 'cubicBezier(.6,-1.5,.1,1.9)',
  });
}, 10000);
