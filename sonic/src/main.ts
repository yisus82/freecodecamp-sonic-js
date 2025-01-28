import k from './kaplayCtx';

k.loadSprite('background', 'images/chemical-bg.png');
k.loadSprite('platforms', 'images/platforms.png');
k.loadSprite('sonic', 'images/sonic.png', {
  sliceX: 8,
  sliceY: 2,
  anims: {
    run: { from: 0, to: 7, loop: true, speed: 30 },
    jump: { from: 8, to: 15, loop: true, speed: 100 },
  },
});
k.loadSprite('ring', 'images/ring.png', {
  sliceX: 16,
  sliceY: 1,
  anims: {
    spin: { from: 0, to: 15, loop: true, speed: 30 },
  },
});
k.loadSprite('motobug', 'images/motobug.png', {
  sliceX: 5,
  sliceY: 1,
  anims: {
    run: { from: 0, to: 4, loop: true, speed: 8 },
  },
});

k.loadFont('mania', 'fonts/mania.ttf');

k.loadSound('bg-music', 'sounds/city.mp3');
k.loadSound('destroy', 'sounds/destroy.wav');
k.loadSound('hurt', 'sounds/hurt.wav');
k.loadSound('hyper-ring', 'sounds/hyper-ring.wav');
k.loadSound('jump', 'sounds/jump.wav');
k.loadSound('ring', 'sounds/ring.wav');
