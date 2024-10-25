import { useState } from "react";
import { useAnswers, useAuth, useSurvey } from "../../Providers/Providers";
import PieChart from "../Graphic/PieChart";
import { Question } from "../../types/types";
import clienteAxios, { config } from "../../config/clienteAxios";
import { AxiosResponse } from "axios";

const LastSurvey = () => {
  const [typeQuestion, setTypeQuestion] = useState<string | null>(null);
  const [selectedQuestionState, setSelectedQuestionState] = useState<
    Question | undefined
  >(undefined);
  const { survey } = useSurvey();
  const { token } = useAuth();
  const { answers, setAnswers } = useAnswers();

  const handleSetTypeQuestion = async (id_question: string) => {
    const selectedQuestion: Question | undefined = survey?.questions.find(
      (item: Question) => item.id_question === id_question
    );
    if (selectedQuestion) {
      setTypeQuestion(selectedQuestion.type_question.id_type_question);
      setSelectedQuestionState(selectedQuestion);
      try {
        const configObj = config(token);
        const getAnswers: AxiosResponse = await clienteAxios.get(
          `/answer/get-answers?id_question=${selectedQuestion.id_question}`,
          configObj
        );
        if(getAnswers.status === 204){
          return;
        }
        setAnswers(getAnswers.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      setTypeQuestion(null);
      setSelectedQuestionState(undefined);
    }
  };

  // if(answers.length === 0) return (
  //    <p>Any answers yet</p>
  // )

  return (
    <div className="flex flex-col gap-5 md:flex-row">
      <div>
        <p>Questions:</p>
        <select
          name="Questions"
          id="question"
          className="bg-gray-200 p-2 rounded-md mt-4 w-1/2 md:w-3/4"
          onChange={(e) => handleSetTypeQuestion(e.target.value)}
        >
          <option value={""}>-- Select a question --</option>
          {survey?.questions.map((item: Question) => (
            <option key={item.id_question} value={item.id_question}>
              {item.question_text}
            </option>
          ))}
        </select>
      </div>
      {[
        "675aa799-c8ce-49ff-b783-2f401ae839e1",
        "ee2e80d2-e1b1-42a3-bc77-812e444f5c68",
      ].includes(typeQuestion || "") ? (
        <PieChart question={selectedQuestionState} /> // Pasamos la pregunta seleccionada (puede ser undefined)
      ) : (
        <>
          {answers.length === 0 ?(
            <p>Any answers yet</p>
          ) :(
            <div className="overflow-x-auto whitespace-nowrap">
            {answers.map((item) => (
              <div
                key={item.id_answer}
                className="inline-block border-4 border-blue-says p-2 min-w-max"
              >
                <p>User: {item.user.name}</p>
                <p>Answer: {item.answer}</p>
              </div>
            ))}
          </div>
          )}
        </>
      )}
    </div>
  );
};

export default LastSurvey;
