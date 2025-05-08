import axios from "axios";

const API_URL = "/api/auth";

export const register = async (name, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { name, email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Registration failed";
    }
};

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });

        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }

        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Login failed";
    }
};

export const updateProfile = async (formData) => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No token found. Please log in.");

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/pengguna/update`, 
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to update profile";
  }
};
