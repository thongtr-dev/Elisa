import { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    // Clean up timer when component unmounts
    return () => clearInterval(timer);
  }, []);

  // Format time into hours, minutes, and seconds
  const formatTime = (time) => {
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div>
      <p>{formatTime(timeLeft)}</p>
      {timeLeft <= 0 && <h2>Hết giờ làm bài!</h2>}
    </div>
  );
};

export default CountdownTimer;
