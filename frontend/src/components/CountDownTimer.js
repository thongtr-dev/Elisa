import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveTakingExamTimeLeft } from "../slices/authSlice";

const CountdownTimer = ({ submitHandler }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const initialTime = userInfo?.timeLeft ?? 60 * 60;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (userInfo && userInfo.timeLeft) {
      setTimeLeft(userInfo.timeLeft);
    }
  }, [userInfo]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        const newTimeLeft = Math.max(prevTimeLeft - 1, 0);
        dispatch(saveTakingExamTimeLeft({ timeLeft: newTimeLeft }));
        return newTimeLeft;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);

  useEffect(() => {
    if (timeLeft === 0) {
      dispatch(saveTakingExamTimeLeft({ timeLeft: 0 }));
      submitHandler();
    }
  }, [timeLeft, dispatch, submitHandler]);

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
