import {
  BACKGROUND_MENU_SPEED,
  BACKGROUND_OFFSET_X,
  BACKGROUND_OFFSET_Y,
  BACKGROUND_OPACITY,
  BACKGROUND_PIECE_WIDTH,
  BACKGROUND_SCALE,
  PLATFORM_MENU_SPEED,
  PLATFORM_OFFSET_X,
  PLATFORM_OFFSET_Y,
  PLATFORM_SCALE,
  PLATFORM_WIDTH,
} from '../constants';
import k from '../kaplayCtx';

const mainMenu = () => {
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

  k.onUpdate(() => {
    if (backgroundPieces[1].pos.x < 0) {
      backgroundPieces[0].moveTo(
        backgroundPieces[1].pos.x + BACKGROUND_PIECE_WIDTH * BACKGROUND_SCALE,
        BACKGROUND_OFFSET_Y
      );
      backgroundPieces.reverse();
    }

    backgroundPieces[0].move(-BACKGROUND_MENU_SPEED, 0);
    backgroundPieces[1].moveTo(
      backgroundPieces[0].pos.x + BACKGROUND_PIECE_WIDTH * BACKGROUND_SCALE,
      BACKGROUND_OFFSET_Y
    );

    if (platforms[1].pos.x < 0) {
      platforms[0].moveTo(platforms[1].pos.x + PLATFORM_WIDTH * PLATFORM_SCALE, PLATFORM_OFFSET_Y);
      platforms.reverse();
    }

    platforms[0].move(-PLATFORM_MENU_SPEED, 0);
    platforms[1].moveTo(platforms[0].pos.x + PLATFORM_WIDTH * PLATFORM_SCALE, PLATFORM_OFFSET_Y);
  });
};

export default mainMenu;
