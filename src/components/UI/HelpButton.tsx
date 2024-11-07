import { useState } from "react";
import Icon from "react-icons-kit"
import {question} from 'react-icons-kit/icomoon/question'
import { ModalTicket } from "./ModalTicket"


const HelpButton = () => {

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(!openModal)
      }


  return (
    <div className="bg-blue-says rounded-full fixed bottom-4 right-4 w-12 h-12 flex justify-center items-center shadow-lg cursor-pointer" onClick={handleOpenModal}>
        <Icon icon={question} className="text-white" size={24}/>
        <ModalTicket isOpenOption={openModal} onCloseOption={handleOpenModal}/>
    </div>
  )
}

export default HelpButton
