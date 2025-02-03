import { GameObj, Vec2 } from 'kaplay';
import { RING_SCALE } from '../constants';
import k from '../kaplayCtx';

const makeRing = (position: Vec2): GameObj =>
  k.make([
    k.sprite('ring', { anim: 'spin' }),
    k.area(),
    k.scale(RING_SCALE),
    k.anchor('center'),
    k.pos(position),
    k.offscreen(),
    'ring',
  ]);

export default makeRing;
