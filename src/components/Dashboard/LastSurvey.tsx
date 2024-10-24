import {  useState } from "react";
import { useAuth, useSurvey } from "../../Providers/Providers";
import PieChart from "../Graphic/PieChart";
import { Question } from "../../types/types";
import clienteAxios, { config } from "../../config/clienteAxios";
import { AxiosResponse } from "axios";

const LastSurvey = () => {
  const [typeQuestion, setTypeQuestion] = useState<string | null>(null);
  const [selectedQuestionState, setSelectedQuestionState] = useState<Question | undefined>(undefined);
  const { survey } = useSurvey();
  const { token } = useAuth();

  const handleSetTypeQuestion = async (id_question: string) => {
    const selectedQuestion: Question | undefined = survey?.questions.find(
      (item: Question) => item.id_question === id_question
    );
    if (selectedQuestion) {
      setTypeQuestion(selectedQuestion.type_question.id_type_question);
      setSelectedQuestionState(selectedQuestion);
      try {
        const configObj = config(token);
        const getAnswers: AxiosResponse = await clienteAxios.get(`/answer/get-answers?id_question=${selectedQuestion.id_question}`, configObj);
        console.log(getAnswers);
      } catch (error) {
        console.log(error);
      }
    } else {
      setTypeQuestion(null);
      setSelectedQuestionState(undefined);
    }
  };

  return (
    <div className="flex">
      <div>
        <p>Questions:</p>
        <select
          name="Questions"
          id="question"
          className="bg-gray-200 p-2 rounded-md mt-4 w-1/2 md:w-3/4"
          onChange={(e) => handleSetTypeQuestion(e.target.value)} 
        >
          <option value={''}>-- Select a question --</option>
          {survey?.questions.map((item: Question) => (
            <option key={item.id_question} value={item.id_question}>
              {item.question_text}
            </option>
          ))}
        </select>
      </div>
      {["675aa799-c8ce-49ff-b783-2f401ae839e1", "ee2e80d2-e1b1-42a3-bc77-812e444f5c68"].includes(typeQuestion || '') ? (
        <PieChart question={selectedQuestionState} /> // Pasamos la pregunta seleccionada (puede ser undefined)
      ) : (
        <p>Open question</p>
      )}
    </div>
  );
};

export default LastSurvey;
