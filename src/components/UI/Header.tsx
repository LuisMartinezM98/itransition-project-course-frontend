import { useNavigate } from "react-router-dom"
import { BurguerMenu } from "./BurguerMenu"
import Slider from "./Slider"


const Header = () => {

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between static p-5">
        <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWpoeDYyYWxwdWJsZmNnb2pkcjR2NGIybm1taGJmbW5jMWQwYmJoayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6jaNZwQ6urep35rKWq/giphy.gif" alt="Survey Says gif" width={250} height={250} className="-ml-5 cursor-pointer" onClick={() => navigate('/dashboard')}/>
        <div>
            <BurguerMenu/>
            <Slider/>
        </div>
    </div>
  )
}

export default Header