import React from 'react';
import dp from '../assets/ct_logo.webp';
import '../assets/css/navbar.css';

function Footer() {
    return (
        <footer>
            <div className='text-right py-3'>
                <div className='inline-flex text-base mr-4 text-[#707070]'>
                    <span className='pt-1 text-[#ffffff] font-semibold'>Powered by</span>
                    <img src={dp} alt='celebal' className='ml-3' style={{width:'100px'}}/>
                </div>
            </div>
        </footer>
    )
}

export default Footer;