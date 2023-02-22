import React, { useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";

function CountdownTimer({ quizTimeLeft }) {
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds

  useEffect(() => {
    if (timeLeft === 0) return quizTimeLeft(false);

    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `Time Left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const progress = (timeLeft / 900) * 100;
  return (
    <div>
      <ProgressBar now={progress} label={formatTimeLeft()} />
    </div>
  );
}

export default CountdownTimer;
