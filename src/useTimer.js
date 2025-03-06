import { useState, useEffect } from "react";

function useTimer() {
  const [timeSinceOpen, setTimeSinceOpen] = useState(0);

  useEffect(() => {
    const time = 1000;

    const intervalId = setInterval(() => {
      setTimeSinceOpen((t) => t + 1000);
    }, time);

    return () => clearInterval(intervalId);
  }, []);

  const visibleTime = Math.floor(timeSinceOpen / 1000);
  return visibleTime;
}

export default useTimer;
