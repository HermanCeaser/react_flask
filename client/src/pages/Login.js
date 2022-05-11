import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo1 from '../assets/images/tartan_logo.png';
import login_dp from '../assets/images/login_left.svg';
import '../assets/css/Login.css';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import { apiUrl } from '../api';
import axios from 'axios';
import {Buffer} from 'buffer';

function Login() {

    const [username, setUsername] = useState("");
    const [upassword, setPassword] = useState("");
    let navigate = useNavigate();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = () => {
        var data = JSON.stringify({
            "username": username
          });
          const encodedBase64Token = Buffer.from(`${username}:${upassword}`).toString('base64');
          const authorization = `Basic ${encodedBase64Token}`;
          var config = {
            method: 'post',
            url: `${apiUrl}/api/v1/users/signin`,
            headers: {
              'Authorization': authorization,
              'Content-Type': 'application/json'
            },
            data : data
          };

          axios(config)
          .then(function (response) {
            console.log(response);
            if(response.status === 200){
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user_id", response.data.user_id);
                localStorage.setItem("user_name", response.data.username);
                localStorage.setItem("user_email", response.data.email);
                navigate("/upload");
            } else {
                toast.error("Invalid user details");
            }
          })
          .catch(function (error) {
            toast.error("Invalid user details.");
            console.log(error);
          });
    };

    return (
      <>
        <div className='container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 login-container'>
            <div className="left-login pt-1">
                <img src={login_dp} alt='login' />
            </div>
            <div className="p-8 md:p-5 right-login">
                <div className="flex md:pt-[6rem] ">
                    <div className="tartan-logo">
                        <img src={logo1} alt='logo_tartan' />
                    </div>
                </div>
                <div className='text-blue-600 text-3xl font-normal pt-4'>
                    Log in
                </div>
                <form className='pt-8' autoComplete='off'>
                    <div className="relative input-width z-0 mb-6 md:w-[27rem] group">
                        <input type="text"
                            name="username"
                            className="block py-2.5 login-input px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            value={username}
                            onChange={onChangeUsername}
                            required
                        />
                        <label htmlFor="username" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Enter Username
                        </label>
                    </div>
                    <div className="relative input-width z-0 mb-6 md:w-[27rem] group">
                        <input type="password"
                            name="password"
                            className="block login-input py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            value={upassword}
                            onChange={onChangePassword}
                            required
                        />
                        <label htmlFor="pass" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Password
                        </label>
                    </div>
                    <div className="form-check my-5">
                        <input className="form-check-input appearance-none h-5 w-5 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="1" defaultChecked={true}/>
                        <label className="form-check-label inline-block text-gray-500 text-sm">
                            Remember me
                        </label>
                    </div>
                    <button type="button" onClick={() => handleLogin()} className="mt-2 text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:w-[27rem]">
                        Login
                    </button>
                </form>
            </div>
        </div>
        <Footer />
        <ToastContainer />
        </>
    )
}

export default Login