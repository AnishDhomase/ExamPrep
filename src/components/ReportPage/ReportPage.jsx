import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { defaults } from "chart.js/auto";
import ChartComponent from "./ChartComponent";
import {
  useScroll,
  motion,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";

import { quizData } from "../../../data/quizData";
import Button from "../Utility/Button";

// const BASE_URL = "http://localhost:8000";

const SortByOpts = ["All", "Correct", "Incorrect", "Skipped"];

// ChartJS Chart Adaptiveness
defaults.maintainAspectRatio = false;
defaults.responsive = true;

ReportPage.propTypes = {
  subject: PropTypes.number,
  candidateName: PropTypes.string,
  numOfQuestions: PropTypes.number,
  difficultyLevel: PropTypes.string,
  choosedOptionsArr: PropTypes.array,
  subjects: PropTypes.array,
  dispatch: PropTypes.func,
};

function ReportPage({
  choosedOptionsArr,
  subject,
  candidateName,
  numOfQuestions,
  difficultyLevel,
  subjects,
  dispatch,
}) {
  // console.log("⚡⚡⚡Report page render");

  const [quesData, setQuesData] = useState([]);
  const [sortBy, setSortBy] = useState("Default");
  const [viewType, setViewType] = useState("Doughnut");

  const ref1 = useRef(null);
  const isInView1 = useInView(ref1, { once: true });
  const ref2 = useRef(null);
  const isInView2 = useInView(ref2, { once: true });
  const ref3 = useRef(null);
  const isInView3 = useInView(ref3, { once: true });

  // Set question data according to subject
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

  // Evalueation of choosen answers
  let evalueatedArr = [];
  for (let i = 0; i < numOfQuestions; i++) {
    if (choosedOptionsArr && quesData[i]) {
      if (
        choosedOptionsArr[i] === undefined ||
        choosedOptionsArr[i].optID === -1
      ) {
        evalueatedArr.push({
          quesID: i,
          choosed: "Skipped273",
          correctAns: quesData[i]?.answer,
        });
      } else {
        evalueatedArr.push({
          quesID: i,
          choosed: choosedOptionsArr[i].optName,
          correctAns: quesData[i]?.answer,
        });
      }
    }
  }
  // Conclusion of evalueation
  let skippedQues = 0;
  let correctQues = 0;
  let inCorrectQues = 0;
  for (let i = 0; i < numOfQuestions; i++) {
    if (evalueatedArr[i]) {
      if (evalueatedArr[i].choosed === "Skipped273") skippedQues++;
      else if (evalueatedArr[i].choosed === evalueatedArr[i].correctAns)
        correctQues++;
      else inCorrectQues++;
    }
  }

  // Get color code of ith question
  const copyOfEvlArr = evalueatedArr;
  function getClassName(i) {
    if (!copyOfEvlArr) return "";
    if (!copyOfEvlArr[i]) return "";
    if (copyOfEvlArr[i].choosed === "Skipped273") {
      return "";
    } else if (copyOfEvlArr[i].choosed === copyOfEvlArr[i].correctAns) {
      return "inCorrectt";
    }
    return "correctt";
  }

  // Set evaluated array according to sortBy
  if (sortBy === "Correct")
    evalueatedArr = evalueatedArr.filter(
      (opt, ind) => opt.choosed === opt.correctAns
    );
  else if (sortBy === "Incorrect")
    evalueatedArr = evalueatedArr.filter(
      (opt, ind) =>
        opt.choosed !== "Skipped273" && opt.choosed !== opt.correctAns
    );
  else if (sortBy === "Skipped")
    evalueatedArr = evalueatedArr.filter(
      (opt, ind) => opt.choosed === "Skipped273"
    );

  // Calculate test accuracy
  const accuracyPerc =
    correctQues === inCorrectQues
      ? 0
      : Math.ceil((correctQues / (correctQues + inCorrectQues)) * 100);

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress);

  const background = useTransform(
    scrollYProgress,
    [0, 1],
    ["rgb(86, 1, 245)", "rgb(1, 245, 13)"]
  );

  return (
    <div className="report">
      <motion.div
        className="pageScrollProgress"
        style={{
          scaleX,
          background,
        }}
      />
      <div className="reportNav">
        <NavLink to="/">
          <Button onBtnClick={() => dispatch({ type: "newTest" })}>
            New Test
          </Button>
        </NavLink>
        {/* <Button type="filled" onBtnClick={closeTab}>
          Exit
        </Button> */}
      </div>

      <motion.h1
        ref={ref1}
        className="title"
        style={{
          x: isInView1 ? 0 : -20,
          transition: "1s all",
        }}
      >
        Exam Report
      </motion.h1>

      <ChartComponent
        viewType={viewType}
        correctQues={correctQues}
        inCorrectQues={inCorrectQues}
        skippedQues={skippedQues}
        setViewType={setViewType}
      />

      <motion.h1
        ref={ref2}
        className="title"
        style={{
          x: isInView2 ? 0 : -20,
          transition: "1s all",
        }}
      >
        Score Card
      </motion.h1>

      <div className="scoreCard">
        <div className="scoreInner">
          <h2>
            <span>Correct</span> <span>{correctQues}</span>
          </h2>
          <h2>
            <span>Skipped</span>
            <span>{skippedQues}</span>{" "}
          </h2>
          <h2>
            <span>Incorrect</span>
            <span> {inCorrectQues}</span>
          </h2>
          <h2>
            <span>Total</span>
            <span>{numOfQuestions}</span>
          </h2>
        </div>
        <h2 className="acc">Accuracy {accuracyPerc}%</h2>
      </div>

      <motion.h1
        ref={ref3}
        className="title"
        style={{
          x: isInView3 ? 0 : -20,
          transition: "1s all",
        }}
      >
        Question Overview
      </motion.h1>

      <div className="tableBox">
        <div className="sort">
          <div className="selectBox">
            <label>Sort By</label>
            <select
              value={sortBy}
              onChange={(ev) => setSortBy(ev.target.value)}
            >
              {SortByOpts.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="table">
          <div className="row head">
            <span>Sr</span>
            <span>Que</span>
            <span>Selected Option</span>
            <span>Correct Option</span>
          </div>
          {evalueatedArr.map((obj, ind) => (
            <div key={obj.quesID} className={`row ${getClassName(obj.quesID)}`}>
              <span>{ind + 1}</span>
              <span>{obj.quesID + 1}</span>
              <span>
                {obj.choosed === "Skipped273" ? "Skipped" : obj.choosed}
              </span>
              <span>{obj.correctAns}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReportPage;
