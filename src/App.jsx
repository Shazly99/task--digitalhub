import React, { useEffect, useState } from 'react';
import TaskManager from './pages/tasks/TaskManager';
import LoginPage from './pages/LoginPage';
import { ConfigProvider } from 'antd';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };
  const theme = {
    token: {
      colorPrimary: '#006f9e',
    },
  };

  return (
    <ConfigProvider theme={theme} >
      {!isLoggedIn ? (
        <LoginPage onLogin={setIsLoggedIn} />
      ) : (
        <TaskManager onLogout={handleLogout} />
      )}
    </ConfigProvider>
  );
};

export default App;
