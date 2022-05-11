import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useDropzone } from "react-dropzone";
import icocico from "../assets/icoico.svg";
import '../assets/css/fileupload.css';
import { ToastContainer, toast } from 'react-toastify';
import IconAdd from "../assets/icon-add.svg";
import IconBin from "../assets/icon-bin.svg";
import Footer from "../components/Footer";
import { apiUrl } from "../api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Fileupload() {
  let navigate = useNavigate();
  const [nofiles, setNofiles] = useState(1);
  const [responseData, setResponseData] = useState([]);
  const [allAcceptedFiles, setAllAcceptedFiles] = useState([]);

  const handlerFileRadio = (n) => {
    setNofiles(n);
    setResponseData([]);
    setAllAcceptedFiles([]);
  };

  const { fileRejections, getRootProps, getInputProps } =
    useDropzone({
      maxFiles: nofiles,
      accept: 'image/jpeg,image/png,image/bmp',
      onDrop: acceptedFiles => {
        if(acceptedFiles.length !== 0){
          allAcceptedFiles.push(acceptedFiles);
          console.log(allAcceptedFiles);
          setAllAcceptedFiles(allAcceptedFiles);
          uploadImages(allAcceptedFiles);
        }
      }
    });

  const uploadImages = (images) => {
    const toastId = toast.loading("Upload in progress, please wait...");
    var uploadapi = `${apiUrl}/api/v1/upload/single`;
    console.log(uploadapi)
    var data = new FormData();
    var count = 0;
    images.map((files) => {
      files.map((file) => {
        data.append(`image${count+1}`, file);
        count++;
        return console.log(count);
      })
      return console.log(count);
    })
    console.log(data)
    var config = {
      method: 'post',
      url: uploadapi,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data : data
    };
    axios(config)
    .then(function (response) {
      toast.dismiss(toastId);
      if(response.status === 200){
        setResponseData(response.data)
        console.log(response.data);
      }else {
        toast.error("Something went wrong.");
      }
    })
    .catch(function (error) {
      toast.dismiss(toastId);
      toast.error("Something went wrong.");
      console.log(error);
    });
  }

  useEffect(() => {
    if (fileRejections[0]) {
      if (fileRejections[0].errors) {
        toast.error(fileRejections[0].errors[0].message);
      }
    }
  }, [fileRejections])

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 pt-2">
        <h6 className="upload-file-txt text-left text-xl font-semibold">
          Upload File
        </h6>
        <p className="text-regal-wew text-left text-sm py-2 opacity-100 font-normal">
          Select wheather to upload single or multiple files
        </p>
        <div className="mb-2">
          <label className="inline-flex items-center" onClick={() => handlerFileRadio(1)}>
            <input type="radio" className="form-radio" name="fileRatio" value="1" defaultChecked={true} />
            <span className="ml-2">Single</span>
          </label>
          <label className="inline-flex items-center ml-8" onClick={() => handlerFileRadio(20)}>
            <input type="radio" className="form-radio" name="fileRatio" value="20" />
            <span className="ml-2">Multiple</span>
          </label>
        </div>
      </div>

      <div className="max-w-full bg-regal-blue">
        <div className="fileuploaddiv">
          {
            responseData.length === 0 ?
              <div>
                <div className="uploadfilezone-outer">
                  <div className="uploadfilezone">
                    <div {...getRootProps({ className: "dropzone" })}>
                      <input {...getInputProps()} />
                      <div className="">
                        <img className="icoico" src={icocico} alt="icoico" />
                      </div>
                      <h6>Drag & Drop or <span>Browse</span> your files</h6>
                      <p>File format accepted - jpg., png, bmp <br></br>File size limit - 4 mb</p>
                    </div>
                  </div>
                </div>
                {/* <div className="text-center">
            <button className="text-white mt-5 relative px-10 align-middle py-2 upload-button h-10 rounded-md bg-regal-dark">
              {" "}
              Upload
            </button>
          </div> */}
              </div>
              : <div className="images-preview">
                <div className="mb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  {nofiles > 1 &&
                    <div className="upload-more" {...getRootProps({ className: "dropzone" })}>
                      <input {...getInputProps()} />
                      <div className="upload-icons flex">
                        <img src={IconAdd} alt="IconAdd" /> <span className="ml-3">Add Image</span>
                      </div>
                      <p>File format accepted - <b>jpg, png, bmp</b><br></br>File size limit - <b>4 mb</b></p>
                    </div>
                  }
                  <div className="upload-delete">
                    <div className="upload-icons flex">
                      <img src={IconBin} alt="IconBin" /> <span className="ml-3">Delete Image</span>
                    </div>
                  </div>
                </div>
                <div className="allthumbs">
                  {
                    responseData.upload.images && responseData.upload.images.map((image, index) =>
                        <div className="imgfile" key={index} onClick={() => navigate("/imagedetails", {state:{imagedata:image, prediction:responseData.prediction[index]}})}>
                          <img
                            alt="imagesd"
                            src={image.image.thumbnailUri}
                          />
                        </div>
                    )
                  }
                </div>
                <div className="text-right">
                  <button className="text-white mt-7 relative px-5 align-middle py-1 h-8 rounded-md bg-regal-dark">
                    Save & Submit
                  </button>
                </div>
              </div>}
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default Fileupload;
