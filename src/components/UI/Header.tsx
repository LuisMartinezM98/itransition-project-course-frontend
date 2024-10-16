import { BurguerMenu } from "./BurguerMenu"
import Slider from "./Slider"


const Header = () => {

  return (
    <div className="flex items-center justify-between static p-5">
        <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWpoeDYyYWxwdWJsZmNnb2pkcjR2NGIybm1taGJmbW5jMWQwYmJoayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6jaNZwQ6urep35rKWq/giphy.gif" alt="Survey Says gif" width={250} height={250} className="-ml-5" />
        <div>
            <BurguerMenu/>
            <Slider/>
        </div>
    </div>
  )
}

export default Header