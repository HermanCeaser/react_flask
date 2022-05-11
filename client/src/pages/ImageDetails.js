import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import '../assets/css/image-details.css';
import { FiX } from "react-icons/fi";
import { useLocation } from 'react-router-dom';
import Moment from 'react-moment';

const ImageDetails = () => {
    const location = useLocation();
    const fetchimagedata = location.state.imagedata;
    const fetchprediction = location.state.prediction;
    const [tags, SetTags] = useState([]);
    useEffect(() => {
        var predictionsTagArr = [];
        fetchprediction.predictions && fetchprediction.predictions.map((prediction, index) => {
            predictionsTagArr.push(prediction.tagName);
            return console.log(index)
        })
        SetTags(predictionsTagArr)
    }, [fetchprediction])
    console.log(fetchprediction)
    const removeTag = (tagname) => {
        let filteredArray = tags.filter(item => item !== tagname);
        SetTags(filteredArray);
    }
    return (
        <>
            <Navbar />
            <div>
                <div className="grid md:grid-cols-3 hh-full">
                    <div className='img-show-de md:col-span-2'>
                        <img src={fetchimagedata.image.originalImageUri} alt="imagess" />
                    </div>
                    <div className='details-rideside'>
                        <div className='tagged'>
                            <h6 className='heading'>Tagged with</h6>
                            <select defaultValue={tags && tags[0]} className="mt-3 block w-2/3 p-1 mb-3 text-sm text-gray-900 rounded-lg  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {
                                   tags && tags.map((tag) => (
                                    <option value={tag}>{tag}</option>
                                   ))
                                }
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
                        <h6 className='heading mt-7'>Predictions</h6>
                        <div className="relative overflow-x-auto mt-3">
                            <table className="w-full table-auto">
                                <thead className='text-xs'>
                                    <tr>
                                        <th>Tag</th>
                                        <th>Probability</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        fetchprediction.predictions && fetchprediction.predictions.map((prediction, index) =>
                                        <tr key={index}>
                                            <td className='tag-name'>{prediction.tagName}</td>
                                            <td className='tag-score'>{prediction.probability}</td>
                                        </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className='dates mt-10'>
                            <div className='date'><span>Date of Creation</span> - <Moment format="DD-MM-YYYY" date={fetchimagedata.image.created} /></div>
                            <div className='date'><span>Last modified</span> - <Moment format="DD-MM-YYYY" date={fetchimagedata.image.created} /></div>
                        </div>
                        <div className='buttons text-right mt-5'>
                            <button className='savebtn'>Save</button>
                            <button className='closebtn ml-4'>Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ImageDetails