"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import NavbarBackground from "@/components/navbar-background";
import Footer from "@/components/footer";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      toast.success("Login berhasil!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err) {
      let message;
      if (err.message === "Network Error" || err.response?.status >= 500) {
        message = "Unable to connect to the server. Please try again later.";
      } else {
        message = "Invalid email or password";
      }
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <NavbarBackground />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
      />

      <div className="flex flex-1 justify-center items-center mt-[18vh] mb-[6vh]">
        <div className="bg-[#D4E0A8] p-10 rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-center text-black">Login</h2>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          <form onSubmit={handleLogin} className="mt-6">
            <div>
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
            </div>

            <div className="mt-4 relative">
              <label className="block text-black">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 mt-2 border rounded-lg focus:outline-none bg-white text-black"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute top-[70%] right-4 transform -translate-y-1/2 cursor-pointer text-black"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </span>
            </div>

            <p className="text-center text-black mt-4">
              {"Don't have an account yet? "}
              <a
                href="/signup"
                className="text-blue-600 font-semibold italic"
              >
                Register here
              </a>
            </p>

            <button
              type="submit"
              className="w-full mt-6 bg-[#F5F9D6] py-3 rounded-lg text-black font-bold hover:bg-[#E8F0C8] transition cursor-pointer disabled:opacity-50"
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
