import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import '../assets/css/imagehistory.css';
import SampleImg from '../assets/sample.webp';
import IconBin from "../assets/icon-bin.svg";
import RssTag from "../assets/rss_tag.svg";
import ImageTagging from "../components/ImageTagging";
import ImageDeleteModal from "../components/ImageDeleteModal";

const ImageHistory = () => {
    const [tagModal, setTagModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [imageList, setImageList] = useState();
    const [selectImageList, setSelectImageList] = useState([]);

    useEffect(() => {
        setImageList([1, 2, 3, 4])
    } ,[])

    const imageSelect = (imageId) => {
        const isInArray = selectImageList.includes(imageId);
        if (!isInArray) {
            const selImageList = [...selectImageList, imageId];
            setSelectImageList(selImageList);
        } else {
            const selectImages = selectImageList.filter(item => item !== imageId);
            setSelectImageList(selectImages);
        }
    }
    return (
        <>
            <Navbar />
            <div className='container history-con'>
                <div className="grid md:grid-cols-6 hh-full">
                    <div className="history-sidebar">
                        <h6>Iteration</h6>
                        <select defaultValue="DE" className="block w-full p-2 mb-6 text-sm text-gray-900 rounded-lg  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="CA">Iteration 1</option>
                            <option value="FR">Iteration 2</option>
                            <option value="DE">Iteration 3</option>
                        </select>
                        <h6>Sort by</h6>
                        <div className="mb-3 orderby">
                            <label className="grid grid-cols-4 items-center">
                                <span className="mr-4 col-span-3">Latest</span>
                                <input type="radio" className="form-radio" name="orderType" value="latest" defaultChecked={true} />
                            </label>
                            <label className="grid grid-cols-4 items-center mt-2">
                                <span className="mr-4 col-span-3">Oldest</span>
                                <input type="radio" className="form-radio" name="orderType" value="oldest" defaultChecked={true} />
                            </label>
                        </div>
                        <h6>Tags</h6>
                        <div className="mb-3 orderby">
                            <label className="grid grid-cols-4 items-center">
                                <span className="mr-4 col-span-3">invoice 350</span>
                                <input type="checkbox" value="" className="w-4 h-4 text-blue bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" defaultChecked />
                            </label>
                            <label className="grid grid-cols-4 items-center mt-2">
                                <span className="mr-4 col-span-3">payslip 350</span>
                                <input type="checkbox" value="" className="w-4 h-4 text-blue bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            </label>
                            <label className="grid grid-cols-4 items-center mt-2">
                                <span className="mr-4 col-span-3">invoice 350</span>
                                <input type="checkbox" value="" className="w-4 h-4 text-blue bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            </label>
                        </div>
                    </div>
                    <div className="md:col-span-5 px-7">
                        <div className='grid grid-cols-1 md:grid-cols-5 pt-4 pb-2'>
                            <div className="md:col-span-4">
                                <div className="mb-5 grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-6">
                                    <div className="upload-delete">
                                        <div className="upload-icons flex" onClick={() => setDeleteModal(true)}>
                                            <img src={IconBin} alt="IconAdd" /> <span className="ml-3">Delete Image</span>
                                        </div>
                                    </div>
                                    <div className="upload-delete">
                                        <div className="tag-icons flex" onClick={() => setTagModal(true)}>
                                            <img src={RssTag} alt="IconBin" /> <span className="ml-3">Tag Image</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <nav aria-label="Page navigation">
                                    <ul className="inline-flex items-center -space-x-px">
                                        <li>
                                            <div className="page-previous block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                <span className="sr-only">Previous</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</div>
                                        </li>
                                        <li>
                                            <div className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</div>
                                        </li>
                                        <li>
                                            <div className="z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</div>
                                        </li>
                                        <li>
                                            <div className="page-next block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                <span className="sr-only">Next</span>
                                            </div>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div className='allimages pb-3'>
                            <div className='grid grid-cols-2 md:grid-cols-6 lg:grid-cols-6 gap-5'>
                                {imageList && imageList.map((image, index) => {
                                    const isInArray = selectImageList.includes(image);
                                    return (
                                        <div className={isInArray ? "history-img h-border" : "history-img"} key={index} onClick={() => { imageSelect(image) }}>
                                            <img src={SampleImg} alt="SampleImg" />
                                            <div className="overlay"></div>
                                            <div className='image-data'>
                                                <h6 className='font-bold'>Perciptions</h6>
                                                <div className='data-info grid grid-cols-5 mt-1'>
                                                    <div className='col-span-4'>on-payslip</div>
                                                    <div>80%</div>
                                                </div>
                                                <div className='data-info grid grid-cols-5 mt-1'>
                                                    <div className='col-span-4'>payslip</div>
                                                    <div>0%</div>
                                                </div>
                                                <div className='data-info grid grid-cols-5 mt-1'>
                                                    <div className='col-span-4'>invoice</div>
                                                    <div>80%</div>
                                                </div>

                                                <div className='data-info mt-2'>
                                                    <div className='font-bold'>Date of creation</div>
                                                    <div>Just now</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ImageTagging tagModal={tagModal} setTagModal={setTagModal} />
            <ImageDeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} />
            <Footer />
        </>
    )
}

export default ImageHistory