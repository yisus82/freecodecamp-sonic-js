import {
  BACKGROUND_MENU_SPEED,
  BACKGROUND_OFFSET_X,
  BACKGROUND_OFFSET_Y,
  BACKGROUND_OPACITY,
  BACKGROUND_PIECE_WIDTH,
  BACKGROUND_SCALE,
  MAIN_MENU_SUBTITLE,
  MAIN_MENU_SUBTITLE_FONT,
  MAIN_MENU_SUBTITLE_OFFSET_X,
  MAIN_MENU_SUBTITLE_OFFSET_Y,
  MAIN_MENU_SUBTITLE_SIZE,
  MAIN_MENU_TITLE,
  MAIN_MENU_TITLE_FONT,
  MAIN_MENU_TITLE_OFFSET_X,
  MAIN_MENU_TITLE_OFFSET_Y,
  MAIN_MENU_TITLE_SIZE,
  PLATFORM_MENU_SPEED,
  PLATFORM_OFFSET_X,
  PLATFORM_OFFSET_Y,
  PLATFORM_SCALE,
  PLATFORM_WIDTH,
} from '../constants';
import makeSonic from '../entities/sonic';
import k from '../kaplayCtx';
import { SONIC_MAIN_MENU_POSITION } from './../constants';

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

  k.add([
    k.text(MAIN_MENU_TITLE, { font: MAIN_MENU_TITLE_FONT, size: MAIN_MENU_TITLE_SIZE }),
    k.anchor('center'),
    k.pos(k.center().x + MAIN_MENU_TITLE_OFFSET_X, k.center().y + MAIN_MENU_TITLE_OFFSET_Y),
  ]);

  k.add([
    k.text(MAIN_MENU_SUBTITLE, { font: MAIN_MENU_SUBTITLE_FONT, size: MAIN_MENU_SUBTITLE_SIZE }),
    k.anchor('center'),
    k.pos(k.center().x + MAIN_MENU_SUBTITLE_OFFSET_X, k.center().y + MAIN_MENU_SUBTITLE_OFFSET_Y),
  ]);

  k.add(makeSonic(k.vec2(SONIC_MAIN_MENU_POSITION.x, SONIC_MAIN_MENU_POSITION.y)));

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
