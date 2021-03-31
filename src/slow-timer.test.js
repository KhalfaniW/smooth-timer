import {range} from "rxjs";
import {finalize} from "rxjs/operators";

import {calculateTimerVariables, runTimerObservable} from "./slow-timer";

const mockReturnValueGroup = (returnValues) => {
  const mockFunction = jest.fn();
  return returnValues.reduce(
    (mockFunctionAccumulator, newReturnValue) =>
      mockFunctionAccumulator.mockReturnValueOnce(newReturnValue),
    mockFunction,
  );
};
test.only("works when it there no skips intervals", async () => {
  //skip 3 seconds
  const obtainFakeTime = mockReturnValueGroup([1000, 2000, 5000]);
  const mockOnTickEvent = jest.fn(() => {});
  await new Promise((resolve) => {
    const instantyInvokedTimer = range(1, 5)
      .pipe(
        calculateTimerVariables({
          intervalTime: 1000,
          obtainTimeSinceStart: obtainFakeTime,
        }),
        finalize(resolve),
      )
      .subscribe(({currentTimeSinceStart, skippedIntervalGroup}) => {
        mockOnTickEvent({currentTimeSinceStart, skippedIntervalGroup});
      });
  });

  const expectedParameterObjects = [
    {currentTimeSinceStart: 1000, skippedIntervalGroup: []},
    {currentTimeSinceStart: 2000, skippedIntervalGroup: []},
    {currentTimeSinceStart: 5000, skippedIntervalGroup: [3000, 4000]},
  ];
  //expect serialize to same string
  expect(
    mockOnTickEvent.mock.calls.map((callArgs) => JSON.stringify(callArgs[0])),
  ).toEqual(expectedParameterObjects.map(JSON.stringify));
  expect(mockOnTickEvent).toHaveBeenCalledTimes(5);
});

//TODO make a promise
test("run timer", async () => {
  const obtainFakeTime = mockReturnValueGroup([
    1000, // TODO fix
    1000,
    2000,
    3000,
    4000,
    5000,
    6000,
  ]);
  let timesRun = 0;
  const mockOnTickEvent = jest.fn(() => {});
  const instantyInvokedTimer = range(1, 5);
  await new Promise((resolve) => {
    const timer$ = runTimerObservable({
      timerObservable: instantyInvokedTimer,
      intervalTime: 1000,
      obtainTimeSinceStart: obtainFakeTime,
      maxRunCount: 4,
      onTickEvent: mockOnTickEvent,
      onComplete: resolve,
    });
  });
  expect(mockOnTickEvent).toHaveBeenCalledTimes(5);
  expect(mockOnTickEvent).toHaveBeenCalledWith([1000, 2000, 3000, 4000]);
});

test.skip(" rerun if skipped interval times", () => {
  expect().toBe();
});
