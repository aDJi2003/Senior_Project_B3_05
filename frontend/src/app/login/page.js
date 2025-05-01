"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; 
import NavbarBackground from "../../components/navbar-background";
import Footer from "../../components/footer";

export default function Login() {
    const { login } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const emailInputRef = useRef(null);

    useEffect(() => {
        emailInputRef.current?.focus();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await login(email, password);
            router.push("/dashboard"); 
        } catch (err) {
            if (err.message === "Network Error" || err.response?.status >= 500) {
                setError("Unable to connect to the server. Please try again later.");
            } else {
                setError("Invalid email or password");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-between bg-gray-100">
            <NavbarBackground />
            <div className="flex flex-1 justify-center items-center mt-[18vh] mb-[6vh]">
                <div className="bg-[#D4E0A8] p-10 rounded-xl shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-bold text-center text-black">Login</h2>

                    {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                    <form onSubmit={handleLogin}>
                        <div className="mt-6">
                            <label className="block text-black">Email</label>
                            <input
                                ref={emailInputRef}
                                type="email"
                                className="w-full p-3 mt-2 border rounded-lg focus:outline-none bg-white text-black"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <label className="block text-black mt-4">Password</label>
                            <input
                                type="password"
                                className="w-full p-3 mt-2 border rounded-lg focus:outline-none bg-white text-black"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <p className="text-center text-black mt-4">
                            {"Don't have an account yet? "}
                            <a href="/signup" className="text-blue-600 font-semibold italic">
                                Register here
                            </a>
                        </p>

                        <button
                            type="submit"
                            className="w-full mt-6 bg-[#F5F9D6] py-3 rounded-lg text-black font-bold hover:bg-[#E8F0C8] transition cursor-pointer"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
