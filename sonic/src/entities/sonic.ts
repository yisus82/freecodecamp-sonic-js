import { GameObj, Vec2 } from 'kaplay';
import { SONIC_SCALE } from '../constants';
import k from '../kaplayCtx';

const makeSonic = (position: Vec2): GameObj =>
  k.make([
    k.sprite('sonic', { anim: 'run' }),
    k.pos(position),
    k.scale(SONIC_SCALE),
    k.anchor('center'),
    k.area(),
  ]);

export default makeSonic;
