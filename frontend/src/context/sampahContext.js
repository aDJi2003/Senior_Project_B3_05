'use client';
import React, { createContext, useContext, useState } from 'react';

const SampahContext = createContext();

export const SampahProvider = ({ children }) => {
  const [sampahList, setSampahList] = useState([]);

  const createSampahEntry = (data) => {
    setSampahList((prev) => [...prev, { ...data, waktu: new Date().toISOString() }]);
    console.log("Sampah ditambahkan:", data);
  };

  return (
    <SampahContext.Provider value={{ sampahList, createSampahEntry }}>
      {children}
    </SampahContext.Provider>
  );
};

export const useSampah = () => useContext(SampahContext);
