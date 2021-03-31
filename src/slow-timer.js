var {forkJoin, interval, finalize, pipe, of, range} = require("rxjs");
var {
  map,
  tap,
  take,
  startWith,
  pairwise,
  concatMap,
} = require("rxjs/operators");
var _ = require("lodash");

// TODO this timer rerun effects because it might lag
//use of to make parameter
export function runTimerObservable({
  timerObservable,
  intervalTime,
  obtainTimeSinceStart,
  onTickEvent,
  onComplete,
  maxRunCount = Math.pow(10, 100),
}) {
  // return range(1, 10)
  //   .pipe(
  //     pairwise(),
  //     map(([previousRunTime, currentTimeSinceStart]) => {
  //       return {
  //         currentTimeSinceStart,
  //         skippedIntervalGroup:
  //           (currentTimeSinceStart - previousRunTime) / intervalTime,
  //       };
  //     }),
  //     tap(console.log),
  //   )
  //   .subscribe(onTickEvent);

  return range(1, 10)
    .pipe(finalize(onComplete))

    .subscribe(({currentTimeSinceStart, skippedIntervalGroup}) => {
      onTickEvent({currentTimeSinceStart, skippedIntervalGroup});
      console.log({currentTimeSinceStart, skippedIntervalGroup});
      skippedIntervalGroup.forEach((currentTimeSinceStart) => {
        console.log("boom");
        onTickEvent(currentTimeSinceStart);
      });
    });
}
export function calculateTimerVariables({obtainTimeSinceStart, intervalTime}) {
  // const startTime = obtainTimeSinceStart();
  return pipe(
    map((n) => obtainTimeSinceStart()),
    startWith(0),
    pairwise(),
    map(([previousRunTime, currentTimeSinceStart]) => {
      return {
        currentTimeSinceStart,
        skippedIntervalGroup: getSkippedTimeIntervals({
          previousRunTime,
          currentTimeSinceStart,
          intervalTime,
        }),
        //
      };
    }),
  );
}
function getSkippedTimeIntervals({
  previousRunTime,
  currentTimeSinceStart,
  intervalTime,
}) {
  const previousTimeInterval = Math.floor(previousRunTime / intervalTime);
  const currentTimeInterval = Math.floor(currentTimeSinceStart / intervalTime);
  const skippedTimeRange = _.range(previousTimeInterval, currentTimeInterval)
    .map((skippedIntervalIndex) => skippedIntervalIndex * intervalTime)
    .filter((skippedTime) => skippedTime !== previousRunTime);
  return skippedTimeRange;
}
function createHowManyTimesShouldRun(intervalTime) {
  return interval(intervalTime).pipe(
    map((n) => Date.now()),
    startWith(Date.now()),
    pairwise(),
    take(4),
    map(([previousTime, currentTime]) => {
      return -1;
    }),
  );
}
