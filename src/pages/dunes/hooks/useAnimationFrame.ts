import { useCallback, useEffect, useRef } from 'react';

export function useAnimationFrame(callback: (elapsedSeconds: number) => void) {
  const requestRef = useRef<number>(undefined);
  const previousTimeRef = useRef<number>(undefined);
  const inactiveTimeRef = useRef<number>(0);

  const animate = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const elapsedMS = time - previousTimeRef.current;
        const elapsedSeconds = elapsedMS / 1000;
        try {
          callback(elapsedSeconds);
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

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        inactiveTimeRef.current = performance.now();
      } else {
        if (previousTimeRef.current) {
          const elapsedInactiveTime =
            performance.now() - inactiveTimeRef.current;
          previousTimeRef.current += elapsedInactiveTime;
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
}
