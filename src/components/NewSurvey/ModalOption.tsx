import { useState, useEffect } from "react";
import { useQuestion } from "../../Providers/Providers";
import type { newOption } from "../../types/types";

interface ModalProps {
  isOpenOption: boolean;
  onCloseOption: () => void;
  option?: newOption | null;
}

export const ModalOption = ({ isOpenOption, onCloseOption, option }: ModalProps) => {
  if (!isOpenOption) return null;

  const [optionText, setOptionText] = useState('');
  const { setNewOptions, newOptions } = useQuestion();

  useEffect(() => {
    if (option) {
      setOptionText(option.option);
    }
  }, [option]);

  const handleAddOption = () => {
    if (optionText.trim().length > 0) {
      const newOption: newOption = { option: optionText };
      const updatedOptions = [...newOptions, newOption];
      setNewOptions(updatedOptions);
      setOptionText('');
      onCloseOption();
    } else {
      console.warn("Option text cannot be empty.");
    }
  };

  const handleEditOption = () => {
    if (optionText.trim().length > 0 && option) {
      const updatedOptions = newOptions.map((opt) =>
        opt === option ? { ...opt, option: optionText } : opt
      );
      setNewOptions(updatedOptions);
      setOptionText('');
      onCloseOption();
    } else {
      console.warn("Option text cannot be empty.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={(e) => {
        e.stopPropagation();
        onCloseOption();
      }}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-lg font-bold">
          {option ? "Edit Option" : "Create Option"}
        </p>
        <div className="flex flex-col gap-2 mt-4">
          <input
            type="text"
            className="bg-gray-100 rounded-lg p-2"
            value={optionText}
            onChange={(e) => setOptionText(e.target.value)}
            placeholder="Enter a new option"
          />
          <button
            type="button"
            className="p-2 bg-blue-says rounded-lg text-white font-semibold mt-4"
            onClick={option ? handleEditOption : handleAddOption} 
          >
            {option ? "Edit Option" : "Add Option"}
          </button>
        </div>
      </div>
    </div>
  );
};
