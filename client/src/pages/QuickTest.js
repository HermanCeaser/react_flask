import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import '../assets/css/image-details.css';
import Footer from '../components/Footer';

const QuickTest = () => {
    const [selectedFile, setSelectedFile] = useState();

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0]);
    };

    return (
        <>
            <Navbar />
            <div>
                <div className="grid md:grid-cols-3 hh-full">
                    <div className='img-show-de md:col-span-2'>
                    {selectedFile &&
                        <img src={URL.createObjectURL(selectedFile)} alt="selectedfile" />
                    }
                    </div>
                    <div className='details-rideside'>
                        <div className='mt-2'>
                            <h6 className='heading'>Image Details</h6>
                            <div className='flex pr-3 pb-3 pt-2'>
                                <input className='text-sm border-2 mr-3 rounded-md border-[black]' type="file" name="file" onChange={changeHandler} />
                                <button className="block py-2 pr-4 pl-3 w-[5rem] rounded-md text-blue-600 hover:bg-[#146AFF] md:hover:bg-transparent hover:text-white border border-[#146AFF] md:hover:bg-[#146AFF] md:p-0 dark:text-gray-400  dark:hover:bg-gray-700 e md:dark:hover:bg-white">Upload</button>
                            </div>
                        </div>
                        <div className='tagged mt-5'>
                            <h6 className='heading'>Iteration</h6>
                            <select defaultValue="DE" className="mt-3 block w-1/2 p-1 mb-3 text-sm text-gray-900 rounded-lg  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="CA">tag 1</option>
                                <option value="FR">tag 1 2</option>
                                <option value="DE">tag 1 3</option>
                            </select>
                        </div>
                        <h6 className='heading mt-8'>Predictions</h6>
                        <div className="relative overflow-x-auto mt-3">
                            <table className="w-full table-auto">
                                <thead className='text-xs'>
                                    <tr>
                                        <th>Tag</th>
                                        <th>Probability</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='tag-name'>non-payslip</td>
                                        <td className='tag-score'>80%</td>
                                    </tr>
                                    <tr>
                                        <td className='tag-name'>payslip</td>
                                        <td className='tag-score'>10%</td>
                                    </tr>
                                    <tr>
                                        <td className='tag-name'>invoice</td>
                                        <td className='tag-score'>0%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='buttons text-right mt-5'>
                            <button className='savebtn ml-4'>Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default QuickTest