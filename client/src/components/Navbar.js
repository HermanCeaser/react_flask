import React, { useState } from 'react';
import dp1 from '../assets/images/tartan_logo.png';
import bell from '../assets/bell.webp';
import avatar from '../assets/images/profile.png';
import '../assets/css/navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import TrainModal from './TrainModal';
import NotificationModal from './NotificationModal';


function Navbar() {
    let navigate = useNavigate();
    const loginusername = localStorage.getItem("user_name");
    const loginuseremail = localStorage.getItem("user_email");
    const [isMobileActive, setMobileActive] = useState(false);
    const [trainModal, setTrainModal] = useState(false);
    const [notificationModal, setNotificationModal] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const onProfileClick = () => setIsActive(!isActive);
    const toggleMobile = () => {
      setMobileActive(!isMobileActive);
    };
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_email");
        navigate("/");
    }
    return (
        <>
        <div className="bg-white app-navbar border-gray-200 sm:px-4 py-4 rounded dark:bg-gray-800">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <NavLink to='/' className="flex items-center">
                    <img src={dp1} className="mr-3 navbar-logo" alt="Logo" />
                </NavLink>
                <button onClick={()=>toggleMobile()} data-collapse-toggle="mobile-menu" type="button" className="mr-5 inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                <div className={`${isMobileActive ? null : 'hidden'} pl-4 w-full md:block md:w-auto`}>
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        <li>
                            <NavLink to='/upload' className="block pt-1 navbaritem">
                                Upload Image
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/history' className="block pt-1 navbaritem">
                                Image History
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/modelmatrix' className="block pt-1 navbaritem">
                                Model Matrix
                            </NavLink>
                        </li>
                        <li className='pl-3 md:pl-0 pt-1'>
                            <button onClick={() => setTrainModal(true)} className="train-btn">
                                Train
                            </button>
                        </li>
                        <li className='pt-1 pl-3 md:pl-0'>
                            <button onClick={() => navigate("/quicktest")} className="quick-btn">
                                Quick Test
                            </button>
                        </li>
                        <li className='pl-3 pt-3 md:pt-0 md:pl-0' onClick={() => setNotificationModal(true)}>
                            <img src={bell} alt='bell' style={{ width: '1.8rem' }} />
                        </li>
                        <li className='pl-3 pt-3 md:pt-0 md:pl-0' onClick={onProfileClick}>
                            <img src={avatar} alt='ava' style={{ width: '1.8rem' }} />
                            {isActive &&<div className="origin-top-right absolute divide-y divide-gray-200 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" tabIndex="-1">
                                <div className="py-3 px-4">
                                    <span className="block text-sm text-gray-900 dark:text-white">{loginusername}</span>
                                    <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{loginuseremail}</span>
                                </div>
                                <ul>
                                    <li className='px-4 py-2' onClick={() => logout()}>
                                        <button className="block text-sm text-gray-700" role="menuitem" tabIndex="-1">Sign out</button>
                                    </li>
                                </ul>
                            </div> }
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <TrainModal trainModal={trainModal} setTrainModal={setTrainModal}/>
        <NotificationModal notificationModal={notificationModal} setNotificationModal={setNotificationModal}/>
        </>
    )
}

export default Navbar