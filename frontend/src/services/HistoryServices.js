import axios from "axios";

export const getHistoryByUserId = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/sampah`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching history:", error);
    throw error.response?.data?.error || "Gagal mengambil data history";
  }
};
