"use client";

import React from "react";
import Footer from "@/components/footer";
import NavbarUser from "@/components/navbar-user";
import { useHistory } from "@/context/HistoryContext";

const Page = () => {
  const { history, loading, error } = useHistory();

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return !isNaN(date) ? date.toLocaleDateString() : "Invalid Date";
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100 font-poppins">
      <NavbarUser />

      <div className="flex flex-col mt-[18vh] mb-[5vh] gap-3 mx-[10vw]">
        <h2 className="font-semibold text-2xl text-black">Waste History</h2>
        <div className="flex justify-center">
          <div className="bg-white px-4 py-7 rounded-lg shadow w-full overflow-y-auto">
            <p className="text-center font-semibold mb-4 text-black">
              Waste History Table
            </p>

            {loading ? (
              <div className="flex justify-center items-center py-4">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : history.length > 0 ? (
              <table className="min-w-full text-left text-sm text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">Weight</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((row, idx) => (
                    <tr key={idx} className="bg-white border-b">
                      <td className="px-6 py-4">{formatDate(row.waktu)}</td>
                      <td className="px-6 py-4">
                        {row.type_of_waste || "Unknown"}
                      </td>
                      <td className="px-6 py-4">
                        {row.mass_of_weight || "Unknown"}
                      </td>
                      <td className="px-6 py-4">{row.status || "Unknown"}</td>
                      <td className="px-6 py-4">{row.location || "Unknown"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center py-4">No data available.</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;
