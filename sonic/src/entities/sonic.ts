import { GameObj, Vec2 } from 'kaplay';
import { SONIC_JUMP_FORCE, SONIC_SCALE } from '../constants';
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
