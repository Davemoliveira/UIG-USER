import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import DarkModeToggle from '../components/DarkModeToggle'; // Adjust the path as needed
import FontSizeIncreaser from '../components/FontSizeIncreaser'; // Adjust the path as needed
import ToggleButton from '../components/ToggleButton';
import TwoColumnGrid from '../components/TwoColumnGrid';
import { Card, CardBody } from '@windmill/react-ui'
//import Apps_component from '../components/Apps_component';

const Applications = () => {
  const [isExpanded, setIsExpanded] = useState(true); // State to control sidebar visibility

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex">
      <Sidebar isExpanded={isExpanded} />
      <div className={`flex-1 ${isExpanded ? 'ml-64' : 'ml-16'}`}>
      <div className='flex justify-center'>
      <div className='w-full max-w-screen-lg px-4'>
      <div className='pt-20'>
      <div className='px-20'>       
      <div className="slide-in">

      <Card>
  <CardBody>
  <p className="mb-4 text-2xl font-semibold text-center text-gray-600 dark:text-gray-600">APPLICATIONS</p>
    <hr></hr>
    <br></br>
  </CardBody>
</Card>







          </div>








      </div>
    </div>
  </div>
</div>



      </div>
      <Footer />
    </div>
  );
};

export default Applications;
