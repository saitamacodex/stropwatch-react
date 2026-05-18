import { useRef, useState } from "react";
import "./watch.css";

function StopWatch() {
  const startTime = useRef<number>(0);
  const timerInterval = useRef<number | undefined>(undefined);
  const [elapsed, setElapsed] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);

  function handleStart() {
    clearInterval(timerInterval.current);
    setIsRunning(true);

    // record the current time
    startTime.current = Date.now() - elapsed;
    timerInterval.current = setInterval(() => {
      setElapsed(Date.now() - startTime.current);
    }, 50);
  }

  function handleStop() {
    clearInterval(timerInterval.current);
    setIsRunning(false);
  }

  function handleReset() {
    clearInterval(timerInterval.current);
    setElapsed(0);
    setIsRunning(false);
  }

  const hours = Math.floor(elapsed / (1000 * 60 * 60));
  const minute = Math.floor((elapsed / (1000 * 60)) % 60);
  const seconds = Math.floor((elapsed / 1000) % 60);
  const milliseconds = Math.floor((elapsed % 1000) / 10);

  const pad = function (n: number) {
    return String(n).padStart(2, "0");
  };

  return (
    <div className="app">
      <h1 className="title">⏱ Stopwatch</h1>

      <div id="container">
        <div id="display">
          <p>
            {pad(hours)}:{pad(minute)}:{pad(seconds)}:{pad(milliseconds)}
          </p>
        </div>

        <div id="control">
          {isRunning ? (
            <button id="stopBtn" onClick={handleStop}>
              Stop
            </button>
          ) : (
            <button id="startBtn" onClick={handleStart}>
              Start
            </button>
          )}

          <button id="resetBtn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default StopWatch;
