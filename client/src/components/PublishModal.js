import React from 'react';
import '../assets/css/allmodal.css';

const PublishModal = ({publishmodal, setPublishModal}) => {
  return (
    <>
    {publishmodal ? (
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
                    Publish Model
                  </h6>
                  <button
                    className="ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setPublishModal(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative px-6 pt-2 mt-3 flex-auto">
                <div class="mb-3">
                    <label class="block mb-2 text-gray-600">Model Name</label>
                    <input type="text" class="bg-gray-50 border border-blue-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Iteration 1"/>
                </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end pt-5 pb-3 px-6 rounded-b">
                <button
                    className="saveclosebtn text-white active:bg-blue-600 font-500 text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setPublishModal(false)}
                  >
                    Save
                  </button>
                  <button
                    className="saveclosebtn text-white active:bg-blue-600 font-500 text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setPublishModal(false)}
                  >
                    Cancel
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

export default PublishModal