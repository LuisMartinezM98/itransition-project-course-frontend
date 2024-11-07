import { useState } from "react";
import clienteAxios, { config } from "../../config/clienteAxios";
import { useAuth } from "../../Providers/Providers";
import { AxiosError, AxiosResponse } from "axios";

interface ModalProps {
  isOpenOption: boolean;
  onCloseOption: () => void;
}

export const ModalTicket = ({ isOpenOption, onCloseOption }: ModalProps) => {
  const [templateTitle, setTemplateTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [priority, setPriority] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { token } = useAuth();

  if (!isOpenOption) return null;

  const handleSendReport = async () => {
    if ([templateTitle, summary, priority].includes("")) {
      return;
    }
    try {
      const dataBody = {
        summary,
        priority,
        templateTitle,
      };
      const data: AxiosResponse = await clienteAxios.post(
        "/requeriments/create-ticket",
        dataBody,
        config(token)
      );
      setSuccessMessage(data.data.msg);
      setTimeout(() => {
        setTemplateTitle('');
        setSummary('');
        setPriority('');
        setSuccessMessage('');
        onCloseOption();
      }, 3000)
    } catch (error) {
      if (error instanceof AxiosError) {
        return console.log("Error Axios", error);
      }
      return console.log(error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={(e) => {
        e.stopPropagation();
        onCloseOption();
      }}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-center text-2xl font-semibold text-blue-says">
          Jira Ticket
        </p>
        <form className="flex flex-col gap-4 mt-4">
          {successMessage.trim().length > 0 && (
            <div className="flex justify-center items-center">
              <span className="bg-green-600 text-white p-2 rounded-md my-4 text-center">
                {successMessage}
              </span>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label htmlFor="templateTitle">Template Title</label>
            <input
              type="text"
              id="templateTitle"
              onChange={(e) => setTemplateTitle(e.target.value)}
              value={templateTitle}
              className="bg-gray-100 rounded-lg p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="summary">Summary</label>
            <input
              type="text"
              id="summary"
              onChange={(e) => setSummary(e.target.value)}
              value={summary}
              className="bg-gray-100 rounded-lg p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="priority">Priority</label>
            <select
              name="priority"
              id="priority"
              className="bg-blue-says text-white rounded-lg p-2 text-center"
              onChange={(e) => setPriority(e.target.value)}
              value={priority}
            >
              <option value="">-- Select Priority --</option>
              <option value="Lowest">Lowest</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Highest">Highest</option>
            </select>
          </div>
        </form>
        <div className="flex justify-center items-center mt-8">
          <button
            className="p-2 bg-blue-says text-white rounded-lg hover:bg-gray-500 transition-colors duration-200 delay-100 ease-in-out"
            onClick={handleSendReport}
          >
            Send Report
          </button>
        </div>
      </div>
    </div>
  );
};
