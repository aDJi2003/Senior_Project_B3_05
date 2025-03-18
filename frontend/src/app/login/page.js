"use client";
import { useRouter } from "next/navigation"; // Import useRouter
import NavbarBackground from "../../components/navbar-background";
import Footer from "../../components/footer"; 

export default function Login() {
    const router = useRouter(); // Initialize router

    const handleLogin = (e) => {
        e.preventDefault(); // Prevent default form submission
        router.push("/dashboard"); // Navigate to dashboard
    };

    return (
        <div className="min-h-screen flex flex-col justify-between bg-gray-100">
            <NavbarBackground />
            <div className="flex flex-1 justify-center items-center">
                <div className="bg-[#D4E0A8] p-10 rounded-xl shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-bold text-center text-black">Login</h2>

                    <form onSubmit={handleLogin}> {/* Wrap inputs in form */}
                        <div className="mt-6">
                            <label className="block text-black">Email</label>
                            <input
                                type="email"
                                className="w-full p-3 mt-2 border rounded-lg focus:outline-none bg-white text-black"
                                placeholder="Enter your email"
                                required
                            />

                            <label className="block text-black mt-4">Password</label>
                            <input
                                type="password"
                                className="w-full p-3 mt-2 border rounded-lg focus:outline-none bg-white text-black"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <p className="text-center text-black mt-4">
                            Don't have an account yet?{" "}
                            <a href="/signup" className="text-blue-600 font-semibold italic">
                                Register here
                            </a>
                        </p>

                        <button type="submit" className="w-full mt-6 bg-[#F5F9D6] py-3 rounded-lg text-black font-bold hover:bg-[#E8F0C8] transition">
                            Login
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
