import { useEffect } from "react";
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
  console.log("⚡⚡Question Render");

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
    <div className="question">
      <div className="quesStatus">
        <h3>
          Question {activeQues + 1} of {totalQues}
        </h3>

        <div className="progressBar">
          <div
            className="val"
            style={{ width: percentageQuesPositionStr }}
          ></div>
        </div>
      </div>

      <div className="quesDesc">
        <h3>{quesDescription}</h3>
        <i className="fa-solid fa-volume-high" onClick={speak}></i>
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
    </div>
  );
}

export default Question;
