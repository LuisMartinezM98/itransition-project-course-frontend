import { useState } from "react";
import { useQuestion } from "../../Providers/Providers";
import { newOption } from "../../types/types";
import { ModalOption } from "./ModalOption";

interface ModalProps {
  isOpenOption: boolean;
  onCloseOption: () => void;
}

export const ModalPrevOptions = ({
  isOpenOption,
  onCloseOption,
}: ModalProps) => {

  const [isOpen, setIsOpen] = useState(false);
  const [optionState, setOptionState] = useState<newOption | null>(null);

  const { newOptions, setNewOptions } = useQuestion();

  const handleDelete = (item: newOption) => {
    const updatedOptions = newOptions.filter(
        (option) => option !== item
      );
      setNewOptions(updatedOptions);
  }

  const onCloseOptionEdit = () => {
    setIsOpen(!isOpen)
  }

  const handleEditOption = (item: newOption) => {
    setOptionState(item);
    onCloseOptionEdit();
  }


  if(!isOpenOption) return null;

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
        <p className="text-center font-semibold text-lg text-blue-says">
          Options
        </p>
        {newOptions.length === 0 && (
          <p className="text-center font-bold mt-2">There are no options to show</p>
        )}
        <ul className="mt-2">
          {newOptions.map((item) => (
            <li className="text-center flex flex-col gap-2 mb-2">
              <p>{item.option}{" "}</p>
              <div className="flex gap-4 items-center justify-center">
              <span className="underline text-blue-says cursor-pointer" onClick={() => handleEditOption(item)}>Edit</span>{" "}
              <span className="text-red-600 underline cursor-pointer" onClick={() => handleDelete(item)}>Delete</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ModalOption option={optionState} onCloseOption={onCloseOptionEdit} isOpenOption={isOpen}/>
    </div>
  );
};
