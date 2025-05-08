'use client';

import Footer from '@/components/footer';
import NavbarUser from '@/components/navbar-user';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ProgressCard from '@/components/progressCard';
import Link from 'next/link';
import { useAuth } from "@/context/AuthContext";
import FunFactCard from '@/components/funFactCard';
import { getWeeklyWeight, getTotalWasteData } from "@/services/HistoryServices";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Page = () => {
  const { user } = useAuth();
  const [weeklyWeight, setWeeklyWeight] = useState(0);
  const [totalWaste, setTotalWaste] = useState({ organic: 0, inorganic: 0, b3: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weight = await getWeeklyWeight();
        setWeeklyWeight(weight);

        const wasteData = await getTotalWasteData(); 
        setTotalWaste(wasteData);
      } catch (error) {
        console.error("Failed to fetch data:", error.response?.data || error.message);
      }
    };

    fetchData();
  }, []);

  const getMostFrequentWaste = () => {
    const { organic, inorganic, b3 } = totalWaste;
    const maxWaste = Math.max(organic, inorganic, b3);

    if (maxWaste === organic) return "Organic";
    if (maxWaste === inorganic) return "Inorganic";
    if (maxWaste === b3) return "B3";
    return "Unknown";
  };

  const dashboardCards = [
    {
      src: '/organic_dashboard.png',
      alt: 'organic_dashboard',
      label: 'Organic',
      link: '/organicWaste',
    },
    {
      src: '/inorganic_dashboard.png',
      alt: 'inorganic_dashboard',
      label: 'Inorganic',
      link: '/inorganicWaste',
    },
    {
      src: '/b3_dashboard.png',
      alt: 'b3_dashboard',
      label: 'B3 Waste',
      link: '/b3Waste',
    },
  ];

  const totalWasteData = {
    labels: ['Organic', 'Inorganic', 'B3'],
    datasets: [
      {
        label: 'Total Waste (kg)',
        data: [totalWaste.organic, totalWaste.inorganic, totalWaste.b3],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  const totalWasteOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Total Waste Disposal',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100 font-poppins">
      <NavbarUser />
      <div className="flex flex-col mt-[18vh] mb-[5vh] gap-3 mx-[10vw]">
        <div className="flex flex-col text-black text-2xl font-bold mb-[3vh]">
          <h2>Hi, {user ? user.name : "Loading..."}.</h2>
          <h2>Have you thrown away your trash in the right place today?</h2>
        </div>
        <div className="flex flex-wrap gap-5 items-center justify-between mb-[3vh]">
          {dashboardCards.map((card, idx) => (
            <Link key={idx} href={card.link}>
              <button className="relative rounded-2xl flex justify-center items-center w-[330px] h-[130px] cursor-pointer">
                <Image
                  src={card.src}
                  alt={card.alt}
                  width={330}
                  height={130}
                  className="w-full h-full rounded-2xl"
                />
                <p className="text-white font-semibold text-xl absolute z-10">
                  {card.label}
                </p>
              </button>
            </Link>
          ))}
        </div>
        <div className="flex flex-col lg:flex-row gap-8 mb-[3vh] items-stretch h-[500px]">
          <div className="bg-white p-4 rounded-lg shadow w-[800px] flex flex-col">
            <div className="flex-1 relative">
              <Bar data={totalWasteData} options={totalWasteOptions} />
            </div>
            <p className="text-center mt-2 font-semibold text-black">
              Waste Disposal Statistics
            </p>
          </div>
          <div className="flex flex-col gap-4 w-[380px]">
            <div className="flex-1">
              <ProgressCard
                title="Weekly Progress"
                weight={`${weeklyWeight} Kg`}
                information="The data above shows your progress over the past 7 days."
              />
            </div>
            <div className="flex-1">
              <ProgressCard
                title="Most Frequent Waste"
                weight={getMostFrequentWaste()}
                information="The data above shows your progress over the past 7 days."
              />
            </div>
            <div className="flex-1">
              <FunFactCard />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
