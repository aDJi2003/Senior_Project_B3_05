import axios from "axios";

export const createSampah = async ({ Mass_of_Weight, Type_of_waste, status, location }) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Tidak ada token. Silakan login.");

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sampah/create`,
    {
      Mass_of_Weight,
      Type_of_waste,
      status,
      location
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};
