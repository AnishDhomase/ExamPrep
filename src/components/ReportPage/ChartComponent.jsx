import { Bar, Doughnut } from "react-chartjs-2";
import PropTypes from "prop-types";

import Button from "../Utility/Button";
import { memo } from "react";

const ChartComponent = memo(function ChartComponent({
  viewType,
  correctQues,
  inCorrectQues,
  skippedQues,
  setViewType,
}) {
  // console.log("⚡⚡ChartComponent Render");
  return (
    <div className="chart">
      <div className="chartgraph">
        {viewType === "Doughnut" ? (
          <Doughnut
            data={{
              labels: ["Correct", "Incorrect", "Skipped"],
              datasets: [
                {
                  label: "Answers",
                  data: [correctQues, inCorrectQues, skippedQues],
                  backgroundColor: [
                    "rgb(57, 208, 77)",
                    "rgb(253, 60, 60)",
                    "rgb(215, 205, 205)",
                  ],
                  borderRadius: 5,
                },
              ],
            }}
          />
        ) : (
          <Bar
            data={{
              labels: ["Correct", "Incorrect", "Skipped"],
              datasets: [
                {
                  label: "Answers",
                  data: [correctQues, inCorrectQues, skippedQues],
                  backgroundColor: [
                    "rgb(57, 208, 77)",
                    "rgb(253, 60, 60)",
                    "rgb(215, 205, 205)",
                  ],
                  borderRadius: 5,
                },
              ],
            }}
          />
        )}
      </div>
      <Button
        type="filled"
        onBtnClick={() =>
          setViewType(viewType === "Doughnut" ? "Bar" : "Doughnut")
        }
      >
        Change View
      </Button>
    </div>
  );
});

ChartComponent.propTypes = {
  viewType: PropTypes.string,
  correctQues: PropTypes.number,
  inCorrectQues: PropTypes.number,
  skippedQues: PropTypes.number,
  setViewType: PropTypes.func,
};

export default ChartComponent;
