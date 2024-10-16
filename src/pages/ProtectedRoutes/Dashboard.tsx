import { useEffect } from "react";
import LastSurvey from "../../components/Dashboard/LastSurvey";
import PrevSurbey from "../../components/Dashboard/PrevSurbey";
import Icon from "react-icons-kit";
import {androidAddCircle} from 'react-icons-kit/ionicons/androidAddCircle'

const Dashboard = () => {


  useEffect(() => {
    document.title = "SurveySays Project | Dashboard";
  }, [])

  return (
    <div className="p-10">
      <div>
          <button className="absolute right-10 text-blue-says font-semibold hover:text-black ease-in-out transition-colors delay-100 duration-300">
            <Icon icon={androidAddCircle} size={25}/>
            <span className="hidden md:block">New Survey</span>
          </button>
        <div className="flex flex-col gap-4 mt-2">
          <p className="text-2xl font-semibold">Your last Survey</p>
          <p className="text-blue-says font-semibold">Are you single?</p>
          <LastSurvey />
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
