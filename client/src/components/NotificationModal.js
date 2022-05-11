import React, { useEffect, useState } from 'react';
import '../assets/css/allmodal.css';
import { BsFillBellFill } from "react-icons/bs";

const NotificationModal = ({notificationModal, setNotificationModal}) => {
    const [notication, setNotification] = useState([]);
    useEffect(() => {
      setNotification([])
    },[])
  return (
    <>
    {notificationModal ? (
        <>
          <div className="modal overflow-y-auto overflow-x-hidden fixed z-50 w-full md:inset-0 h-modal md:h-full"
          >
            <div className="noticationmodal w-auto mx-auto w-full md:w-1/3 max-w-2xl">
              <div className="border-0 py-4 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between px-5 border-slate-200 rounded-t">
                  <h6 className="font-semibold modal-heading">
                    Notification
                  </h6>
                  <button
                    className="ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setNotificationModal(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative px-6 pt-2 mt-3 flex-auto">
                    {
                        notication.length > 0 ?
                        <div>

                        </div> :
                        <div className='no-notification'>
                            <BsFillBellFill className='bellicon'/>
                            <p>No new notications</p>
                        </div>
                    }
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

export default NotificationModal