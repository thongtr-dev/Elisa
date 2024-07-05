import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveTakingExam } from "../slices/authSlice";

const CountdownTimer = ({ submitHandler }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const initialTime = userInfo?.taking?.timeLeft ?? 3600;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    setTimeLeft(userInfo?.takingExam?.timeLeft ?? 3600);
  }, [userInfo]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 0) {
          clearInterval(timer);
          return 0;
        }
        const newTimeLeft = prevTimeLeft - 1;
        dispatch(
          saveTakingExam({
            ...userInfo,
            takingExam: { ...userInfo?.takingExam, timeLeft: newTimeLeft },
          })
        );
        return newTimeLeft;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch, userInfo, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      submitHandler();
    }
  }, [timeLeft]);

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
