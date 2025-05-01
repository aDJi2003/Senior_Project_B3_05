"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getHistoryByUserId } from "../services/HistoryServices";

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistoryByUserId();
        setHistory(data);
      } catch (err) {
        setError(err);
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

export const useHistory = () => useContext(HistoryContext);
