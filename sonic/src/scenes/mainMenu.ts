import k from '../kaplayCtx';

const mainMenu = () => {
  const BACKGROUND_PIECE_WIDTH = 1920;
  const backgroundPieces = [
    k.add([k.sprite('background'), k.pos(0, 0), k.scale(2), k.opacity(0.8)]),
    k.add([
      k.sprite('background'),
      k.pos(BACKGROUND_PIECE_WIDTH * 2, 0),
      k.scale(2),
      k.opacity(0.8),
    ]),
  ];

  const PLATFORM_WIDTH = 96;
  const PLATFORM_Y_OFFSET = 450;
  const platforms = [
    k.add([k.sprite('platforms'), k.pos(0, PLATFORM_Y_OFFSET), k.scale(4)]),
    k.add([k.sprite('platforms'), k.pos(PLATFORM_WIDTH * 4, PLATFORM_Y_OFFSET), k.scale(4)]),
  ];
};

export default mainMenu;
