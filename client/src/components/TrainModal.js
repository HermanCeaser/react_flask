import React, { useState } from 'react';
import '../assets/css/allmodal.css';

const TrainModal = ({ trainModal, setTrainModal }) => {
    const [rangeVal, setRangeVal] = useState(1);

    const rangeChange = (event) => {
        let value = event.target.value;
        setRangeVal(parseInt(value));
    }
    return (
        <>
            {trainModal ? (
                <>
                    <div
                        className="modal justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto mx-auto w-full md:w-1/3 max-w-2xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between px-5 pt-5 border-slate-200 rounded-t">
                                    <h6 className="font-semibold modal-heading">
                                        Training
                                    </h6>
                                    <button
                                        className="ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setTrainModal(false)}
                                    >
                                        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative px-6 pt-2 mt-2 flex-auto">
                                    <div className='train-budget'>
                                        Training Budget - <span>{rangeVal} {rangeVal === 1 ? "hour" : "hours"}</span>
                                    </div>
                                    <input type="range" min="1" max="96" value={rangeVal} onChange={rangeChange} className="w-full h-2 my-5 bg-blue-100 appearance-none" />
                                    <div className='emailnotification'>
                                        <p className='mt-1'>Send an E-mail notification after training completes</p>
                                        <input
                                            type="email"
                                            className="form-control block w-full px-2 py-2 mt-3 text-sm font-normal
                                            text-gray-700 bg-white bg-clip-padding border border-solid border-blue-600
                                            rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-800 focus:outline-none"
                                            placeholder="Write your E-mail Address"
                                        />
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end pt-5 pb-3 px-6 rounded-b">
                                    <button
                                        className="saveclosebtn text-white active:bg-blue-600 font-500 text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setTrainModal(false)}
                                    >
                                        Train
                                    </button>
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

export default TrainModal