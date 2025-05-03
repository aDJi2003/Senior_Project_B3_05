import axios from "axios";

export const getHistoryByUserId = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Tidak ada token. Silakan login.");

  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/sampah`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
