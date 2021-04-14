import splt from 'spltjs';
import anime from 'animejs';

splt({
  reveal: true,
});

anime({
  targets: '.reveal',
  translateY: [40, 0],
  duration: 1000,
  loop: true,
  direction: 'alternate',
  delay: anime.stagger(25, { start: 500 }),
  endDelay: 500,
  easing: 'cubicBezier(.71,-0.77,.43,1.67)',
});
