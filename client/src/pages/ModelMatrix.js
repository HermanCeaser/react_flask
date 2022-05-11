import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../assets/css/modelmatrix.css";
import IconBin from "../assets/icon-bin.svg";
import Chart from "react-apexcharts";
import PublishModal from "../components/PublishModal";

export default function ModelMatrix() {
  const [publishmodal, setPublishModal] = useState(false);

  const apexdonutdata = {
    options: {
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 220,
            },

            legend: {
              show: true,
            }
          },
        },
      ],
      labels: ["Data 1", "Data"],
      colors: ["#051367", "#E9F0FF"],
      backgroundColors: ["#E9F0FF"],
      legend: {
        show: false,
        position: "bottom",
      },

      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val.toFixed(2);
        },
        style: {
          colors: ['#fff', '#000']
        }
      },
    },
    series: [80, 20],

    series1: [60, 40],
  };

  return (
    <div>
      <Navbar />
      <div className="container history-con ">
        <div className="grid md:grid-cols-5 hh-full">
          <div className="matrix-sidebar">
            <h6 className="px-2 md:px-5 pt-2">Iterations</h6>
            <div className="grid grid-cols-1 my-4 gap-4 place-content-stretch h-48 text-left text-xs text-regal-black tracking-normal  ...">
              <div className="pagepage2 active p-2 md:px-5">
                <div className="flex flex-row justify-between ">
                  <div ><h5 className="font-normal">Iteration 1</h5> </div>
                  <div> <p className="text-new text-left font-sans text-xs ">New</p> </div>
                </div>
                <p>Created - 2017-12-18 22:40:36 </p>
                <p> Last modified - 2017-12-19 15:47:02 </p>
                <p>Trained at - 2017-12-19 15:47:02</p>
              </div>
              <div className="pagepage2 p-2 md:px-5">
                <div className=" flex justify-between">
                  <div><h5 className="font-normal">Iteration 2</h5> </div>
                  <div className="text-bgy text-left font-sans text-xs "> <p>Completed</p> </div>
                </div>
                <p>Created - 2017-12-18 22:40:36 </p>
                <p> Last modified - 2017-12-19 15:47:02 </p>
                <p>Trained at - 2017-12-19 15:47:02</p>
              </div>
              <div className="pagepage2 p-2 md:px-5">
                <div className=" flex justify-between ">
                  <div><h5 className="font-normal">Iteration 3</h5></div>
                  <div className="text-bgy text-left font-sans  text-xs"> <p>Completed</p> </div>
                </div>
                <p>Created - 2017-12-18 22:40:36 </p>
                <p> Last modified - 2017-12-19 15:47:02 </p>
                <p>Trained at - 2017-12-19 15:47:02</p>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 px-7">
            <div className="grid grid-cols-1 md:grid-cols-5 pt-2">
              <div className="md:col-span-4">
                <div className="mb-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 my-2">
                  <div className="upload-delete">
                    <div className="tag-icons flex" onClick={() => setPublishModal(true)}>
                      <span className="ml-0  ">Publish</span>
                    </div>
                  </div>
                  <div className="upload-delete">
                    <div className="upload-icons flex">
                      <img src={IconBin} alt="IconAdd" />{" "}
                      <span className="ml-3">Delete</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-3/4 lg:w-1/2">
              <div className="pagepage1">
                  <h5>Iteration 1 </h5>
              </div>
              <div className="pagepage grid grid-cols-1 md:grid-cols-2 p-4 gap-4 bg-regal-blue">
                <div className="pagepage">
                  <h6>Precision</h6>
                  <Chart
                    options={apexdonutdata.options}
                    series={apexdonutdata.series}
                    type="donut"
                    width="220"
                    height="220"
                  />
                </div>

                <div className="pagepage">
                  <h6>Recall</h6>
                  <Chart
                    options={apexdonutdata.options}
                    series={apexdonutdata.series1}
                    type="donut"
                    width="220"
                    height="220"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <PublishModal publishmodal={publishmodal} setPublishModal={setPublishModal}/>
    </div>
  );
}
