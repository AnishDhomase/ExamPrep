import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import Button from "./Utility/Button";
import getCurrentyear from "./Utility/getCurrentyear";

const NumOfQuestionsOptions = [10, 15, 20];
const DifficultyLevelOptions = ["Easy", "Medium", "Hard"];

CustomizePage.propTypes = {
  dispatch: PropTypes.func,
  numOfQuestions: PropTypes.number,
  difficultyLevel: PropTypes.string,
  subject: PropTypes.number,
  candidateName: PropTypes.string,
  subjects: PropTypes.array,
};

function CustomizePage({
  dispatch,
  numOfQuestions,
  difficultyLevel,
  subject,
  candidateName,
  subjects,
}) {
  // console.log("⚡⚡⚡CustomizePage Render");
  return (
    <div className="Box">
      <div className="BoxInnner customQuiz">
        <h1>
          <span>Now,</span> <span>Customize Test</span>
        </h1>

        <div className="selectBox">
          <label>No. of Questions</label>
          <select
            value={numOfQuestions}
            onChange={(ev) =>
              dispatch({
                type: "numOfQuestionsChange",
                payload: Number(ev.target.value),
              })
            }
          >
            {NumOfQuestionsOptions.map((size, index) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="selectBox">
          <label>Difficulty Level</label>
          <select
            value={difficultyLevel}
            onChange={(ev) =>
              dispatch({
                type: "difficultyLevelChange",
                payload: ev.target.value,
              })
            }
          >
            {DifficultyLevelOptions.map((lvl, index) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>

        <div className="btnBox">
          <NavLink to="/">
            <Button>Previous</Button>
          </NavLink>
          <NavLink to="/Quiz">
            <Button type="filled">Start Test</Button>
          </NavLink>
        </div>

        <p>ExamPrep © {getCurrentyear()} | All rights reserved</p>
      </div>
    </div>
  );
}

export default CustomizePage;
