import { AudioPlay } from 'kaplay';
import k from '../kaplayCtx';
import {
  BEST_RANK_OFFSET_X,
  BEST_RANK_OFFSET_Y,
  BEST_SCORE_FONT,
  BEST_SCORE_OFFSET_X,
  BEST_SCORE_OFFSET_Y,
  BEST_SCORE_SIZE,
  CURRENT_RANK_OFFSET_X,
  CURRENT_RANK_OFFSET_Y,
  CURRENT_SCORE_FONT,
  CURRENT_SCORE_OFFSET_X,
  CURRENT_SCORE_OFFSET_Y,
  CURRENT_SCORE_SIZE,
  GAME_OVER_SUBTITLE,
  GAME_OVER_SUBTITLE_FONT,
  GAME_OVER_SUBTITLE_OFFSET_X,
  GAME_OVER_SUBTITLE_OFFSET_Y,
  GAME_OVER_SUBTITLE_SIZE,
  GAME_OVER_TITLE,
  GAME_OVER_TITLE_FONT,
  GAME_OVER_TITLE_OFFSET_X,
  GAME_OVER_TITLE_OFFSET_Y,
  GAME_OVER_TITLE_SIZE,
  RANK_BOX_COLOR,
  RANK_BOX_HEIGHT,
  RANK_BOX_OUTLINE_COLOR,
  RANK_BOX_OUTLINE_WIDTH,
  RANK_BOX_RADIUS,
  RANK_BOX_WIDTH,
  RANKBOX_TEXT_FONT,
  RANKBOX_TEXT_SIZE,
} from './../constants';

const makeRankBox = (rank: string, offset_x: number, offset_y: number) => {
  const rankBox = k.make([
    k.rect(RANK_BOX_WIDTH, RANK_BOX_HEIGHT, { radius: RANK_BOX_RADIUS }),
    k.color(RANK_BOX_COLOR.r, RANK_BOX_COLOR.g, RANK_BOX_COLOR.b),
    k.area(),
    k.anchor('center'),
    k.outline(
      RANK_BOX_OUTLINE_WIDTH,
      k.Color.fromArray([
        RANK_BOX_OUTLINE_COLOR.r,
        RANK_BOX_OUTLINE_COLOR.g,
        RANK_BOX_OUTLINE_COLOR.b,
      ])
    ),
    k.pos(k.center().x + offset_x, k.center().y + offset_y),
  ]);
  rankBox.add([
    k.text(rank, { font: RANKBOX_TEXT_FONT, size: RANKBOX_TEXT_SIZE }),
    k.anchor('center'),
  ]);
  return rankBox;
};

const gameOver = (backgroundMusic: AudioPlay) => {
  backgroundMusic.paused = true;

  let bestScore: number = k.getData('best-score') || 0;
  const currentScore: number = k.getData('current-score') || 0;

  const rankGrades = ['F', 'E', 'D', 'C', 'B', 'A', 'S'];
  const rankValues = [50, 80, 100, 200, 300, 400, 500];

  let currentRank = 'F';
  let bestRank = 'F';
  for (let i = 0; i < rankValues.length; i++) {
    if (rankValues[i] < currentScore) {
      currentRank = rankGrades[i];
    }

    if (rankValues[i] < bestScore) {
      bestRank = rankGrades[i];
    }
  }

  if (bestScore < currentScore) {
    k.setData('best-score', currentScore);
    bestScore = currentScore;
    bestRank = currentRank;
  }

  k.add([
    k.text(GAME_OVER_TITLE, { font: GAME_OVER_TITLE_FONT, size: GAME_OVER_TITLE_SIZE }),
    k.anchor('center'),
    k.pos(k.center().x + GAME_OVER_TITLE_OFFSET_X, k.center().y + GAME_OVER_TITLE_OFFSET_Y),
  ]);

  k.add([
    k.text(`CURRENT SCORE: ${currentScore}`, {
      font: CURRENT_SCORE_FONT,
      size: CURRENT_SCORE_SIZE,
    }),
    k.anchor('center'),
    k.pos(k.center().x + CURRENT_SCORE_OFFSET_X, k.center().y + CURRENT_SCORE_OFFSET_Y),
  ]);

  k.add([
    k.text(`BEST SCORE: ${bestScore}`, { font: BEST_SCORE_FONT, size: BEST_SCORE_SIZE }),
    k.anchor('center'),
    k.pos(k.center().x + BEST_SCORE_OFFSET_X, k.center().y + BEST_SCORE_OFFSET_Y),
  ]);

  const bestRankBox = makeRankBox(bestRank, BEST_RANK_OFFSET_X, BEST_RANK_OFFSET_Y);
  k.add(bestRankBox);

  const currentRankBox = makeRankBox(currentRank, CURRENT_RANK_OFFSET_X, CURRENT_RANK_OFFSET_Y);
  k.add(currentRankBox);

  k.wait(1, () => {
    k.add([
      k.text(GAME_OVER_SUBTITLE, { font: GAME_OVER_SUBTITLE_FONT, size: GAME_OVER_SUBTITLE_SIZE }),
      k.anchor('center'),
      k.pos(k.center().x + GAME_OVER_SUBTITLE_OFFSET_X, k.center().y + GAME_OVER_SUBTITLE_OFFSET_Y),
    ]);
    k.onButtonPress('jump', () => k.go('game'));
  });
};

export default gameOver;
