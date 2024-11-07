import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Providers/Providers";
import { AxiosError, AxiosResponse } from "axios";
import { config } from "../../config/clienteAxios";
import clienteAxios from "../../config/clienteAxios";
import ModalContacts from "../../components/ContactsSalesforce/ModalContacts";

const CreateAccount = () => {
  const [accountName, setAccountName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const { user, token } = useAuth();
  const navigate = useNavigate();

  if (user?.type_account.type_account !== "admin") {
    navigate("/dashboard");
  }

  const handleSendForm = async () => {
    if ([accountName, lastName, email].includes("")) {
      return;
    }
    try {
      const objData = {
        accountName,
        firstName,
        lastName,
        email,
      };
      const createAccount: AxiosResponse = await clienteAxios.post(
        "/requeriments/create-contact",
        objData,
        config(token)
      );
      setSuccessMessage(createAccount.data.msg);
      setTimeout(() => {
        setAccountName('')
        setLastName('')
        setEmail('')
        setSuccessMessage('')
        setFirstName('')
        window.location.reload();
      }, 3000)
    } catch (error) {
      if (error instanceof AxiosError) {
        return console.log("Error Axios", error);
      }
      return console.log(error);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

  return (
    <div>
      <div className="px-10">
      <p className="text-blue-says font-bold text-end hover:text-gray-600 transition-colors duration-200 delay-100 cursor-pointer" onClick={handleOpenModal}>My Salesforce Contacts</p>
      </div>
      <p className="text-4xl text-blue-says font-bold text-center">
        Create Account Salesforce
      </p>
      <form
        action=""
        className=" flex justify-center items-center flex-col w-full gap-4 mt-5"
      >
        {successMessage.trim().length > 0 && (
          <div className="flex justify-center items-center">
            <span className="bg-green-600 text-white p-2 rounded-md my-4 text-center">
              {successMessage}
            </span>
          </div>
        )}
        <div className="flex flex-col w-full md:w-1/2 text-center gap-2">
          <label htmlFor="accountName">Account Name</label>
          <input
            value={accountName}
            type="text"
            className="bg-gray-100 p-2 rounded-md border-4 border-blue-says text-center"
            id="accountName"
            onChange={(e) => setAccountName(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2 text-center gap-2">
          <label htmlFor="lastName">First Name</label>
          <input
            type="text"
            id="lastName"
            className="bg-gray-100 p-2 rounded-md border-4 border-blue-says text-center"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2 text-center gap-2">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            className="bg-gray-100 p-2 rounded-md border-4 border-blue-says text-center"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2 text-center gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="bg-gray-100 p-2 rounded-md border-4 border-blue-says text-center"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <button
          type="button"
          className="bg-blue-says p-2 rounded-md text-white font-semibold"
          onClick={handleSendForm}
        >
          Create Account
        </button>
      </form>
      <ModalContacts onCloseOption={handleOpenModal} isOpenOption={openModal}/>
    </div>
  );
};

export default CreateAccount;
