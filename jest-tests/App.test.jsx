import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";

test("renders timer", () => {
  render(<App />);
  const timerElement = screen.getByTestId("timer");
  expect(timerElement).toBeInTheDocument();
});
