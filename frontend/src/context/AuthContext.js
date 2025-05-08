"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login as authLogin, register as authRegister, updateProfile as updateProfileService } from "@/services/authServices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token"); 
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pengguna/me`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData); 

                    // ✅ Simpan ID pengguna ke localStorage
                    localStorage.setItem("userId", userData._id); // atau userData.id sesuai struktur API
                }
            } catch (error) {
                console.error("User fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (email, password) => {
        const userData = await authLogin(email, password);
        
        if (userData?.token) {
            localStorage.setItem("token", userData.token); // Simpan token

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pengguna/me`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            });

            if (response.ok) {
                const fetchedUser = await response.json();
                setUser(fetchedUser); 

                // ✅ Simpan ID pengguna ke localStorage
                localStorage.setItem("userId", fetchedUser._id); // atau fetchedUser.id
            }
        }

        router.push("/dashboard");
    };

    const register = async (name, email, password) => {
        const userData = await authRegister(name, email, password);
        setUser(userData);

        // ✅ Simpan ID pengguna ke localStorage
        localStorage.setItem("userId", userData._id); // atau userData.id
        localStorage.setItem("token", userData.token); // jika token dikembalikan

        router.push("/dashboard");
    };

    const logout = async () => {
        localStorage.removeItem("token"); 
        localStorage.removeItem("userId"); // ✅ Hapus ID pengguna
        setUser(null);
        router.push("/login");
    };

    const updateProfile = async (formData) => {
        try {
            const updatedUser = await updateProfileService(formData);
            setUser(updatedUser.user);
        } catch (error) {
            console.error("Failed to update profile:", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateProfile, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
