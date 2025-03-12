"use client";
import NavbarBackground from "../../components/navbar-background";
import Footer from "../../components/footer"; 

export default function Register() {
    return (
        <div className="min-h-screen flex flex-col justify-between bg-gray-100">
            <NavbarBackground />
            <div className="flex flex-1 justify-center items-center mt-18">
                <div className="bg-[#D4E0A8] p-10 rounded-xl shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-bold text-center text-black">Register</h2>

                    <div className="mt-6">
                        <label className="block text-black">Name</label>
                        <input
                            type="text"
                            className="w-full p-3 mt-2 border rounded-lg focus:outline-none bg-white text-black"
                            placeholder="Enter your name"
                        />

                        <label className="block text-black mt-4">Email</label>
                        <input
                            type="email"
                            className="w-full p-3 mt-2 border rounded-lg focus:outline-none bg-white text-black"
                            placeholder="Enter your email"
                        />

                        <label className="block text-black mt-4">Password</label>
                        <input
                            type="password"
                            className="w-full p-3 mt-2 border rounded-lg focus:outline-none bg-white text-black"
                            placeholder="Enter your password"
                        />

                        <label className="block text-black mt-4">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full p-3 mt-2 border rounded-lg focus:outline-none bg-white text-black"
                            placeholder="Confirm your password"
                        />
                    </div>

                    <p className="text-center text-black mt-4">
                            Already have an account?{" "}
                        <a href="/login" className="text-blue-600 font-semibold italic">
                            Login here
                        </a>
                    </p>
                    
                    <button className="w-full mt-6 bg-[#F5F9D6] py-3 rounded-lg text-black font-bold hover:bg-[#E8F0C8] transition">
                        Register
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}
