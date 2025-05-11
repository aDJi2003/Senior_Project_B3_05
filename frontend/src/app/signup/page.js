"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import NavbarBackground from "@/components/navbar-background";
import Footer from "@/components/footer";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const { register } = useAuth();
  const router = useRouter();
  const nameInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = (pwd) => /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(pwd);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isEmailValid(formData.email)) {
      const msg = "Email tidak valid.";
      setError(msg);
      toast.error(msg);
      return;
    }

    if (!isPasswordValid(formData.password)) {
      const msg =
        "Password harus minimal 8 karakter dan mengandung huruf serta angka.";
      setError(msg);
      toast.error(msg);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      const msg = "Password dan konfirmasi tidak sama!";
      setError(msg);
      toast.error(msg);
      return;
    }

    try {
      setLoading(true);
      await register(formData.name, formData.email, formData.password);
      const successMsg = "Registrasi berhasil! Mengalihkan ke halaman login...";
      setSuccess(successMsg);
      toast.success(successMsg);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      const msg =
        err.response?.data?.message || "Registrasi gagal. Silakan coba lagi.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputs = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Enter your name",
      ref: nameInputRef,
      required: true,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      type: showPassword ? "text" : "password",
      placeholder: "Enter your password",
      toggle: () => setShowPassword((v) => !v),
      icon: showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />,
      required: true,
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: showConfirmPassword ? "text" : "password",
      placeholder: "Confirm your password",
      toggle: () => setShowConfirmPassword((v) => !v),
      icon: showConfirmPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />,
      required: true,
    },
  ];

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
          <h2 className="text-2xl font-bold text-center text-black">
            Register
          </h2>

          {error && <p className="text-red-600 text-center mt-2">{error}</p>}
          {success && (
            <p className="text-green-600 text-center mt-2">{success}</p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mt-6 space-y-4">
              {inputs.map((field) => (
                <div key={field.name}>
                  <label className="block text-black">{field.label}</label>
                  <div className={field.toggle ? "relative" : ""}>
                    <input
                      ref={field.ref}
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full p-3 mt-2 border rounded-lg focus:outline-none bg-white text-black"
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                    {field.toggle && (
                      <span
                        className="absolute top-[60%] right-4 transform -translate-y-1/2 cursor-pointer text-black"
                        onClick={field.toggle}
                      >
                        {field.icon}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-black mt-4">
              Already have an account?{" "}
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
