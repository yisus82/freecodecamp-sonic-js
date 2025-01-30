import {
  BACKGROUND_OFFSET_X,
  BACKGROUND_OFFSET_Y,
  BACKGROUND_OPACITY,
  BACKGROUND_PIECE_WIDTH,
  BACKGROUND_SCALE,
  PLATFORM_OFFSET_X,
  PLATFORM_OFFSET_Y,
  PLATFORM_SCALE,
  PLATFORM_WIDTH,
} from '../constants';
import k from '../kaplayCtx';

const game = () => {
  const backgroundPieces = [
    k.add([
      k.sprite('background'),
      k.pos(BACKGROUND_OFFSET_X, BACKGROUND_OFFSET_Y),
      k.scale(BACKGROUND_SCALE),
      k.opacity(BACKGROUND_OPACITY),
    ]),
    k.add([
      k.sprite('background'),
      k.pos(BACKGROUND_OFFSET_X + BACKGROUND_PIECE_WIDTH * BACKGROUND_SCALE, BACKGROUND_OFFSET_Y),
      k.scale(BACKGROUND_SCALE),
      k.opacity(BACKGROUND_OPACITY),
    ]),
  ];

  const platforms = [
    k.add([
      k.sprite('platforms'),
      k.pos(PLATFORM_OFFSET_X, PLATFORM_OFFSET_Y),
      k.scale(PLATFORM_SCALE),
    ]),
    k.add([
      k.sprite('platforms'),
      k.pos(PLATFORM_OFFSET_X + PLATFORM_WIDTH * PLATFORM_SCALE, PLATFORM_OFFSET_Y),
      k.scale(PLATFORM_SCALE),
    ]),
  ];
};

export default game;
