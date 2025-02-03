import { GameObj, Vec2 } from 'kaplay';
import {
  MOTOBUG_AREA_HEIGHT,
  MOTOBUG_AREA_OFFSET_X,
  MOTOBUG_AREA_OFFSET_Y,
  MOTOBUG_AREA_WIDTH,
  MOTOBUG_SCALE,
} from '../constants';
import k from '../kaplayCtx';

const makeMotobug = (position: Vec2): GameObj =>
  k.make([
    k.sprite('motobug', { anim: 'run' }),
    k.area({
      shape: new k.Rect(
        k.vec2(MOTOBUG_AREA_OFFSET_X, MOTOBUG_AREA_OFFSET_Y),
        MOTOBUG_AREA_WIDTH,
        MOTOBUG_AREA_HEIGHT
      ),
    }),
    k.scale(MOTOBUG_SCALE),
    k.anchor('center'),
    k.pos(position),
    k.offscreen(),
    'enemy',
  ]);

export default makeMotobug;
