import axios from "axios";
import { jwtDecode } from "jwt-decode";

const decodeToken = (token) => {
  const fn = typeof jwtDecode === "function" ? jwtDecode : jwtDecode.default;
  return fn(token);
};

export const getHistoryByUserId = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Tidak ada token. Silakan login.");

  const decoded = decodeToken(token);
  const userId = decoded.ID_pengguna;

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sampah/${userId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const getWeeklyWeight = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found. Please log in.");

  const decoded = jwtDecode(token);
  const userId = decoded.ID_pengguna;

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sampah/weekly-weight`,
    {
      params: { userId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.totalWeight;
};

export const getTotalWasteData = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found. Please log in.");

  const decoded = jwtDecode(token);
  const userId = decoded.ID_pengguna;

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sampah/total-waste?userId=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
