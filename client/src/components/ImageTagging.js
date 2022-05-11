import React, {useState} from 'react';
import { FiX } from "react-icons/fi";
import '../assets/css/allmodal.css';

const ImageTagging = ({tagModal, setTagModal}) => {
    const [tags, SetTags] = useState(["tag1", "tag2", "tag3"]);

    const removeTag = (tagname) => {
        let filteredArray = tags.filter(item => item !== tagname);
        SetTags(filteredArray);
    }
  return (
    <>
    {tagModal ? (
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
                    Image tagging
                  </h6>
                  <button
                    className="ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setTagModal(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative px-6 mt-3 flex-auto">
                    <div className='tagged'>
                        <h6 className='body-heading'>My tags</h6>
                        <select defaultValue="DE" className="mt-3 block w-full p-2 mb-4 text-sm text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="CA">tag 1</option>
                            <option value="FR">tag 1 2</option>
                            <option value="DE">tag 1 3</option>
                        </select>
                        <div className='assigntag flex'>
                            {
                                tags && tags.map((tag) => (
                                    <span key={tag} className="flex bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-900">
                                        {tag} <span onClick={() => {removeTag(tag)}} className='tagremove'><FiX /></span>
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end py-4 px-6 rounded-b">
                  <button
                    className="saveclosebtn text-white active:bg-blue-600 font-500 text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setTagModal(false)}
                  >
                    Save & Close
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

export default ImageTagging