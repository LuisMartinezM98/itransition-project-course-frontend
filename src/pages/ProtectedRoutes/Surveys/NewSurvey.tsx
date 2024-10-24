import { useEffect, useState } from "react";
import PrevSurbey from "../../../components/Dashboard/PrevSurbey";
import { Topics } from "../../../types/types";
import { PrevQuestion } from "../../../components/NewSurvey/PrevQuestion";
import { ModalCreateQuestion } from "../../../components/NewSurvey/ModalCreateQuestion";
import { useQuestion } from "../../../Providers/Providers";
import clienteAxios from "../../../config/clienteAxios";
import { AxiosError, AxiosResponse } from "axios";
import { useAuth } from "../../../Providers/Providers";
import { config } from "../../../config/clienteAxios";

const NewSurvey = () => {
  const [isOpen, setIsopen] = useState(false);
  const [numberUsers, setNumberUsers] = useState(0);
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { setTypesQuestion, newQuestions } = useQuestion();

  const { token } = useAuth();

  const handleSelectValue = (topic: string) => {
    setTopic(topic);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(e.target.value);
    if (!isNaN(inputValue) && inputValue <= 1000) {
      setNumberUsers(inputValue);
    } else if (e.target.value === "") {
      setNumberUsers(0); 
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
  
  const handleCreateForm = async () => {
    if([topic, title, description].includes('')){
      alert('Please complete each input')
      return;
    }
    if(newQuestions.length === 0){
      alert('Please write some questions for this form');
      return;
    }
    try {

      const formData = {
        topic,
        title,
        description,
        newQuestions,
        numberUsers
      }

      const configObj = config(token)

      const form: AxiosResponse = await clienteAxios.post('/form/create-form',formData, configObj);

      setSuccessMessage(form.data.msg);

      setTimeout(() => {
        window.location.reload();
      }, 3000)

    } catch (error) {
      if(error instanceof AxiosError){
        return console.log('Error Axios', error)
      }
      return console.log(error)
    }
  }

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
        {successMessage.trim().length > 0 && (
          <div className="flex justify-center items-center">
          <span className="bg-green-600 text-white p-2 rounded-md my-4 text-center">
            {successMessage}
          </span>
        </div>
        )}
        <section>
          <form className="flex flex-col gap-4 md:justify-center md:items-center">
            <label className="font-bold">Topic</label>
            <select
              name="topic"
              id="topic"
              onChange={(e) => handleSelectValue(e.target.value)}
              className="bg-blue-says text-white p-2 rounded-lg text-center"
              value={topic}
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
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 justify-center items-center w-full">
                <label className="font-semibold">Number of users</label>
                <input
                  type="number"
                  className="bg-blue-says rounded-lg p-2 text-white text-center w-1/2"
                  max={1000}
                  value={numberUsers}
                  placeholder="0"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center w-full">
                <label className="font-semibold">Description</label>
                <input
                  type="text"
                  className="bg-blue-says rounded-lg p-2 text-white text-center w-1/2"
                  max={100}
                  placeholder="Description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
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
              <button onClick={handleCreateForm}type="button" className="p-2 bg-green-600 rounded-lg text-white font-semibold">Create Form</button>
            </div>
          </form>
        </section>
      </article>
      <ModalCreateQuestion isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default NewSurvey;
