import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

Timer.propTypes = {
  numOfQuestions: PropTypes.number,
  difficultyLevel: PropTypes.string,
};

function Timer({ numOfQuestions, difficultyLevel }) {
  //   console.log("Timer Render");
  const [testTime, setTestTime] = useState(function () {
    let tt = numOfQuestions;
    if (difficultyLevel === "Easy") return tt * 45;
    if (difficultyLevel === "Medium") return tt * 30;
    return tt * 20;
  });
  const navigate = useNavigate();

  // Test Timer
  useEffect(
    function () {
      const TimeItrvlID = setInterval(function () {
        if (testTime === 0) {
          clearInterval(TimeItrvlID);
          navigate("/Report");
          return;
        }
        setTestTime(testTime - 1);
      }, 1000);

      return function () {
        clearInterval(TimeItrvlID);
      };
    },
    [testTime, navigate]
  );
  const minLeft = Math.floor(testTime / 60);
  const secLeft = testTime % 60;

  return (
    <span>
      {minLeft < 10 && "0"}
      {minLeft} : {secLeft < 10 && "0"}
      {secLeft}
    </span>
  );
}

export default Timer;
