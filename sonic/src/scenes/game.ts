import {
  BACKGROUND_JUMP_RATIO,
  BACKGROUND_MENU_SPEED,
  BACKGROUND_OFFSET_X,
  BACKGROUND_OFFSET_Y,
  BACKGROUND_OPACITY,
  BACKGROUND_PIECE_WIDTH,
  BACKGROUND_SCALE,
  GAME_SPEED_INCREMENT,
  GRAVITY,
  INITIAL_GAME_SPEED,
  MAX_GAME_SPEED,
  MOTOBUG_MAX_SPAWN_INTERVAL,
  MOTOBUG_MIN_SPAWN_INTERVAL,
  MOTOBUG_POSITION,
  MOTOBUG_SPEED,
  PLATFORM_OFFSET_X,
  PLATFORM_OFFSET_Y,
  PLATFORM_SCALE,
  PLATFORM_WIDTH,
  SONIC_POSITION,
  SONIC_SCALE,
} from '../constants';
import makeMotobug from '../entities/motobug';
import makeSonic from '../entities/sonic';
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

  const sonic = makeSonic(k.vec2(SONIC_POSITION.x, SONIC_POSITION.y));
  sonic.setControls();
  sonic.setEvents();
  k.add(sonic);

  k.add([
    k.rect(sonic.width * 2 * SONIC_SCALE, sonic.height * SONIC_SCALE),
    k.opacity(0),
    k.area(),
    k.pos(
      SONIC_POSITION.x - sonic.width * SONIC_SCALE,
      SONIC_POSITION.y + (sonic.height / 2) * SONIC_SCALE
    ),
    k.body({ isStatic: true }),
  ]);

  k.setGravity(GRAVITY);
  let gameSpeed = INITIAL_GAME_SPEED;
  k.loop(1, () => {
    if (gameSpeed < MAX_GAME_SPEED) {
      gameSpeed += GAME_SPEED_INCREMENT;
    }
  });

  const spawnMotoBug = () => {
    const motobug = makeMotobug(k.vec2(MOTOBUG_POSITION.x, MOTOBUG_POSITION.y));

    motobug.onUpdate(() => {
      motobug.move(-(gameSpeed + MOTOBUG_SPEED), 0);
    });

    motobug.onExitScreen(() => {
      if (motobug.pos.x < 0) {
        k.destroy(motobug);
      }
    });

    k.add(motobug);

    const spawnInterval = k.rand(MOTOBUG_MIN_SPAWN_INTERVAL, MOTOBUG_MAX_SPAWN_INTERVAL);

    k.wait(spawnInterval, spawnMotoBug);
  };

  spawnMotoBug();

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

    if (!sonic.isGrounded()) {
      backgroundPieces[0].moveTo(backgroundPieces[0].pos.x, -sonic.pos.y * BACKGROUND_JUMP_RATIO);
      backgroundPieces[1].moveTo(backgroundPieces[1].pos.x, -sonic.pos.y * BACKGROUND_JUMP_RATIO);
    }

    if (platforms[1].pos.x < 0) {
      platforms[0].moveTo(platforms[1].pos.x + PLATFORM_WIDTH * PLATFORM_SCALE, PLATFORM_OFFSET_Y);
      platforms.reverse();
    }

    platforms[0].move(-gameSpeed, 0);
    platforms[1].moveTo(platforms[0].pos.x + PLATFORM_WIDTH * PLATFORM_SCALE, PLATFORM_OFFSET_Y);
  });
};

export default game;
