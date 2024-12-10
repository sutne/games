import { PageHeader } from 'components/typography';
import { GameArea } from './components/GameArea';
import { GameProvider } from './components/GameProvider';

export function Tetris() {
  return (
    <>
      <PageHeader header='Tetris' />
      <GameProvider>
        <GameArea />
      </GameProvider>
    </>
  );
}
