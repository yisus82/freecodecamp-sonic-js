import { AudioPlay } from 'kaplay';
import k from '../kaplayCtx';
import {
  GAME_OVER_TITLE,
  GAME_OVER_TITLE_FONT,
  GAME_OVER_TITLE_OFFSET_X,
  GAME_OVER_TITLE_OFFSET_Y,
  GAME_OVER_TITLE_SIZE,
} from './../constants';

const gameOver = (backgroundMusic: AudioPlay) => {
  backgroundMusic.paused = true;

  k.add([
    k.text(GAME_OVER_TITLE, { font: GAME_OVER_TITLE_FONT, size: GAME_OVER_TITLE_SIZE }),
    k.anchor('center'),
    k.pos(k.center().x + GAME_OVER_TITLE_OFFSET_X, k.center().y + GAME_OVER_TITLE_OFFSET_Y),
  ]);
};

export default gameOver;
