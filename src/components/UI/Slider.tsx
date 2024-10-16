import { useSlider } from '../../Providers/Providers';

const Slider = () => {

    const { isOpen, openSidebar } = useSlider();

    return (
        <>
            {/* Fondo negro */}
            <div
                className={`fixed inset-0 z-30 bg-black transition-opacity duration-500 ease-in-out 
                    ${isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}
                `}
                onClick={openSidebar}
            />

            {/* Slider */}
            <aside
                className={`text-xl h-full bg-white border-l-8 border-blue-says w-[319px] top-0 right-0 z-50 fixed p-10 flex flex-col gap-4 transform transition-transform duration-500 ease-in-out
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
                onClick={(e) => e.stopPropagation()}
            >
                <p className='font-bold'>Hi <span className='text-blue-says'>Luis!</span></p>

                <p className='hover:text-blue-says transition-colors ease-in-out delay-100 duration-300 cursor-pointer font-semibold'>My Account</p>

                <p className='hover:text-blue-says transition-colors ease-in-out delay-100 duration-300 cursor-pointer font-semibold'>My Surveys</p>

                <p className='hover:text-blue-says transition-colors ease-in-out delay-100 duration-300 cursor-pointer font-semibold'>Other Surveys</p>

                <p className='hover:text-blue-says transition-colors ease-in-out delay-100 duration-300 cursor-pointer font-semibold mt-20'>Log Out</p>
            </aside>
        </>
    );
};

export default Slider;
