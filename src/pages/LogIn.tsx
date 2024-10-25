import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Importa useLocation
import Form from "../components/LogInComponents/Form";
import { isAuthenticated } from '../helpers/auth';
import { useAuth } from '../Providers/Providers';

const LogIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth(); 

  const from = location.state?.from?.pathname || "/dashboard"; 

  useEffect(() => {
    document.title = "SurveySays Project | Log In";

    if (isAuthenticated(token)) {
      navigate(from, { replace: true });
    }
  }, [navigate, token, from]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-2 px-10 py-20">
      <div className="p-5 md:p-10">
        <img
          src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWpoeDYyYWxwdWJsZmNnb2pkcjR2NGIybm1taGJmbW5jMWQwYmJoayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6jaNZwQ6urep35rKWq/giphy.gif"
          alt="Survey says gif"
        />
      </div>
      <div className="w-full mb-10">
        <Form />
      </div>
    </div>
  );
};

export default LogIn;
