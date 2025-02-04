import { GameObj } from 'kaplay';
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
  RING_MAX_SPAWN_INTERVAL,
  RING_MIN_SPAWN_INTERVAL,
  RING_POSITION,
  SCORE_TEXT_FONT,
  SCORE_TEXT_OFFSET_X,
  SCORE_TEXT_OFFSET_Y,
  SCORE_TEXT_SIZE,
  SONIC_POSITION,
  SONIC_SCALE,
} from '../constants';
import makeMotobug from '../entities/motobug';
import makeRing from '../entities/ring';
import makeSonic from '../entities/sonic';
import k from '../kaplayCtx';

const game = () => {
  const backgroundMusic = k.play('bg-music', { volume: 0.2, loop: true });

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

  const scoreText = k.add([
    k.text('SCORE: 0', { font: SCORE_TEXT_FONT, size: SCORE_TEXT_SIZE }),
    k.pos(SCORE_TEXT_OFFSET_X, SCORE_TEXT_OFFSET_Y),
  ]);
  let score = 0;
  let scoreMultiplier = 0;

  const sonic = makeSonic(k.vec2(SONIC_POSITION.x, SONIC_POSITION.y));
  sonic.setControls();
  sonic.setEvents();

  sonic.onCollide('ring', (ring: GameObj) => {
    k.play('ring', { volume: 0.5 });
    k.destroy(ring);
    score++;
    scoreText.text = `SCORE: ${score}`;
    sonic.ringCollectUI.text = '+1';
    k.wait(1, () => {
      sonic.ringCollectUI.text = '';
    });
  });

  sonic.onCollide('enemy', (enemy: GameObj) => {
    if (!sonic.isGrounded()) {
      k.play('destroy', { volume: 0.5 });
      k.play('hyper-ring', { volume: 0.5 });
      k.destroy(enemy);
      sonic.play('jump');
      sonic.jump();
      scoreMultiplier++;
      score += 10 * scoreMultiplier;
      scoreText.text = `SCORE: ${score}`;
      sonic.ringCollectUI.text = `+${10 * scoreMultiplier}`;
      k.wait(1, () => {
        sonic.ringCollectUI.text = '';
      });
      return;
    }

    k.play('hurt', { volume: 0.5 });
    k.setData('current-score', score);
    k.go('gameOver', backgroundMusic);
  });

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

  const spawnRing = () => {
    const ring = makeRing(k.vec2(RING_POSITION.x, RING_POSITION.y));

    ring.onUpdate(() => {
      ring.move(-gameSpeed, 0);
    });

    ring.onExitScreen(() => {
      if (ring.pos.x < 0) {
        k.destroy(ring);
      }
    });

    k.add(ring);

    const spawnInterval = k.rand(RING_MIN_SPAWN_INTERVAL, RING_MAX_SPAWN_INTERVAL);

    k.wait(spawnInterval, spawnRing);
  };

  spawnRing();

  k.onUpdate(() => {
    if (sonic.isGrounded()) {
      scoreMultiplier = 0;
    }

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
