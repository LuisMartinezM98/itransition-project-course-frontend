import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LastSurvey from "../../components/Dashboard/LastSurvey";
import PrevSurbey from "../../components/Dashboard/PrevSurbey";
import Icon from "react-icons-kit";
import {androidAddCircle} from 'react-icons-kit/ionicons/androidAddCircle'
import { useSurvey, useAuth } from '../../Providers/Providers';
import clienteAxios from "../../config/clienteAxios";
import { AxiosResponse } from "axios";
import { config } from "../../config/clienteAxios";

const Dashboard = () => {

  const navigate = useNavigate();
  const { token } = useAuth();
  const { survey, setSurvey } = useSurvey();


  useEffect(() => {
    document.title = "SurveySays Project | Dashboard";
    const fetchLastSurvey = async () => {
      try {
        const lastSurvey: AxiosResponse = await clienteAxios.get(
          "/form/last-form",
          config(token)
        );
        if(lastSurvey.status === 204){
          return
        }
        setSurvey(lastSurvey.data);
      } catch (error) {
        console.error("Error fetching the last survey", error);
      }
    };
    fetchLastSurvey();
  }, [])

  return (
    <div className="p-10">
      <div>
          <button className="absolute right-10 text-blue-says font-semibold hover:text-black ease-in-out transition-colors delay-100 duration-300" onClick={() => navigate('/survey/new-survey')}>
            <Icon icon={androidAddCircle} size={25}/>
            <span className="hidden md:block">New Survey</span>
          </button>
        <div className="flex flex-col gap-4 mt-2">
          <p className="text-2xl font-semibold">Your last Survey</p>
          { survey?.id_form ? (
            <>
              <p className="text-blue-says font-semibold">{survey.title}</p>
              <LastSurvey />
            </>
          ) :
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-blue-says text-xl">You don't have any survey's yet</p>
            </div>
          }
        </div>
        <p className="text-2xl font-semibold">Last Surveys</p>
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
          <li>
            <PrevSurbey />
          </li>
          <li>
            <PrevSurbey />
          </li>
          <li>
            <PrevSurbey />
          </li>
          <li>
            <PrevSurbey />
          </li>
          <li>
            <PrevSurbey />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
