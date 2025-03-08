import React, { useMemo, useRef } from "react";
import { useState, useEffect } from "react";
import { BehaviorSubject, switchMap, scan, interval, tap, EMPTY } from "rxjs";

export default function useTimer() {
  const [timeSinceOpen, setTimeSinceOpen] = useState(0);
  const intervalRef = useRef(1000);
  const intervalSubject$ = useMemo(
    () => new BehaviorSubject({ newInterval: 1000, running: true }),
    [],
  );

  const app$ = useMemo(
    () =>
      intervalSubject$.pipe(
        scan((oldState, { newInterval = null, running = null }) => {
          const finalRunning = running == null ? oldState.running : running;
          const finalInterval =
            newInterval == null ? oldState.newInterval : newInterval;

          return {
            newInterval: finalInterval,
            running: finalRunning,
          };
        }),

        switchMap(({ newInterval, running }) =>
          running ? interval(newInterval) : EMPTY,
        ),
      ),
    [],
  );

  useEffect(() => {
    const subscription = app$.subscribe(() => {
      setTimeSinceOpen((t) => t + 1000);
    });
    return () => subscription.unsubscribe();
  }, []);

  const changeInterval = (newInterval) => {
    intervalSubject$.next({ newInterval });
  };
  const start = (newInterval) => {
    intervalSubject$.next({ running: true });
  };
  const pause = (newInterval) => {
    intervalSubject$.next({ running: false });
  };

  return { time: timeSinceOpen, changeInterval, start, pause };
}
