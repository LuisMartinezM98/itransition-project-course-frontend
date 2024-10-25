import { useParams } from "react-router-dom";
import { useEffect } from "react";
import clienteAxios, { config } from "../../config/clienteAxios";
import { useAuth, useSurvey } from "../../Providers/Providers";
import { AxiosResponse } from "axios";
import LastSurvey from "../../components/Dashboard/LastSurvey";

const Survey = () => {
  const { id } = useParams<{ id: string }>();

  const { token } = useAuth();
  const { setSurvey, survey } = useSurvey();

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const surveyFetch: AxiosResponse = await clienteAxios.get(
          `/form/get-form?id_form=${id}`,
          config(token)
        );
        setSurvey(surveyFetch.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSurvey();
  }, []);

  return (
    <div className="p-10 flex flex-col gap-4">
      <div className="flex justify-end mb-10">
        {/* <button className=" bg-blue-says p-2 rounded-lg w-[250px] text-white font-semibold">Use this survey</button> */}
      </div>
      <div className="flex justify-between">
        <h2 className="font-bold text-3xl">{survey?.title}</h2>
        <p className="text-blue-says font-semibold">By: {survey?.name}</p>
      </div>
      <div>
        <p className="font-thin">Topic: </p>
        <div className="flex justify-between">
          <p>{survey?.topic}</p>
        </div>
      </div>
      <div>
        <p className="font-thin">Description: </p>
        <p className=" text-justify">{survey?.description}</p>
      </div>
      <div>
        <p className="text-blue-says font-semibold">Questions: </p>
        <ul className="flex flex-col gap-2 mt-2">
          {survey?.questions.map((item) => (
            <li className="flex justify-between" key={item.id_question}>
              <p>{item.question_text}</p>
              <span className=" rounded-xl px-2 py-0.5 bg-blue-says text-white w-[150px] text-center">
                {item.type_question.type_name}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5">
      <LastSurvey/>
      </div>
    </div>
  );
};

export default Survey;
