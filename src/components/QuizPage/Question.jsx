import { useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../Utility/Button";

import PropTypes from "prop-types";

let speech = new SpeechSynthesisUtterance();

Question.propTypes = {
  quesData: PropTypes.array,
  activeQues: PropTypes.number,
  totalQues: PropTypes.number,
  setActiveQues: PropTypes.func,
  dispatch: PropTypes.func,
  choosedOptionsArr: PropTypes.array,
  BookmarkedArr: PropTypes.array,
};

function Question({
  quesData,
  activeQues,
  setActiveQues,
  totalQues,
  dispatch,
  choosedOptionsArr,
  BookmarkedArr,
}) {
  // console.log("⚡⚡Question Render");

  // TODO: useEffect dependency eslint
  // Choose Option
  useEffect(
    function () {
      if (
        choosedOptionsArr[activeQues] &&
        choosedOptionsArr[activeQues].optID !== -1
      )
        return;
      dispatch({
        type: "updateChoosenOption",
        payload: { quesID: activeQues, optID: -1 },
      });
    },
    [activeQues, dispatch]
  );

  const quesDescription = quesData[activeQues]?.question;
  const quesOptions = quesData[activeQues]?.options;
  const percentageQuesPosition = Math.ceil(
    ((activeQues + 1) / totalQues) * 100
  );

  const percentageQuesPositionStr = percentageQuesPosition + "%";

  // Text to Voice
  function speak() {
    speech.text = quesDescription;
    window.speechSynthesis.speak(speech);
  }

  return (
    <motion.div
      className="question"
      initial={window.innerWidth > 774 && { x: "-120vw" }}
      animate={window.innerWidth > 774 && { x: 0 }}
      transition={window.innerWidth > 774 && { duration: 1 }}
    >
      <div className="quesStatus">
        <h3>
          Question {activeQues + 1} of {totalQues}
        </h3>

        <div className="progressBar">
          <motion.div
            className="val"
            initial={{ width: percentageQuesPositionStr }}
            animate={{ width: percentageQuesPositionStr }}
            transition={{ duration: 1, ease: "backInOut" }}
            // style={{ width: percentageQuesPositionStr }}
          ></motion.div>
        </div>
      </div>

      <div className="quesDesc">
        <h3>{quesDescription}</h3>
        <motion.i
          className="fa-solid fa-volume-high"
          onClick={speak}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95, rotate: "5deg" }}
        ></motion.i>
      </div>

      <ul className="options">
        {quesOptions?.map((op, id) => (
          <li
            className={
              choosedOptionsArr[activeQues]?.optID === id && "selected"
            }
            key={op}
            onClick={() =>
              dispatch({
                type: "updateChoosenOption",
                payload:
                  choosedOptionsArr[activeQues]?.optID === id
                    ? { quesID: activeQues, optID: -1 }
                    : { quesID: activeQues, optID: id, optName: op },
              })
            }
          >
            {op}
          </li>
        ))}
      </ul>

      <div className="quesBtnBox">
        {activeQues !== 0 && (
          <Button
            type="filled"
            onBtnClick={() => setActiveQues(activeQues - 1)}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </Button>
        )}

        <Button
          onBtnClick={() =>
            dispatch({ type: "bookmarkQues", payload: activeQues })
          }
        >
          <i
            className={`fa-${
              BookmarkedArr[activeQues] === "booked" ? "solid" : "regular"
            } fa-bookmark`}
          ></i>
        </Button>

        {activeQues !== totalQues - 1 && (
          <Button
            type="filled"
            onBtnClick={() => setActiveQues(activeQues + 1)}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </Button>
        )}
      </div>
    </motion.div>
  );
}

export default Question;
