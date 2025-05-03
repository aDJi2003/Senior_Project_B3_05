"use client";
import { createContext, useContext, useState } from "react";
import { createSampah as createSampahService } from "@/services/sampahServices";

const SampahContext = createContext();

export const SampahProvider = ({ children }) => {
  const [sampahList, setSampahList] = useState([]);
  const [loading, setLoading] = useState(false);

  const createSampah = async (data) => {
    try {
      setLoading(true);
      const newSampah = await createSampahService(data);
      setSampahList((prev) => [...prev, newSampah]);
      return newSampah;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <SampahContext.Provider value={{ sampahList, createSampah, loading }}>
      {children}
    </SampahContext.Provider>
  );
};

export const useSampah = () => useContext(SampahContext);
