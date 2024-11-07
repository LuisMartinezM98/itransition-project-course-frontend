import { useAuth, useSlider } from '../../Providers/Providers';
import { useNavigate } from 'react-router-dom';
import Icon from 'react-icons-kit';
import {ic_cloud_twotone} from 'react-icons-kit/md/ic_cloud_twotone'

const Slider = () => {

    const { isOpen, openSidebar } = useSlider();
    const { user, logOut  } = useAuth();

    const navigate = useNavigate();

    return (
        <>
            <div
                className={`fixed inset-0 z-30 bg-black transition-opacity duration-500 ease-in-out 
                    ${isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}
                `}
                onClick={openSidebar}
            />
            <aside
                className={`text-xl h-full bg-white border-l-8 border-blue-says w-[319px] top-0 right-0 z-50 fixed p-10 flex flex-col gap-4 transform transition-transform duration-500 ease-in-out
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
                onClick={(e) => e.stopPropagation()}
            >
                <p className='font-bold'>Hi <span className='text-blue-says'>{user?.name.split(' ')[0]}!</span></p>

                <p className='hover:text-blue-says transition-colors ease-in-out delay-100 duration-300 cursor-pointer font-semibold'>My Account</p>

                <p className='hover:text-blue-says transition-colors ease-in-out delay-100 duration-300 cursor-pointer font-semibold' onClick={() => navigate('/survey/my-surveys')}>My Surveys</p>

                <p className='hover:text-blue-says transition-colors ease-in-out delay-100 duration-300 cursor-pointer font-semibold'>Other Surveys</p>
                {user?.type_account.type_account == 'admin' && (
                    <div className='flex items-center gap-2 hover:text-blue-says transition-colors ease-in-out delay-100 duration-300 cursor-pointer font-semibold' onClick={() => navigate('/create-account-salesforce')}>
                        <Icon icon={ic_cloud_twotone} size={30} className='text-blue-600'/>
                        <p>Create Account</p>
                    </div>
                )}

                <p className='hover:text-blue-says transition-colors ease-in-out delay-100 duration-300 cursor-pointer font-semibold mt-20' onClick={logOut}>Log Out</p>
            </aside>
        </>
    );
};

export default Slider;
