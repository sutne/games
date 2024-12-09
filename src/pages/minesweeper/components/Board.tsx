import { Display } from 'components/games/Display';
import { Cell } from './Cell';
import { useGame } from './GameProvider';

export function Board() {
  const { game } = useGame();

  return (
    <Display
      pixels={game.board}
      PixelComponent={Cell}
      maxPixelSize={64}
      noZIndex
    />
  );
}
