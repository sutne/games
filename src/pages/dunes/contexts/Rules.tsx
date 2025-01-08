import { createContext, useContext, useEffect, useState } from 'react';
import type { JSX, SetStateAction } from 'react';

export type LeftClickAction = 'sand' | 'water';
export type RightClickAction = 'rock' | 'remove';

const RulesContext = createContext<
  | {
      cursorSize: number;
      setCursorSize: React.Dispatch<SetStateAction<number>>;
      leftClickAction: LeftClickAction;
      setLeftClickAction: React.Dispatch<SetStateAction<LeftClickAction>>;
      rightClickAction: RightClickAction;
      setRightClickAction: React.Dispatch<SetStateAction<RightClickAction>>;
      isPaused: boolean;
      setIsPaused: React.Dispatch<SetStateAction<boolean>>;
      isDebugMode: boolean;
      setIsDebugMode: React.Dispatch<SetStateAction<boolean>>;
      isFullscreen: boolean;
      setIsFullscreen: React.Dispatch<SetStateAction<boolean>>;
    }
  | undefined
>(undefined);
export function RulesProvider(props: { children: JSX.Element }) {
  const [cursorSize, setCursorSize] = useState(13);
  const [leftClickAction, setLeftClickAction] =
    useState<LeftClickAction>('water');
  const [rightClickAction, setRightClickAction] =
    useState<RightClickAction>('rock');
  const [isPaused, setIsPaused] = useState(false);
  const [isDebugMode, setIsDebugMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    });
  }, []);

  return (
    <RulesContext.Provider
      value={{
        cursorSize,
        setCursorSize,
        leftClickAction,
        setLeftClickAction,
        rightClickAction,
        setRightClickAction,
        isPaused,
        setIsPaused,
        isDebugMode,
        setIsDebugMode,
        isFullscreen,
        setIsFullscreen,
      }}
    >
      {props.children}
    </RulesContext.Provider>
  );
}

export function useRules() {
  const context = useContext(RulesContext);
  if (!context) throw new Error('useRules must be used within a RulesProvider');
  return context;
}
