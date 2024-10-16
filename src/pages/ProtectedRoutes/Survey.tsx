
import { useParams } from "react-router-dom";
import {iosBody} from 'react-icons-kit/ionicons/iosBody'
import Icon from "react-icons-kit";


const Survey = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-10 flex flex-col gap-4">
        <div className="flex justify-end mb-10">
        <button className=" bg-blue-says p-2 rounded-lg w-[250px] text-white font-semibold">Use this survey</button>
        </div>
      <div className="flex justify-between">
      <h2 className="font-bold text-3xl">Are you single?</h2>
      <p className="text-blue-says font-semibold">By: Luis Martinez</p>
      </div>
      <div>
        <p className="font-thin">Category: </p>
        <div className="flex justify-between">
        <p>Social</p>
        <span className="text-blue-says">
            <Icon
                icon={iosBody}
                size={30}
            />
        </span>
        </div>
      </div>
      <div>
        <p className="font-thin">Description: </p>
        <p className=" text-justify">
          Morbi iaculis enim ligula. Morbi metus est, tempor id ipsum nec,
          faucibus tempus sem. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus. Aenean in varius leo.
          Curabitur fermentum id nunc non molestie. Proin sem magna, molestie
          quis efficitur fermentum, feugiat eu dolor. Pellentesque placerat
          nulla eget diam tincidunt, sed consectetur ex molestie.
        </p>
      </div>
      <div>
        <p className="text-blue-says font-semibold">Questions: </p>
        <ul className="flex flex-col gap-2 mt-2">
            <li className="flex justify-between">
                <p>Question 1</p>
                <span className=" rounded-xl px-2 py-0.5 bg-blue-says text-white w-[70px] text-center">Option</span>
            </li>
            <li className="flex justify-between">
                <p>Question 2</p>
                <span className=" rounded-xl px-2 py-0.5 bg-blue-says text-white w-[70px] text-center">Open</span>
            </li>
        </ul>
      </div>
    </div>
  );
};

export default Survey;
