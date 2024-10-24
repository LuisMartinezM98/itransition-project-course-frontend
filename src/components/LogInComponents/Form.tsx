import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Icon from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { AxiosError, AxiosResponse } from "axios";
import clienteAxios from "../../config/clienteAxios";

import { useAuth } from "../../Providers/Providers";

interface LogInData {
  email: string;
  password: string;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

enum typePassword {
  password = "password",
  text = "text",
}

const Form = () => {
  const [signUp, setSignUp] = useState(false);
  const [type, setType] = useState<typePassword>(typePassword.password);
  const [icon, setIcon] = useState(eyeOff);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { setToken, setUser } = useAuth();

  const {
    register: logInRegister,
    handleSubmit: handleLogInSubmit,
    formState: { errors: errorLogin },
    clearErrors: clearLogInErrors,
  } = useForm<LogInData>();

  const {
    register: signUpRegister,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: errorsSignUp },
    clearErrors: clearSignUpErrors,
  } = useForm<SignUpData>();

  const onSubmitLogIn: SubmitHandler<LogInData> = async (data) => {
    event?.preventDefault();
    if ([data.email, data.password].includes("")) {
      return;
    }
    try {
      const dataBack : AxiosResponse = await clienteAxios.post('/users/log-in', data);
      setToken(dataBack.data.token);
      setUser(dataBack.data.user);
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.msg);
        return;
      }
      return console.log(error);
    }
  };

  const onSubmitSignUp: SubmitHandler<SignUpData> = async (data) => {
    event?.preventDefault();
    if (
      [data.email, data.name, data.password, data.repeatPassword].includes("")
    ) {
      return;
    }
    try {
      const { repeatPassword, ...restData } = data;
      const dataBack: AxiosResponse = await clienteAxios.post(
        "users/sign-up",
        restData
      );
      setSuccessMessage(dataBack.data.msg);
    } catch (error) {
      if(error instanceof AxiosError){
        setErrorMessage(error.response?.data.msg);
        return;
      }
      return console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      clearLogInErrors(["email", "password"]);
    }, 3000);
  }, [logInRegister]);

  useEffect(() => {
    setTimeout(() => {
      clearSignUpErrors(["email", "name", "password", "repeatPassword"]);
    }, 3000);
  }, [signUpRegister]);

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }, [errorMessage]);

  useEffect(() => {
    if(successMessage.length > 0){
      setTimeout(() => {
        setSuccessMessage('')
        window.location.reload();
      }, 3000)
    }
  }, [successMessage])

  const handleToggleForm = () => {
    setSignUp(!signUp);
    setIcon(eyeOff);
    setType(typePassword.password);
    clearLogInErrors(["email", "password"]);
    clearSignUpErrors(["email", "name", "password", "repeatPassword"]);
  };

  const handleToggle = () => {
    if (type === typePassword.password) {
      setIcon(eye);
      setType(typePassword.text);
    } else {
      setIcon(eyeOff);
      setType(typePassword.password);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div
        className={`absolute w-full transition-opacity duration-700 ${
          signUp ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
      >
        <form
          onSubmit={handleSignUpSubmit(onSubmitSignUp)}
          className="border-4 border-blue-says rounded-xl flex-col p-10 gap-4 flex"
        >
          {successMessage.length > 0 && (
            <div className="flex justify-center items-center">
              <span className="bg-green-600 text-white p-2 rounded-md my-4 text-center">
                {successMessage}
              </span>
            </div>
          )}
          {errorMessage.length > 0 && (
            <div className="flex justify-center items-center">
              <span className="bg-red-600 text-white p-2 rounded-md my-4 text-center">
                {errorMessage}
              </span>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...signUpRegister("name", { required: "Name is required" })}
              className="bg-gray-100 rounded-md text-black px-2 border-2 border-black"
            />
            {errorsSignUp.name && (
              <span className="bg-red-500 text-white font-semibold p-2 text-center rounded-md">
                <span className="bg-white px-2 text-red-500 rounded-full">
                  !
                </span>
                &nbsp; {errorsSignUp.name?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="emailSignUp" className="font-semibold">
              Email
            </label>
            <input
              type="text"
              id="emailSignUp"
              {...signUpRegister("email", { required: "Email is required" })}
              className="bg-gray-100 rounded-md text-black px-2 border-2 border-black"
            />
            {errorsSignUp.email && (
              <span className="bg-red-500 text-white font-semibold p-2 text-center rounded-md">
                <span className="bg-white px-2 text-red-500 rounded-full">
                  !
                </span>
                &nbsp; {errorsSignUp.email?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="passwordSignUp" className="font-semibold">
              Password
            </label>
            <div className="bg-gray-100 rounded-md text-black flex border-2 border-black">
              <input
                type={type}
                id="passwordSignUp"
                {...signUpRegister("password", {
                  required: "Password is required",
                })}
                className="flex-1 bg-gray-100 px-2 rounded-md"
              />
              <span
                className="flex justify-center items-center"
                onClick={handleToggle}
              >
                <Icon
                  className="absolute mr-10 cursor-pointer"
                  icon={icon}
                  size={15}
                />
              </span>
            </div>
            {errorsSignUp.password && (
              <span className="bg-red-500 text-white font-semibold p-2 text-center rounded-md">
                <span className="bg-white px-2 text-red-500 rounded-full">
                  !
                </span>
                &nbsp; {errorsSignUp.password?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="repeatPasswordSignUp" className="font-semibold">
              Repeat Password
            </label>
            <div className="bg-gray-100 rounded-md text-black flex border-2 border-black">
              <input
                type={type}
                id="repeatPasswordSignUp"
                {...signUpRegister("repeatPassword", {
                  required: "Repeat Password is required",
                })}
                className="flex-1 bg-gray-100 px-2 rounded-md"
              />
              <span
                className="flex justify-center items-center"
                onClick={handleToggle}
              >
                <Icon
                  className="absolute mr-10 cursor-pointer"
                  icon={icon}
                  size={15}
                />
              </span>
            </div>
            {errorsSignUp.repeatPassword && (
              <span className="bg-red-500 text-white font-semibold p-2 text-center rounded-md">
                <span className="bg-white px-2 text-red-500 rounded-full">
                  !
                </span>
                &nbsp; {errorsSignUp.repeatPassword?.message}
              </span>
            )}
          </div>
          <div className="flex justify-center items-center">
            <button className="border-2 border-blue-says text-blue-says font-bold px-2 py-1 rounded-lg mt-10 hover:bg-blue-says hover:text-white transition-colors ease-in-out delay-100 duration-300">
              Sign Up
            </button>
          </div>
          <div className="text-center mt-5 w-auto" onClick={handleToggleForm}>
            <p className="cursor-pointer hover:text-black ease-in-out delay-100 duration-200 transition-colors text-blue-says">Log In</p>
          </div>
        </form>
      </div>

            {/* Log In */}
            <div
        className={`absolute w-full transition-opacity duration-700 ${
          !signUp ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
      >
        <form
          onSubmit={handleLogInSubmit(onSubmitLogIn)}
          className="border-4 border-blue-says rounded-xl flex-col p-10 gap-4 flex"
        >
          {errorMessage.length > 0 && (
            <div className="flex justify-center items-center">
              <span className="bg-red-600 text-white p-2 rounded-md my-4 text-center">
                {errorMessage}
              </span>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="text"
              id="email"
              {...logInRegister("email", { required: "email is required" })}
              className="bg-gray-100 rounded-md text-black px-2 border-2 border-black"
            />
            {errorLogin.email && (
              <span className="bg-red-500 text-white font-semibold p-2 text-center rounded-md">
                <span className="bg-white px-2 text-red-500 rounded-full">
                  !
                </span>
                &nbsp; {errorLogin.email?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="passwordLogIn" className="font-semibold">
              Password
            </label>
            <div className="bg-gray-100 rounded-md text-black flex border-2 border-black">
              <input
                type={type}
                id="passwordLogIn"
                {...logInRegister("password", {
                  required: "Password is required",
                })}
                className="flex-1 bg-gray-100 px-2 rounded-md"
              />
              <span
                className="flex justify-center items-center"
                onClick={handleToggle}
              >
                <Icon
                  className="absolute mr-10 cursor-pointer"
                  icon={icon}
                  size={15}
                />
              </span>
            </div>
            {errorLogin.password && (
              <span className="bg-red-500 text-white font-semibold p-2 text-center rounded-md">
                <span className="bg-white px-2 text-red-500 rounded-full">
                  !
                </span>
                &nbsp; {errorLogin.password?.message}
              </span>
            )}
            </div>
            <div className="flex justify-center items-center">
                <button className="border-2 border-blue-says text-blue-says font-bold px-2 py-1 rounded-lg mt-10 hover:bg-blue-says hover:text-white transition-colors ease-in-out delay-100 duration-300">Log In</button>
            </div>
            <div className="text-center mt-5 w-auto" onClick={handleToggleForm}>
                <p className="cursor-pointer hover:text-black ease-in-out delay-100 duration-200 transition-colors text-blue-says">Sign Up</p>

            </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
