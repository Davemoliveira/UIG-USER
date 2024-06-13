// Footer Component
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import DateTime from './DateTime';
import ProgressBar from '../components/ProgressBar';

const Footer = () => {
  return (
    <footer className='bg-black' style={{ paddingTop: '1%' }}>
    <div className='bg-white rounded-md shadow-md'></div>
    <div className='text-white bg-black'>

    </div>
    <div>
<DateTime/>
    </div>

  <div>
    <br/>
  </div>
  </footer>
  );



};

export default Footer;
