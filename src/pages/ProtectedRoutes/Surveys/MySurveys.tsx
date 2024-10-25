import { useEffect } from "react";
import clienteAxios, { config } from "../../../config/clienteAxios";
import { useAuth, useSurvey } from "../../../Providers/Providers";
import { AxiosResponse } from "axios";
import { Form } from "../../../types/types";
import { useNavigate } from "react-router-dom";

const MySurveys = () => {
  const { token } = useAuth();
  const { setSurveys, surveys } = useSurvey();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const myForms: AxiosResponse = await clienteAxios.get(
          "/form/my-forms",
          config(token)
        );
        setSurveys(myForms.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchForms();
  }, [token]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  const handleClickSurvey = (item: Form) =>{
    navigate(`/survey/show-survey/${item.id_form}`)
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-700">
        <thead className="text-xs text-white uppercase bg-blue-says ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Form Title
            </th>
            <th scope="col" className="px-6 py-3">
              Topic
            </th>
            <th scope="col" className="px-6 py-3">
              Number of Questions
            </th>
            <th scope="col" className="px-6 py-3">
              Created Date
            </th>
          </tr>
        </thead>
        <tbody>
          {surveys.map((item) => (
            <tr className="bg-white border-b boder-4 border-blue-says hover:bg-blue-says hover:text-white transition-colors ease-in-out delay-100 duration-300 cursor-pointer" title="See survey" onClick={() => handleClickSurvey(item)}>
              <th scope="row" className="px-6 py-4 font-medium ">
                {item.title}
              </th>
              <td className="px-6 py-4">{item.topic}</td>
              <td className="px-6 py-4">{item.questions.length}</td>
              <td className="px-6 py-4">{formatDate(item.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MySurveys;
