import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DarkModeToggle from '../components/DarkModeToggle'; // Adjust the path as needed
import FontSizeIncreaser from '../components/FontSizeIncreaser'; // Adjust the path as needed
import ToggleButton from '../components/ToggleButton';
import TwoColumnGrid from '../components/TwoColumnGrid';
import { Card, CardBody } from '@windmill/react-ui'

const Overview = () => {
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
    <p className="mb-4 text-2xl font-semibold text-center text-gray-600 dark:text-gray-600">OVERVIEW</p>
  
    <hr></hr>

  </CardBody>
</Card>


<ul class="flex flex-col md:grid grid-cols-3 gap-5 text-redis-neutral-800 max-w-2xl mx-auto p-10 text-center">
    <li
        class="w-full text-sm font-semibold text-slate-900 p-6 bg-white border border-slate-900/10 bg-clip-padding shadow-md shadow-slate-900/5 rounded-lg flex flex-col justify-center">
        <span class="mb-1 text-indigo-800 font-display text-5xl">10</span>
        <span className='text-base'>Applications</span>
    </li>
    <li
        class="w-full text-sm font-semibold text-slate-900 p-6 bg-white border border-slate-900/10 bg-clip-padding shadow-md shadow-slate-900/5 rounded-lg flex flex-col justify-center">
        <span class="mb-1 text-indigo-800 font-display text-5xl">7</span>
        <span className='text-base'>Deployed</span>
    </li>
    <li
        class="w-full text-sm font-semibold text-slate-900 p-6 bg-white border border-slate-900/10 bg-clip-padding shadow-md shadow-slate-900/5 rounded-lg flex flex-col justify-center">
        <span class="mb-1 text-indigo-800 font-display text-5xl">3</span>
        <span className='text-base'>Running</span>

    </li>
</ul>




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

export default Overview;
