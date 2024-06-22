import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { quizData } from "../../../data/quizData";
import Header from "./Header";
import Question from "./Question";
import Summary from "./Summary";

QuizPage.propTypes = {
  dispatch: PropTypes.func,
  subject: PropTypes.number,
  candidateName: PropTypes.string,
  difficultyLevel: PropTypes.string,
  numOfQuestions: PropTypes.number,
  subjects: PropTypes.array,
  choosedOptionsArr: PropTypes.array,
  BookmarkedArr: PropTypes.array,
};

// const BASE_URL = "http://localhost:8000";

function QuizPage({
  difficultyLevel,
  numOfQuestions,
  candidateName,
  dispatch,
  subject,
  subjects,
  choosedOptionsArr,
  BookmarkedArr,
}) {
  console.log("⚡⚡⚡QuizPage render");

  const [quesData, setQuesData] = useState([]);
  const [activeQues, setActiveQues] = useState(0);

  // Set Questions according to subject
  useEffect(
    function () {
      // async function _fetchdata() {
      //   try {
      //     const res = await fetch(`${BASE_URL}/quiz`);
      //     const data = await res.json();
      //     if (subject === 0) setQuesData(data.science);
      //     else if (subject === 1) setQuesData(data.geography);
      //     else if (subject === 2) setQuesData(data.history);
      //     else if (subject === 3) setQuesData(data.reactjs);
      //     else setQuesData(data.javascript);
      //   } catch (er) {
      //     console.error(er.message);
      //   }
      // }
      // _fetchdata();

      if (subject === 0) setQuesData(quizData.quiz.science);
      else if (subject === 1) setQuesData(quizData.quiz.geography);
      else if (subject === 2) setQuesData(quizData.quiz.history);
      else if (subject === 3) setQuesData(quizData.quiz.reactjs);
      else setQuesData(quizData.quiz.javascript);
    },
    [subject]
  );

  return (
    <div className="quiz">
      <Header
        subjects={subjects}
        name={candidateName}
        subject={subject}
        numQues={numOfQuestions}
        lvl={difficultyLevel}
      />
      <div className="quesBox">
        <Question
          quesData={quesData}
          activeQues={activeQues}
          setActiveQues={setActiveQues}
          totalQues={numOfQuestions}
          dispatch={dispatch}
          choosedOptionsArr={choosedOptionsArr}
          BookmarkedArr={BookmarkedArr}
        />
        <Summary
          choosedOptionsArr={choosedOptionsArr}
          BookmarkedArr={BookmarkedArr}
          activeQues={activeQues}
          setActiveQues={setActiveQues}
          numOfQuestions={numOfQuestions}
          difficultyLevel={difficultyLevel}
          // testTime={testTime}
        />
      </div>
    </div>
  );
}

export default QuizPage;
