import { createContext, type JSX, useContext, useRef } from 'react';
import { World } from '../logic/World';

const WorldContext = createContext<World | undefined>(undefined);
export const WorldProvider = (props: {
  width: number;
  height: number;
  children: JSX.Element;
}) => {
  const mouseRef = useRef<World>(new World(props.width, props.height));
  return (
    <WorldContext.Provider value={mouseRef.current}>
      {props.children}
    </WorldContext.Provider>
  );
};

export function useWorld() {
  const context = useContext(WorldContext);
  if (!context) throw new Error('useWorld must be used within a WorldProvider');
  return context;
}
