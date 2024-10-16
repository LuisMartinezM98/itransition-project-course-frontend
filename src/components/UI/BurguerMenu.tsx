import { useSlider } from '../../Providers/Providers';


export const BurguerMenu = () => {

    const { isOpen, openSidebar } = useSlider();

  if(isOpen){
    return null
  }

  return (
    <div className=' group cursor-pointer' onClick={openSidebar}>
      <span className=' block w-[35px] h-[3px] mb-[5px] bg-blue-says group-hover:bg-green-cumtual ease-in-out delay-100 transition-colors duration-200'></span>
      <span className='block w-[35px] h-[3px] mb-[5px] bg-blue-says group-hover:bg-green-cumtual ease-in-out delay-100 transition-colors duration-200'></span>
      <span className='block w-[35px] h-[3px] mb-[5px] bg-blue-says group-hover:bg-green-cumtual ease-in-out delay-100 transition-colors duration-200'></span>
    </div>
  )
}