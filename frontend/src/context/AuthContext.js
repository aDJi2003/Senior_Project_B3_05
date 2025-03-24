"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login as authLogin, register as authRegister } from "@/services/authServices";

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
                const response = await fetch("http://localhost:8080/api/pengguna/me", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData); 
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
            localStorage.setItem("token", userData.token); // Store token
            const response = await fetch("http://localhost:8080/api/pengguna/me", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            });
    
            if (response.ok) {
                const fetchedUser = await response.json();
                setUser(fetchedUser); 
            }
        }
    
        router.push("/dashboard");
    };
    

    const register = async (name, email, password) => {
        const userData = await authRegister(name, email, password);
        setUser(userData);
        router.push("/dashboard");
    };

    const logout = async () => {
        localStorage.removeItem("token"); 
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
