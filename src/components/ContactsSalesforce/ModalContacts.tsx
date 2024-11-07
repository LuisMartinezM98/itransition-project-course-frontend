import { useEffect } from "react";
import ContactsTable from "./ContactsTable";
import { AxiosError, AxiosResponse } from "axios";
import clienteAxios, { config } from "../../config/clienteAxios";
import { useAuth, useSalesForce } from "../../Providers/Providers";

interface ModalProps {
    isOpenOption: boolean;
    onCloseOption: () => void;
  }

const ModalContacts = ({isOpenOption, onCloseOption}:ModalProps) => {

    if(!isOpenOption) return null;
    const {token} = useAuth()
    const {setContacts} = useSalesForce();

    useEffect(() => {
        const getContacts = async() => {
            try {
                const data: AxiosResponse = await clienteAxios.get('/requeriments/get-contacts', config(token));
                setContacts(data.data);
            } catch (error) {
                if (error instanceof AxiosError) {
                    return console.log("Error Axios", error);
                  }
                  return console.log(error);
            }
        }
        getContacts();
    }, [])

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        onClick={(e) => {
          e.stopPropagation();
          onCloseOption();
        }}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <ContactsTable/>
      </div>
    </div>
  );
};

export default ModalContacts;
