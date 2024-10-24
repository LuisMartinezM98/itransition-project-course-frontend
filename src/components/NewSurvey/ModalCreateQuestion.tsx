import { useState, useEffect } from "react";
import { useQuestion } from "../../Providers/Providers";
import { ModalOption } from "./ModalOption";
import { ModalPrevOptions } from "./ModalPrevOptions";
import { newQuestion } from "../../types/types";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalCreateQuestion = ({ isOpen, onClose }: ModalProps) => {
  const [typeQuestion, setTypeQuestion] = useState("");
  const [isOpenOption, setIsOpenOption] = useState(false);
  const [isOpenPrevOption, setIsOpenPrevOption] = useState(false);
  const [questionText, setQuestionText] = useState("");

  const { typesQuestion, newOptions, newQuestions, setNewQuestions, setNewOptions } = useQuestion();

  useEffect(() => {
    if (typeQuestion === "") {
      setQuestionText("");
    }
  }, [typeQuestion]);

  const handleChangeTypeQuestion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeQuestion(e.target.value);
  };

  const onCloseOption = () => {
    setIsOpenOption(!isOpenOption);
  };

  const onClosePrevOption = () => {
    setIsOpenPrevOption(!isOpenPrevOption);
  };

  const handleCreateQuestion = () => {
    if (questionText.trim().length > 0) {
      const newQuestion: newQuestion = {
        question: questionText,
        type_question: typeQuestion,
        options: newOptions
      };
      const updatedQuestions = [...newQuestions, newQuestion];
      setNewQuestions(updatedQuestions);
      setNewOptions([]);
      setQuestionText('');
      setTypeQuestion("")
      onClose();
    } else {
      console.warn("Question text cannot be empty.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-center text-blue-says font-bold text-xl">Create Question</p>
        <div className="flex flex-col gap-2 mt-4">
          <label htmlFor="types_question" className="font-semibold">
            Type Question
          </label>
          <select
            name="type_question"
            id="type_question"
            className="bg-blue-says text-white p-2 rounded-lg"
            value={typeQuestion} // Ensure controlled component
            onChange={handleChangeTypeQuestion}
          >
            <option value="">-- Select a Type Question --</option>
            {typesQuestion.map((item) => (
              <option key={item.id_type_question} value={item.id_type_question}>
                {item.type_question}
              </option>
            ))}
          </select>
          
          {["675aa799-c8ce-49ff-b783-2f401ae839e1", "ee2e80d2-e1b1-42a3-bc77-812e444f5c68"].includes(typeQuestion) ? (
            <div className="flex flex-col gap-2">
              <label htmlFor="Question" className="font-semibold">Question:</label>
              <input
                type="text"
                maxLength={100}
                className="p-2 bg-gray-100 rounded-lg"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)} // Controlled input
              />
              {newOptions.length > 0 ? (
                <div>
                  <p>
                    Options: {newOptions.length}{" "}
                    <span className="underline text-blue-says cursor-pointer" onClick={onClosePrevOption}>
                      See Options
                    </span>
                  </p>
                </div>
              ) : (
                <p>No options for this question yet.</p>
              )}
              <button
                type="button"
                className="p-2 bg-blue-says rounded-lg text-white font-semibold mt-4"
                onClick={onCloseOption}
              >
                Add Option
              </button>
              <button
                type="button"
                className="p-2 bg-blue-says rounded-lg text-white font-semibold mt-4"
                onClick={handleCreateQuestion}
              >
                Save Question
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <label htmlFor="Question" className="font-semibold">Question:</label>
              <input
                type="text"
                maxLength={100}
                className="p-2 bg-gray-100 rounded-lg"
                value={questionText} // Controlled input
                onChange={(e) => setQuestionText(e.target.value)} // Controlled input
              />
              <button
                type="button"
                className="p-2 bg-blue-says rounded-lg text-white font-semibold mt-4"
                onClick={handleCreateQuestion}
              >
                Save Question
              </button>
            </div>
          )}
        </div>
      </div>
      <ModalOption isOpenOption={isOpenOption} onCloseOption={onCloseOption} />
      <ModalPrevOptions isOpenOption={isOpenPrevOption} onCloseOption={onClosePrevOption} />
    </div>
  );
};
