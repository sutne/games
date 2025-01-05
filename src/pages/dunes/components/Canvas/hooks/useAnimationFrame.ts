import { useCallback, useEffect, useRef } from 'react';

export function useAnimationFrame(callback: (elapsedS: number) => void) {
  const requestRef = useRef<number>(undefined);
  const previousTimeRef = useRef<number>(undefined);

  const animate = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const elapsedMS = time - previousTimeRef.current;
        const elapsedS = elapsedMS / 1000;
        try {
          callback(elapsedS);
        } catch (err) {
          console.error(err);
          return;
        }
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback],
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);
}
