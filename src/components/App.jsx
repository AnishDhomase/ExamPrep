import { useReducer } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./HomePage";
import CustomizePage from "./CustomizePage";
import QuizPage from "./QuizPage/QuizPage";
import PageNotFound from "./PageNotFound";
import ReportPage from "./ReportPage/ReportPage";

const subjects = ["Science", "Geography", "History", "React", "Javascript"];

const initialState = {
  subject: 0,
  candidateName: "",
  numOfQuestions: 10,
  difficultyLevel: "Easy",
  choosedOptionsArr: Array.from(Array(10)),
  BookmarkedArr: new Array(10).fill("notBooked"),
};

function reducer(state, action) {
  switch (action.type) {
    case "candidateNameChange":
      return { ...state, candidateName: action.payload };
    case "subjectNameChange":
      return { ...state, subject: action.payload };
    case "numOfQuestionsChange":
      return {
        ...state,
        numOfQuestions: action.payload,
        choosedOptionsArr: Array.from(Array(action.payload)),
        BookmarkedArr: new Array(action.payload).fill("notBooked"),
      };
    case "difficultyLevelChange":
      return { ...state, difficultyLevel: action.payload };
    case "updateChoosenOption":
      return {
        ...state,
        choosedOptionsArr: state.choosedOptionsArr.map((op, index) =>
          index === action.payload.quesID
            ? action.payload.optID !== -1
              ? { optID: action.payload.optID, optName: action.payload.optName }
              : { optID: -1 }
            : op
        ),
      };
    case "bookmarkQues":
      return {
        ...state,
        BookmarkedArr: state.BookmarkedArr.map((op, index) =>
          index === action.payload
            ? op === "notBooked"
              ? "booked"
              : "notBooked"
            : op
        ),
      };
    default:
  }
}

function App() {
  // console.log("⚡⚡⚡⚡App render");

  const [
    {
      subject,
      candidateName,
      numOfQuestions,
      difficultyLevel,
      choosedOptionsArr,
      BookmarkedArr,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <HomePage
                dispatch={dispatch}
                subject={subject}
                candidateName={candidateName}
                subjects={subjects}
                numOfQuestions={numOfQuestions}
                difficultyLevel={difficultyLevel}
              />
            }
          />
          <Route
            path="Customize"
            element={
              <CustomizePage
                dispatch={dispatch}
                numOfQuestions={numOfQuestions}
                difficultyLevel={difficultyLevel}
                subject={subject}
                candidateName={candidateName}
                subjects={subjects}
              />
            }
          />
          <Route
            path="Quiz"
            element={
              <QuizPage
                dispatch={dispatch}
                subject={subject}
                candidateName={candidateName}
                numOfQuestions={numOfQuestions}
                difficultyLevel={difficultyLevel}
                subjects={subjects}
                choosedOptionsArr={choosedOptionsArr}
                BookmarkedArr={BookmarkedArr}
              />
            }
          />
          <Route
            path="Report"
            element={
              <ReportPage
                choosedOptionsArr={choosedOptionsArr}
                subject={subject}
                candidateName={candidateName}
                numOfQuestions={numOfQuestions}
                difficultyLevel={difficultyLevel}
                subjects={subjects}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
