"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import NavbarBackground from "../../components/navbar-background";
import Footer from "../../components/footer"; 

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
            setTimeout(() => router.push("/login"), 1000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-between bg-gray-100">
            <NavbarBackground />
            <div className="flex flex-1 justify-center items-center">
                <div className="bg-[#D4E0A8] p-10 rounded-xl shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-bold text-center text-black">Register</h2>

                    {error && <p className="text-red-600 text-center mt-2">{error}</p>}
                    {success && <p className="text-green-600 text-center mt-2">{success}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="mt-6">
                            <label className="block text-black">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 mt-2 border rounded-lg focus:outline-none bg-white text-black"
                                placeholder="Enter your name"
                                required
                            />

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

                            <label className="block text-black mt-4">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-3 mt-2 border rounded-lg focus:outline-none bg-white text-black"
                                placeholder="Enter your password"
                                required
                            />

                            <label className="block text-black mt-4">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full p-3 mt-2 border rounded-lg focus:outline-none bg-white text-black"
                                placeholder="Confirm your password"
                                required
                            />
                        </div>

                        <p className="text-center text-black mt-4">
                            Already have an account?{" "}
                            <a href="/login" className="text-blue-600 font-semibold italic">
                                Login here
                            </a>
                        </p>

                        <button 
                            type="submit" 
                            className="w-full mt-6 bg-[#F5F9D6] py-3 rounded-lg text-black font-bold hover:bg-[#E8F0C8] transition"
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
