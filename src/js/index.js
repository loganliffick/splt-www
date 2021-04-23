import anime from 'animejs';
import splt from 'spltjs';
import Prism from 'prismjs';

Prism.highlightAll();

splt({
  reveal: true,
});

// anime({
//   targets: '.splt .reveal',
//   translateY: [40, 0],
//   duration: 2000,
//   loop: true,
//   direction: 'alternate',
//   delay: anime.stagger(25, { start: 500 }),
//   endDelay: 500,
//   easing: 'cubicBezier(.71,-0.77,.43,1.67)',
// });

// anime({
//   begin: splt({
//     target: '.test',
//     reveal: true,
//   }),
//   targets: '.test .char',
//   translateY: [40, 0],
//   duration: 2000,
//   delay: anime.stagger(25, { start: 500 }),
//   endDelay: 500,
//   easing: 'cubicBezier(.71,-0.77,.43,1.67)',
//   complete: splt.revert,
// });

const observer = new IntersectionObserver((entries) => {
  // Loop over the entries
  entries.forEach((entry) => {
    // If the element hits trigger
    if (entry.isIntersecting) {
      // Add new
      console.log('done');
    } else {
      // take it away
      console.log('not');
    }
  });
});

observer.observe(document.querySelector('.a'));

//https://coolcssanimation.com/how-to-trigger-a-css-animation-on-scroll/
