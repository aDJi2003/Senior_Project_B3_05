"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getHistoryByUserId } from "../services/HistoryServices";
import { usePathname } from "next/navigation";

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const pathname = usePathname();

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan.");
      }
      const data = await getHistoryByUserId(token);
      setHistory(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Gagal mengambil data history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
  }, []);

  useEffect(() => {
    if (pathname === "/history") {
      fetchHistory();
    }
  }, [pathname]);

  return (
    <HistoryContext.Provider
      value={{
        history,
        loading,
        error,
        refetch: fetchHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error("useHistory harus digunakan di dalam <HistoryProvider>");
  }
  return context;
};
