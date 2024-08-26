import React, { useState, useEffect} from "react";
import "./Clock.css";

// Create an instance of the Audio object with the path to your audio file
const alarmSound = new Audio('/sounds/AlarmSound.mp3'); // Path relative to the public directory

function Clock() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Convert seconds to mm:ss format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Start or stop the timer
  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(intervalId);
      setIsRunning(false);
    } else {
      const id = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      setIntervalId(id);
      setIsRunning(true);
    }
  };

  // Reset the timer
  const handleReset = () => {
    clearInterval(intervalId);
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setTimerLabel("Session");
    alarmSound.pause();
    alarmSound.currentTime = 0;
  };

  // Increment and decrement functions
  const incrementBreak = () => {
    if (breakLength < 60) setBreakLength(breakLength + 1);
  };

  const decrementBreak = () => {
    if (breakLength > 1) setBreakLength(breakLength - 1);
  };

  const incrementSession = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft((sessionLength + 1) * 60);
    }
  };

  const decrementSession = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft((sessionLength - 1) * 60);
    }
  };

  useEffect(() => {
    if (timeLeft === 0) {
      alarmSound.play();
      clearInterval(intervalId);
      setIsRunning(false);

      if (timerLabel === "Session") {
        setTimerLabel("Break");
        setTimeLeft(breakLength * 60);
      } else {
        setTimerLabel("Session");
        setTimeLeft(sessionLength * 60);
      }
    }
  }, [timeLeft, breakLength, sessionLength, timerLabel, intervalId]);

  return (
    <div id="clock">
      <div id="break">
        <h2 id="break-label">Break Length</h2>
        <button id="break-decrement" onClick={decrementBreak}>-</button>
        <span id="break-length">{breakLength}</span>
        <button id="break-increment" onClick={incrementBreak}>+</button>
      </div>
      <div id="session">
        <h2 id="session-label">Session Length</h2>
        <button id="session-decrement" onClick={decrementSession}>-</button>
        <span id="session-length">{sessionLength}</span>
        <button id="session-increment" onClick={incrementSession}>+</button>
      </div>
      <div id="timer">
        <h2 id="timer-label">{timerLabel}</h2>
        <span id="time-left">{formatTime(timeLeft)}</span>
      </div>
      <div id="controls">
        <button id="start_stop" onClick={handleStartStop}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button id="reset" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Clock;
