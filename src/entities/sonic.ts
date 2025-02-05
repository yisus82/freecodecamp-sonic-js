import { GameObj, Vec2 } from 'kaplay';
import {
  SONIC_JUMP_FORCE,
  SONIC_RING_COLLECT_UI_COLOR,
  SONIC_RING_COLLECT_UI_FONT,
  SONIC_RING_COLLECT_UI_OFFSET_X,
  SONIC_RING_COLLECT_UI_OFFSET_Y,
  SONIC_RING_COLLECT_UI_SIZE,
  SONIC_SCALE,
} from '../constants';
import k from '../kaplayCtx';

const makeSonic = (position: Vec2): GameObj =>
  k.make([
    k.sprite('sonic', { anim: 'run' }),
    k.pos(position),
    k.scale(SONIC_SCALE),
    k.anchor('center'),
    k.area(),
    k.body({ jumpForce: SONIC_JUMP_FORCE }),
    {
      ringCollectUI: k.add([
        k.text('', { font: SONIC_RING_COLLECT_UI_FONT, size: SONIC_RING_COLLECT_UI_SIZE }),
        k.color(
          SONIC_RING_COLLECT_UI_COLOR.r,
          SONIC_RING_COLLECT_UI_COLOR.g,
          SONIC_RING_COLLECT_UI_COLOR.b
        ),
        k.pos(
          position.x + SONIC_RING_COLLECT_UI_OFFSET_X,
          position.y + SONIC_RING_COLLECT_UI_OFFSET_Y
        ),
        k.scale(SONIC_SCALE),
        k.anchor('center'),
      ]),
      setControls() {
        k.onButtonPress('jump', () => {
          if (this.isGrounded()) {
            this.play('jump');
            this.jump();
            k.play('jump', { volume: 0.5 });
          }
        });
      },
      setEvents() {
        this.onGround(() => {
          this.play('run');
        });
      },
    },
  ]);

export default makeSonic;
