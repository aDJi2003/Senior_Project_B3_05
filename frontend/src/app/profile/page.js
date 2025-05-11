"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import NavbarUser from "@/components/navbar-user";
import Footer from "@/components/footer";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { FiEdit, FiUpload } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const { user, loading, logout, updateProfile } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("/profile.png");
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      const validImageUrl = user.profile_image?.startsWith("http")
        ? user.profile_image
        : "/profile.png";
      setPreviewUrl(validImageUrl);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  if (!user) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const isDirty =
    name !== (user.name || "") ||
    email !== (user.email || "") ||
    avatarFile !== null;

  const handleSave = async () => {
    if (!isDirty) return;
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      if (avatarFile) formData.append("profileImage", avatarFile);

      await updateProfile(formData);
      toast.success("Profile updated successfully");
      setEditingName(false);
      setEditingEmail(false);
    } catch (err) {
      console.error("Failed to update profile", err);
      toast.error(
        err.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <NavbarUser />

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
      />

      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white">
        <div className="bg-[#D4E0A8] rounded-2xl p-10 w-[40%] shadow-lg flex flex-col items-center mt-[18vh] mb-[6vh]">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Edit Profile
          </h1>

          {/* Avatar Preview and Upload */}
          <div className="relative w-[120px] h-[120px] mb-6">
            <Image
              src={previewUrl}
              alt="Profile Picture"
              fill
              className="rounded-full object-cover"
            />
            <label className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow cursor-pointer">
              <FiUpload size={20} color="black" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* Name Field */}
          <div className="w-full mb-4 relative">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              disabled={!editingName}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-2 rounded-lg outline-none pl-4 pr-10 bg-white text-black ${
                editingName ? "border border-gray-400" : "border border-transparent"
              }`}
            />
            <FiEdit
              size={18}
              color="black"
              className="absolute top-[40px] right-3 cursor-pointer"
              onClick={() => setEditingName((prev) => !prev)}
            />
          </div>

          {/* Email Field */}
          <div className="w-full mb-6 relative">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              disabled={!editingEmail}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2 rounded-lg outline-none pl-4 pr-10 bg-white text-black ${
                editingEmail ? "border border-gray-400" : "border border-transparent"
              }`}
            />
            <FiEdit
              size={18}
              color="black"
              className="absolute top-[40px] right-3 cursor-pointer"
              onClick={() => setEditingEmail((prev) => !prev)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 w-full">
            <button
              onClick={handleSave}
              disabled={!isDirty || saving}
              className={`flex-1 bg-[#F4FFC3] text-gray-800 py-2 rounded-lg font-semibold hover:bg-[#E8F7A0] transition disabled:opacity-50 ${
                !isDirty || saving ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={logout}
              className="flex-1 bg-red-400 text-white py-2 rounded-lg font-semibold hover:bg-red-500 transition cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
