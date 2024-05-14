// Footer Component
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import DateTime from './DateTime';
import ProgressBar from '../components/ProgressBar';

const Footer = () => {
  return (
    <footer className='bg-black' style={{ paddingTop: '2%' }}>
    <div className='bg-white rounded-md shadow-md'></div>
    <div className='text-white bg-black'>PROGRESS</div>
    <div>
      <h1 className="text-2xl font-bold text-center">Progress Bar Example</h1>
      <ProgressBar />
    </div>




  <div>
    <br/>
  </div>
  </footer>
  );



};

export default Footer;
