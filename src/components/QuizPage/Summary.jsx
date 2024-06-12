import { NavLink } from "react-router-dom";
import Button from "../Utility/Button";
import PropTypes from "prop-types";

const quesStatusArr = [
  { stat: "Not Visited", className: "notVisited" },
  { stat: "Answered", className: "answered" },
  { stat: "Not Answered", className: "notAnswered" },
  { stat: "Marked", className: "marked" },
];

Summary.propTypes = {
  choosedOptionsArr: PropTypes.array,
  BookmarkedArr: PropTypes.array,
  activeQues: PropTypes.number,
  setActiveQues: PropTypes.func,
  testTime: PropTypes.number,
};

function Summary({
  choosedOptionsArr,
  BookmarkedArr,
  activeQues,
  setActiveQues,
  testTime,
}) {
  // const numOfQues = choosedOptionsArr.length();
  const minLeft = Math.floor(testTime / 60);
  const secLeft = testTime % 60;
  return (
    <div className="summary">
      <div className="submit">
        <NavLink to="/Report">
          <Button type="filled">Submit Test</Button>
        </NavLink>
        <span>
          {minLeft < 10 && "0"}
          {minLeft} : {secLeft < 10 && "0"}
          {secLeft}
        </span>
      </div>
      <div className="quesWindow">
        {choosedOptionsArr?.map((elem, index) => (
          <h3
            onClick={() => setActiveQues(index)}
            key={index}
            className={`quesStatus ${
              !elem ? "" : elem?.optID === -1 ? "notAnswered" : "answered"
            } ${BookmarkedArr[index] === "booked" && "marked"} ${
              activeQues === index && "active"
            }`}
          >
            {index + 1 < 10 && "0"}
            {index + 1}
          </h3>
        ))}
      </div>
      <div className="quesStatusNote">
        {quesStatusArr.map((option, i) => (
          <div key={i} className="quesStatusItem">
            <h3 className={`quesStatus ${option.className}`}>07</h3>
            <h5>{option.stat}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Summary;
