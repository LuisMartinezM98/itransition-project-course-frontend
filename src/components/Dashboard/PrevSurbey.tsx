import Icon from "react-icons-kit"
import {iosAmericanfootball} from 'react-icons-kit/ionicons/iosAmericanfootball'


const PrevSurbey = () => {
  return (
    <div className="border-2 border-blue-says p-2 w-[200px] h-[200px] flex flex-col justify-center items-center gap-2 cursor-pointer hover:-translate-x-1 hover:-translate-y-1 ease-in-out delay-100 duration-300 transition-all hover:shadow-xl">
        <Icon  icon={iosAmericanfootball} size={40}/>
        <p>Are You Exercising Daily?</p>
        <p>10 Questions</p>
        <p>By Raul Martinez</p>
    </div>
  )
}

export default PrevSurbey