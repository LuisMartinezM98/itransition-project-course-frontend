import { PieChart as MUIPieChart } from "@mui/x-charts/PieChart";
import type { Question, Answer } from "../../types/types";
import { useAnswers } from "../../Providers/Providers";
import { useMediaQuery } from "@mui/material"; 

interface PieChartProps {
  question?: Question;
}

const PieChart = ({ question }: PieChartProps) => {
  const { answers } = useAnswers();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  if (!question) {
    return <p>No question selected</p>;
  }

  const filteredAnswers = answers.filter(
    (answer: Answer) => answer.question_id === question.id_question
  );

  const optionCounts = question.options.map((option) => {
    const count = filteredAnswers.filter(
      (answer: Answer) => answer.option_id === option.id_option
    ).length;

    return {
      id: option.id_option,
      label: option.option_text,
      value: count,
    };
  });

  const totalAnswers = optionCounts.reduce((acc, option) => acc + option.value, 0);

  if (totalAnswers === 0) {
    return <p>Any answers yet</p>;
  }

  const chartWidth = isSmallScreen ? 350 : 400;
  const chartHeight = isSmallScreen ? 150 : 200;

  return (
    // <div style={{ padding: '16px' }}> {/* Añadimos padding al contenedor */}
      <MUIPieChart
        series={[
          {
            data: optionCounts,
          },
        ]}
        width={chartWidth}
        height={chartHeight}
      />
    // </div>
  );
};

export default PieChart;
