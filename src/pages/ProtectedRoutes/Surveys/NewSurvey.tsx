import { useEffect, useState } from "react";
import PrevSurbey from "../../../components/Dashboard/PrevSurbey";
import { Topics } from "../../../types/types";
import { PrevQuestion } from "../../../components/NewSurvey/PrevQuestion";
import { ModalCreateQuestion } from "../../../components/NewSurvey/ModalCreateQuestion";
import { useQuestion } from "../../../Providers/Providers";
import clienteAxios from "../../../config/clienteAxios";
import { AxiosError, AxiosResponse } from "axios";

const NewSurvey = () => {
  const [questions, setQuestions] = useState([]);
  const [isOpen, setIsopen] = useState(false);

  const { setTypesQuestion, newQuestions } = useQuestion();

  const handleSelectValue = (topic: string) => {
    // setSelectedTopic(topic); // Puedes manejar el valor seleccionado aquí
    console.log("Selected topic:", topic); // Para fines de depuración
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(e.target.value);

    // Controlar que el número no supere 1000
    if (!isNaN(inputValue) && inputValue <= 1000) {
      // setValue(inputValue);
    } else if (e.target.value === "") {
      // setValue(""); // Permitir borrar el valor
    }
  };

  const onClose = () => {
    setIsopen(!isOpen);
  };

  useEffect(() => {
    const getTypesQuestion = async () => {
      try {
        const typesQuestions: AxiosResponse = await clienteAxios.get(
          "/type-questions/get-types"
        );
        setTypesQuestion(typesQuestions.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.message);
        }
        console.log(error);
      }
    };
    getTypesQuestion();
  }, []);

  return (
    <div className="p-10">
      <article>
        <h2 className="text-2xl font-bold">Last Templates</h2>
        <section>
          <ul
            className="flex gap-4 overflow-x-auto p-5 mt-5"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <li>
              <PrevSurbey />
            </li>
          </ul>
        </section>
      </article>
      <article className="mt-20 border-t-2 border-blue-says">
        <h2 className="text-2xl font-bold mt-4">New Template</h2>
        <section>
          <form className="flex flex-col gap-4 md:justify-center md:items-center">
            <label className="font-bold">Topic</label>
            <select
              name="topic"
              id="topic"
              onChange={(e) => handleSelectValue(e.target.value)}
              className="bg-blue-says text-white p-2 rounded-lg text-center"
            >
              <option value={""}>-- Select a Topic --</option>
              {Object.keys(Topics).map((key) => (
                <option key={key} value={key}>
                  {Topics[key as keyof typeof Topics]}{" "}
                </option>
              ))}
            </select>
            <div className="block md:flex md:gap-2 md:w-3/4">
              <div className="flex flex-col gap-2 justify-center items-center w-full">
                <label className="font-semibold">Title</label>
                <input
                  type="text"
                  className="bg-blue-says rounded-lg p-2 text-white text-center w-1/2"
                  max={100}
                  placeholder="Title Form"
                />
              </div>
              <div className="flex flex-col gap-2 justify-center items-center w-full">
                <label className="font-semibold">Number of users</label>
                <input
                  type="number"
                  className="bg-blue-says rounded-lg p-2 text-white text-center w-1/2"
                  max={1000}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-2xl font-bold">Questions</p>
              {newQuestions.length > 0 && (
                <p>Number of Questions: {newQuestions.length}</p>
              )}
              <div className="overflow-x-auto">
                <ul className="flex gap-4">
                  {newQuestions.map((item, index) => (
                    <li key={index}>
                      <PrevQuestion question={item} />
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className="p-2 bg-blue-says rounded-lg text-white font-semibold"
                onClick={onClose}
              >
                Add Question
              </button>
            </div>
          </form>
        </section>
      </article>
      <ModalCreateQuestion isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default NewSurvey;
