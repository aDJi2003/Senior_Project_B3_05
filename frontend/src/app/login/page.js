"use client";
import NavbarBackground from "../../components/navbar-background";
import Footer from "../../components/footer"; 

export default function Login() {
    return (
        <div className="min-h-screen flex flex-col justify-between bg-gray-100">
        <NavbarBackground />
        <div className="flex flex-1 justify-center items-center">
            <div className="bg-[#D4E0A8] p-10 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-center text-black">Login</h2>

            <div className="mt-6">
                <label className="block text-black">Email</label>
                <input
                type="email"
                className="w-full p-3 mt-2 border rounded-lg focus:outline-none"
                placeholder="Enter your email"
                />

                <label className="block text-black mt-4">Password</label>
                <input
                type="password"
                className="w-full p-3 mt-2 border rounded-lg focus:outline-none"
                placeholder="Enter your password"
                />
            </div>

            <p className="text-center text-black mt-4">
                Don't have an account yet?{" "}
                <a href="/signup" className="text-blue-600 font-semibold">
                Register here
                </a>
            </p>

            {/* Login Button */}
            <button className="w-full mt-6 bg-[#F5F9D6] py-3 rounded-lg text-black font-bold hover:bg-[#E8F0C8] transition">
                Login
            </button>
            </div>
        </div>

        {/* Footer */}
        <Footer />
        </div>
    );
}
