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
};

function Summary({
  choosedOptionsArr,
  BookmarkedArr,
  activeQues,
  setActiveQues,
}) {
  // const numOfQues = choosedOptionsArr.length();
  return (
    <div className="summary">
      <div className="submit">
        <Button>Submit Test</Button>
        <span>05:00</span>
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
