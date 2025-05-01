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
