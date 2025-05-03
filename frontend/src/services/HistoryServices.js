import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Pastikan sudah di-install

export const getHistoryByUserId = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Tidak ada token. Silakan login.");

  // // Decode token untuk ambil user ID
  const decoded = jwtDecode(token);
  const userId = decoded.ID_pengguna; // Ganti sesuai field yang kamu simpan di token

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sampah/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
