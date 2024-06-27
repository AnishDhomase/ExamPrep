import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import Button from "./Utility/Button";
import getCurrentyear from "./Utility/getCurrentyear";
import { grow } from "./Utility/animations/grow";
import { colorGreen } from "./Utility/animations/colorGreen";

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
  // console.log("⚡⚡⚡Homepage render");

  return (
    <div className="Box">
      <motion.div
        className="BoxInnner home"
        initial={grow.initial}
        animate={grow.animate}
        exit={grow.exit}
        transition={grow.transition}
      >
        <h1>
          <span>Welcome,</span>
          <motion.span
            animate={colorGreen.animate}
            transition={colorGreen.transition}
          >
            Start Practice!
          </motion.span>
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

        <p>ExamPrep © {getCurrentyear()} | All rights reserved</p>
      </motion.div>
    </div>
  );
}

export default HomePage;
