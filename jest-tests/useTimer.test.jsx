import { renderHook, act } from "@testing-library/react";
import useTimer from "../src/useTimer";

describe("useTimer", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should allow changing the interval", () => {
    const { result } = renderHook(() => useTimer());
    const timerMS = () => result.current.time;

    const { changeInterval } = result.current;

    expect(timerMS()).toBe(0);

    act(() => {
      changeInterval(500);
      jest.advanceTimersByTime(1000);
    });
    expect(timerMS()).toBe(2000);

    act(() => {
      changeInterval(100);
      jest.advanceTimersByTime(1000);
    });
    expect(timerMS()).toBe(12000);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(timerMS()).toBe(22000);
  });

  it("should pause and start timer", () => {
    const { result } = renderHook(() => useTimer());
    const timerMS = () => result.current.time;

      const { changeInterval, pause,start } = result.current;

    expect(timerMS()).toBe(0);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(timerMS()).toBe(1000);
    pause();
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(timerMS()).toBe(1000);
      start();
      act(() => {
          jest.advanceTimersByTime(10000);
      });

      expect(timerMS()).toBe(11000);
  });

  it("should increment the timer every second", () => {
    const { result } = renderHook(() => useTimer());
    const timerMS = () => result.current.time;

    expect(timerMS()).toBe(0);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(timerMS()).toBe(1000);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(timerMS()).toBe(3000);
  });
});
