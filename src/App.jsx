import "./App.css";
import {useState, useEffect} from "react";
const start = Date.now();
function App() {
  const [timeSinceOpen, setTimeSinceOpen] = useState(0);
  useEffect(() => {
    const time = 1000;

    setInterval(() => {
      setTimeSinceOpen((time) => time + 1000);
    }, time);

    return () => {};
  }, []);
  const visibleTime = Math.floor(timeSinceOpen / 5000);
  return (
    <div>
      {Math.floor(visibleTime / 60)}:{visibleTime % 60}
    </div>
  );
}

export default App;
