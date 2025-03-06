/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "@testing-library/react";
import App from "../src/App";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

test("has timer", () => {
  render(<App />);
  const timerElement = screen.getByTestId("timer");
  expect(timerElement).toBeInTheDocument();
});

test("waits one second and displays 0:01", () => {
  render(<App />);

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  const timerElement = screen.getByTestId("timer");
  expect(timerElement).toHaveTextContent("0:01");

  act(() => {
    jest.advanceTimersByTime(2000);
  });

  expect(timerElement).toHaveTextContent("0:03");
});
