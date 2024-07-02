import React, { useState, useEffect } from 'react';

const MachineInfoDisplay = () => {
  const [machineInfo, setMachineInfo] = useState({
    ipAddress: '',
    operatingSystem: '',
    browserName: '',
    browserVersion: '',
    onlineStatus: navigator.onLine
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

    // Update online status
    const updateOnlineStatus = () => {
      setMachineInfo(info => ({ ...info, onlineStatus: navigator.onLine }));
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
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
      <p style={machineInfo.onlineStatus ? styles.online : styles.offline}>
         {machineInfo.onlineStatus ? 'ONLINE' : 'OFFLINE'}
      </p>
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
  online: {
    color: 'green',
  },
  offline: {
    color: 'red',
  },
};

export default MachineInfoDisplay;