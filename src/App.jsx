import React from "react";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [timeSinceOpen, setTimeSinceOpen] = useState(0);
  useEffect(() => {
    const time = 1000;

    const intervalId = setInterval(() => {
      setTimeSinceOpen((t) => t + 1000);
    }, time);
    return () => clearInterval(intervalId);
  }, []);
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
