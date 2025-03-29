'use client';

import Footer from '@/components/footer';
import NavbarUser from '@/components/navbar-user';
import React from 'react';
import Image from 'next/image';
import ProgressCard from '@/components/progressCard';
import Link from 'next/link';
import { useAuth } from "@/context/AuthContext";
import FunFactCard from '@/components/funFactCard';

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
        data: [3.5, 2.0, 3.0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
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
              <button className="relative rounded-2xl flex justify-center items-center w-[380px] h-[130px] cursor-pointer">
                <Image
                  src={card.src}
                  alt={card.alt}
                  width={400}
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
                weight="0.0/10 Kg"
                information="This milestone will reset within 7 days"
              />
            </div>
            <div className="flex-1">
              <ProgressCard
                title="Most Frequent Waste"
                weight="Organic"
                information="This milestone will reset within 7 days"
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
