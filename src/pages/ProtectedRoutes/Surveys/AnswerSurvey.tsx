import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuth, useSurvey } from "../../../Providers/Providers";
import clienteAxios, { config } from "../../../config/clienteAxios";
import { AxiosResponse } from "axios";
import { QuestionSurvey } from "../../../components/Survey/QuestionSurvey";

const AnswerSurvey = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const { survey, setSurvey } = useSurvey();
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const [answers, setAnswers] = useState<
    { question_id: string; answer: any; type_question: string }[]
  >([]);

  const handleAnswerChange = (
    questionId: string,
    newAnswer: { answer: any; type_question: string; question_id: string }
  ) => {
    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (answer) => answer.question_id === questionId
      );
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = newAnswer;
        return updatedAnswers;
      }
      return [...prevAnswers, newAnswer];
    });
  };

  useEffect(() => {
    const getForm = async () => {
      try {
        const form: AxiosResponse = await clienteAxios.get(
          `/form/get-form?id_form=${id}`,
          config(token)
        );
        setSurvey(form.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (token && id) {
      getForm();
    }
  }, [id, token]);
  const sendSurvey = async () => {
    try {
      const response: AxiosResponse = await clienteAxios.post(
        "/answer/submit-answers",
        { formId: id, answers },
        config(token)
      );
      if (response.status === 200) {
        setSuccessMessage(response.data.msg);
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
    }
  };

  return (
    <div>
      <h2 className="text-center text-lg text-blue-says font-semibold">
        {survey?.title}
      </h2>
      {successMessage.trim().length > 0 && (
        <div className="flex justify-center items-center">
          <span className="bg-green-600 text-white p-2 rounded-md my-4 text-center">
            {successMessage}
          </span>
        </div>
      )}
      <ul>
        {survey?.questions.map((item) => (
          <li key={item.id_question}>
            <QuestionSurvey question={item} onChange={handleAnswerChange} />
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center mt-10">
        <button
          type="button"
          onClick={sendSurvey}
          className="p-2 bg-blue-says text-white font-bold"
        >
          Send Survey
        </button>
      </div>
    </div>
  );
};

export default AnswerSurvey;
