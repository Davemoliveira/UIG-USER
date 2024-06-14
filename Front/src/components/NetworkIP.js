import React, { useState, useEffect } from 'react';

const NetworkIP = () => {
  const [machineInfo, setMachineInfo] = useState({
    ipAddress: ''
  });

  useEffect(() => {
    // Fetch the IP address
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setMachineInfo(info => ({ ...info, ipAddress: data.ip })))
      .catch(error => console.error('Error fetching IP address:', error));

    // Get browser and operating system details
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const browserInfo = getBrowserInfo(userAgent);

    setMachineInfo(info => ({
      ...info,
      operatingSystem: platform,
      browserName: browserInfo.name,
      browserVersion: browserInfo.version
    }));
  }, []);

  const getBrowserInfo = (userAgent) => {
    let temp;
    const browser = {};
    const match = userAgent.match(/(opera|chrome|safari|firefox|msie|trident)\/?\s*(\d+)/i) || [];
    if (/trident/i.test(match[1])) {
      temp = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
      return { name: 'IE', version: temp[1] || '' };
    }
    if (match[1] === 'Chrome') {
      temp = userAgent.match(/\b(OPR|Edge?)\/(\d+)/);
      if (temp != null) return { name: temp[1].replace('OPR', 'Opera'), version: temp[2] };
    }
    match[2] = match[2] ? match[2] : navigator.appVersion;
    return { name: match[1], version: match[2] };
  };

  return (
    <div style={styles.container}>
      <p>{machineInfo.ipAddress}</p>

    </div>
  );
};

// Inline styles for the component
const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '24px',
    marginBottom: '10px',
  },
};

export default NetworkIP;
