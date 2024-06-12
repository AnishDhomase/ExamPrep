import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import Button from "./Utility/Button";

const d = new Date();
let year = d.getFullYear();

HomePage.propTypes = {
  dispatch: PropTypes.func,
  subject: PropTypes.number,
  candidateName: PropTypes.string,
  subjects: PropTypes.array,
  numOfQuestions: PropTypes.number,
  difficultyLevel: PropTypes.string,
};

function HomePage({
  dispatch,
  subject,
  candidateName,
  subjects,
  numOfQuestions,
  difficultyLevel,
}) {
  console.log("Homepage render");

  return (
    <div className="Box">
      <div className="BoxInnner home">
        <h1>
          <span>Welcome,</span> <span>Start Practice!</span>
        </h1>
        <input
          type="text"
          placeholder="Candidate Name"
          value={candidateName}
          onChange={(ev) =>
            dispatch({ type: "candidateNameChange", payload: ev.target.value })
          }
        />
        <div className="selectBox">
          <label>Subject Name</label>
          <select
            value={subject}
            onChange={(ev) =>
              dispatch({
                type: "subjectNameChange",
                payload: Number(ev.target.value),
              })
            }
          >
            {subjects.map((subject, index) => (
              <option key={subject} value={index}>
                {subject}
              </option>
            ))}
          </select>
        </div>
        <NavLink to="Customize">
          <Button type="filled">Next</Button>
        </NavLink>
        <p>ExamPrep © {year} | All rights reserved</p>
      </div>
    </div>
  );
}

export default HomePage;
