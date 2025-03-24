"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import NavbarUser from "@/components/navbar-user";
import Footer from "@/components/footer";
import { useAuth } from "@/context/AuthContext";

const ProfilePage = () => {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <>
      <NavbarUser />
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white">
        <div className="bg-[#D4E0A8] rounded-2xl p-10 w-[40%] text-center shadow-lg flex flex-col items-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile</h1>
          <Image
            src="/profile.png"
            alt="Profile Picture"
            width={120}
            height={120}
            className="rounded-full mb-4"
          />
          <div className="text-lg text-gray-700 w-full text-left">
            <p className="font-semibold">Full Name</p>
            <p className="mb-3">{user?.name || "No Name"}</p>
            <p className="font-semibold">Email</p>
            <p className="mb-6">{user?.email || "No Email"}</p>
          </div>
          <button
            onClick={logout}
            className="w-full bg-[#F4FFC3] text-gray-800 py-2 rounded-lg font-semibold hover:bg-[#E8F7A0] transition"
          >
            Log Out
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
