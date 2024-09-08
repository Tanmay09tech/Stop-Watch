import React, { useState, useEffect, useRef } from "react";

// Define the StopWatch component function.
function StopWatch() {

  // State to track whether the stopwatch is running or not.
  const [isRunning, setIsRunning] = useState(false);

  // State to track the elapsed time in milliseconds.
  const [elapsedTime, setElapsedTime] = useState(0);

  // Reference to store the interval ID for the timer.
  const intervalId = useRef(null);

  // Reference to store the start time of the stopwatch.
  const startTime = useRef(null);

  // useEffect hook to handle side effects related to the stopwatch.
  useEffect(() => {
    // If the stopwatch is running, set up an interval to update the elapsed time.
    if (isRunning) {
      intervalId.current = setInterval(() => {
        // Update the elapsed time based on the current time and start time.
        setElapsedTime(Date.now() - startTime.current);
      }, 10); // Update the elapsed time every 10 milliseconds.
    }

    // Cleanup function to clear the interval when the component is unmounted or `isRunning` changes.
    return () => {
      clearInterval(intervalId.current);
    };
  }, [isRunning]);

  // Function to start the stopwatch.
  function start() {
    setIsRunning(true); // Set `isRunning` to `true` to start the stopwatch.
    startTime.current = Date.now() - elapsedTime; // Calculate the start time considering any elapsed time.
  }

  // Function to stop the stopwatch.
  function stop() {
    setIsRunning(false); // Set `isRunning` to `false` to stop the stopwatch.
  }

  // Function to reset the stopwatch.
  function reset() {
    setElapsedTime(0); // Reset the elapsed time to `0`.
    setIsRunning(false); // Stop the stopwatch.
  }

  // Function to format the elapsed time into a human-readable string.
  function formatTime(time) {
    let hours=Math.floor(elapsedTime/(1000*60*60));//Calculate hours
    let minutes=Math.floor((elapsedTime/(1000*60))%60);//Calculate minutes
    let seconds=Math.floor((elapsedTime/1000)%60);//Calculate seconds
    let milliseconds=Math.floor((elapsedTime%1000)/10);//Calculate milliseconds

    // Format each unit to ensure it has two digits.
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    // Return the formatted time string.
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }

  // JSX to render the stopwatch component.
  return (
    <div className="stopwatch">
      {/* Heading for the stopwatch */}
      <h1 className="heading">Stop Watch</h1>
      {/* Display the formatted elapsed time */}
      <div className="display">
        {formatTime(elapsedTime)}
      </div>
      {/* Controls for starting, stopping, and resetting the stopwatch */}
      <div className="controls">
        <button onClick={start} className="start-button">Start</button>
        <button onClick={stop} className="stop-button">Stop</button>
        <button onClick={reset} className="reset-button">Reset</button>
      </div>
    </div>
  );
}

// Export the StopWatch component so it can be used in other parts of the application.
export default StopWatch;
