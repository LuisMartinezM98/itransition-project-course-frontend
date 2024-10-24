import { useEffect, useState } from "react";
import { useQuestion } from "../../Providers/Providers";
import { newQuestion } from "../../types/types";

interface PrevQuestionProps {
  question: newQuestion;
}

export const PrevQuestion = ({question}: PrevQuestionProps) => {

  const [typeQuestionState, setTypeQuestionState] = useState('');

  const { typesQuestion } = useQuestion();

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

  return (
    <div className="py-2 bg-gray-100 px-4 border-4 border-blue-says rounded-lg">
      <p className="text-blue-says font-semibold">{question.question}</p>
      <p>Type: {typeQuestionState}</p>
      {question.options && question.options.length > 0 && (
        <p>Options: {question.options?.length}</p>
      )}
    </div>
  );
};
