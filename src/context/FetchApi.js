import { createContext, useEffect, useState } from 'react';

export const FetchApi = createContext({
  darkMode: true,
  setDarkMode: () => {},
});

function FetchApiContext({ children }) {

  let isLang = localStorage.getItem('i18nextLng'); 
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true' ? true : false;
  }); 

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    window.document.body.classList.toggle('dark-mode', darkMode) 
    
  }, [darkMode]);
 

  return (
    <>
      <FetchApi.Provider
        value={{ 
          darkMode,
          setDarkMode, 
        }}
      >
        {children}
      </FetchApi.Provider>
    </>
  );
}

export default FetchApiContext;
