import React, { useState, useEffect } from 'react';

export const SettingsContext = React.createContext();

const SettingsProvider = ({children}) => {
  const [pageItems, setPageItems] = useState(3);
  const [showCompleted, setShowCompleted] = useState(false);
  const [sort, setSort] = useState('difficulty');

  const saveLocalStorage = () => {
    localStorage.setItem('pageItems', JSON.stringify(+pageItems));
    localStorage.setItem('showCompleted', JSON.stringify(showCompleted));
    localStorage.setItem('sort', JSON.stringify(sort));
  };

  const values = {pageItems, showCompleted, sort, setSort, setPageItems, setShowCompleted, saveLocalStorage};

  //load the above state from local storage
  useEffect(() => {
    const localPageItems = localStorage.getItem('pageItems');
    const localShowCompleted = localStorage.getItem('showCompleted');
    const localSort = localStorage.getItem('sort');
    if (localPageItems) {
      setPageItems(JSON.parse(localPageItems));
    }
    if (localShowCompleted) {
      setShowCompleted(JSON.parse(localShowCompleted));
    }
    if (localSort) {
      setSort(JSON.parse(localSort));
    }
  }, []);

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  )

}

export default SettingsProvider;