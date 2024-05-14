// PAGE 1 Component: Still in revision
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import DarkModeToggle from './DarkModeToggle'; // Adjust the path as needed
import FontSizeIncreaser from './FontSizeIncreaser'; // Adjust the path as needed
import ToggleButton from './ToggleButton';
import TwoColumnGrid from './TwoColumnGrid';

const Page1 = () => {
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

      <h2 className='w-full py-8 text-2xl font-bold text-center text-bold bg-gray-50' center>SETTINGS</h2>

      <h2> Styles</h2>
          </div>

          <h1>Font Size Increaser</h1>
      <FontSizeIncreaser />
      <TwoColumnGrid/>

      
      <div class="... flex items-center justify-center">
      <p>DARK MODE</p><ToggleButton/>
     </div>


      <div>
        <p>FONT SIZE</p> <p>Button to increase/decrease font size</p>
      </div>


      </div>
    </div>
  </div>
</div>



      </div>
    <Footer/>
    </div>
  );
};

export default Page1;
