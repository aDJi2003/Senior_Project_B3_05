"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import NavbarBackground from "@/components/navbar-background";
import Footer from "@/components/footer";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Register() {
    const { register } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // State for toggling password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const nameInputRef = useRef(null);

    useEffect(() => {
        nameInputRef.current?.focus();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            setLoading(true);
            await register(formData.name, formData.email, formData.password);
            setSuccess("Registration successful! Redirecting...");
            setTimeout(() => router.push("/login"), 2000);
        } catch (err) {
            setError("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-between bg-gray-100">
            <NavbarBackground />
            <div className="flex flex-1 justify-center items-center mt-[18vh] mb-[6vh]">
                <div className="bg-[#D4E0A8] p-10 rounded-xl shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-bold text-center text-black">Register</h2>

                    {error && <p className="text-red-600 text-center mt-2">{error}</p>}
                    {success && <p className="text-green-600 text-center mt-2">{success}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="mt-6">
                            {/* Name Field */}
                            <label className="block text-black">Name</label>
                            <input
                                ref={nameInputRef}
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 mt-2 border rounded-lg focus:outline-none bg-white text-black"
                                placeholder="Enter your name"
                                required
                            />

                            {/* Email Field */}
                            <label className="block text-black mt-4">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 mt-2 border rounded-lg focus:outline-none bg-white text-black"
                                placeholder="Enter your email"
                                required
                            />

                            {/* Password Field */}
                            <label className="block text-black mt-4">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full p-3 mt-2 border rounded-lg focus:outline-none bg-white text-black"
                                    placeholder="Enter your password"
                                    required
                                />
                                <span
                                    className="absolute top-[60%] right-4 transform -translate-y-1/2 cursor-pointer text-black"
                                    onClick={() => setShowPassword(prev => !prev)}
                                >
                                    {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                                </span>
                            </div>

                            {/* Confirm Password Field */}
                            <label className="block text-black mt-4">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full p-3 mt-2 border rounded-lg focus:outline-none bg-white text-black"
                                    placeholder="Confirm your password"
                                    required
                                />
                                <span
                                    className="absolute top-[60%] right-4 transform -translate-y-1/2 cursor-pointer text-black"
                                    onClick={() => setShowConfirmPassword(prev => !prev)}
                                >
                                    {showConfirmPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                                </span>
                            </div>
                        </div>

                        <p className="text-center text-black mt-4">
                            Already have an account?{' '}
                            <a href="/login" className="text-blue-600 font-semibold italic">
                                Login here
                            </a>
                        </p>

                        <button 
                            type="submit" 
                            className="w-full mt-6 bg-[#F5F9D6] py-3 rounded-lg text-black font-bold hover:bg-[#E8F0C8] transition cursor-pointer disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
