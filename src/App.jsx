import React from "react";
import "./App.css";
import useTimer from "./useTimer";

function App() {
  const { time: timeSinceOpen } = useTimer();
  const visibleTime = Math.floor(timeSinceOpen / 1000);
  return (
    <>
      <div data-testid="timer">
        {Math.floor(visibleTime / 60)}:
        {String(visibleTime % 60).padStart(2, "0")}
      </div>
    </>
  );
}

export default App;
