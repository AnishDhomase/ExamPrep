import PropTypes from "prop-types";
import Header from "./Header";
import Question from "./Question";
import Summary from "./Summary";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const BASE_URL = "http://localhost:8000";

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
  const [quesData, setQuesData] = useState([]);
  const [activeQues, setActiveQues] = useState(0);
  const [testTime, setTestTime] = useState(function () {
    let tt = numOfQuestions;
    if (difficultyLevel === "Easy") return (tt *= 45);
    if (difficultyLevel === "Medium") return (tt *= 30);
    return (tt *= 20);
  });

  useEffect(
    function () {
      async function _fetchdata() {
        try {
          const res = await fetch(`${BASE_URL}/quiz`);
          const data = await res.json();
          if (subject === 0) setQuesData(data.science);
          else if (subject === 1) setQuesData(data.geography);
          else if (subject === 2) setQuesData(data.history);
          else if (subject === 3) setQuesData(data.reactjs);
          else setQuesData(data.javascript);
        } catch (er) {
          console.error(er.message);
        }
      }
      _fetchdata();
    },
    [subject]
  );
  const navigate = useNavigate();
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

  // console.log("QuizPage render");
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
          testTime={testTime}
        />
      </div>
    </div>
  );
}

export default QuizPage;
