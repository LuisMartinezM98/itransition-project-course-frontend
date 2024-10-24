import { useEffect, useState } from "react";
import { useQuestion } from "../../Providers/Providers";
import { newQuestion } from "../../types/types";

interface PrevQuestionProps {
  question: newQuestion;
}

export const PrevQuestion = ({question}: PrevQuestionProps) => {

  const [typeQuestionState, setTypeQuestionState] = useState('');

  const { typesQuestion, newQuestions, setNewQuestions } = useQuestion();

  useEffect(() => {
    const foundType = typesQuestion.find(
      (type) => type.id_type_question === question.type_question
    );
    if(foundType){
      setTypeQuestionState(foundType.type_question)
    }else{
      setTypeQuestionState("Uknown");
    }
  },[question.type_question, typesQuestion])

  const handleDeleteQustion = (item: newQuestion) => {
    const updateQuestions = newQuestions.filter(
      (option) => option !== item
    );
    setNewQuestions(updateQuestions)
  }

  return (
    <div className="py-2 bg-gray-100 px-4 border-4 border-blue-says rounded-lg">
      <p className="text-blue-says font-semibold">{question.question}</p>
      <p>Type: {typeQuestionState}</p>
      {question.options && question.options.length > 0 && (
        <p>Options: {question.options?.length}</p>
      )}
      <div className="flex flex-col gap-2 mt-2">
        <p className="underline text-red-600 cursor-pointer" onClick={() => handleDeleteQustion(question)}>Delete</p>
      </div>
    </div>
  );
};
