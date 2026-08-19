import React, { createContext, useState, useContext } from 'react';

export const SlideContext = createContext(null);

export const SlideProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <SlideContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </SlideContext.Provider>
  );
};

export const useSlide = () => useContext(SlideContext);
