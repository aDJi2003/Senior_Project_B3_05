"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getHistoryByUserId } from "../services/HistoryServices";

const HistoryContext = createContext();

/**
 * Provider yang menyediakan data history sampah untuk komponen anak.
 */
export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // sebaiknya null, bukan string kosong

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistoryByUserId();
        setHistory(data);
      } catch (err) {
        setError(err.message || "Terjadi kesalahan saat mengambil data");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <HistoryContext.Provider value={{ history, loading, error }}>
      {children}
    </HistoryContext.Provider>
  );
};

/**
 * Custom hook untuk menggunakan context History
 */
export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error("useHistory harus digunakan di dalam <HistoryProvider>");
  }
  return context;
};
