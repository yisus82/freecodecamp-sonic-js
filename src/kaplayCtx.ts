import kaplay from 'kaplay';
import { DISPLAY_HEIGHT, DISPLAY_WIDTH } from './constants';

const k = kaplay({
  width: DISPLAY_WIDTH,
  height: DISPLAY_HEIGHT,
  letterbox: true,
  background: [0, 0, 0],
  global: false,
  debug: false,
  touchToMouse: true,
  buttons: {
    jump: {
      keyboard: ['space'],
      mouse: 'left',
    },
  },
});

export default k;
