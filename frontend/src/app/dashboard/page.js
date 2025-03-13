'use client'; 

import Footer from '@/components/footer';
import NavbarBackground from '@/components/navbar-background';
import React from 'react';
import Image from 'next/image';
import ProgressCard from '@/components/progressCard';
import Link from 'next/link';

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
    const dashboardCards = [
        {
          src: '/organic_dashboard.png',
          alt: 'organic_dashboard',
          label: 'Organic',
          link: '/organicWaste'
        },
        {
          src: '/inorganic_dashboard.png',
          alt: 'inorganic_dashboard',
          label: 'Inorganic',
          link: '/inorganicWaste'
        },
        {
          src: '/b3_dashboard.png',
          alt: 'b3_dashboard',
          label: 'B3 Waste',
          link: '/b3Waste'
        },
    ];

  const tableRows = [
    { date: '6 Feb 2025', type: 'Organic', weight: '4 Kg' },
    { date: '6 Feb 2025', type: 'Inorganic', weight: '6 Kg' },
    { date: '6 Feb 2025', type: 'B3', weight: '3 Kg' },
    { date: '7 Feb 2025', type: 'Organic', weight: '2 Kg' },
  ];

  const totalWasteData = {
    labels: ['Organik', 'Anorganik', 'B3'],
    datasets: [
      {
        label: 'Total Sampah (kg)',
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
    plugins: {
      title: {
        display: true,
        text: 'Total Sampah',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='min-h-screen flex flex-col justify-between bg-gray-100 font-poppins'>
      <NavbarBackground />
      <div className='flex flex-col mt-[18vh] mb-[5vh] gap-3 mx-[10vw]'>
        <div className='flex flex-col text-black text-2xl font-bold mb-[3vh]'>
          <h2>Hi, Admin.</h2>
          <h2>Apakah sudah membuang sampah sesuai dengan tempatnya hari ini ?</h2>
        </div>
        <div className='flex gap-5 items-center justify-between mb-[3vh]'>
            {dashboardCards.map((card, idx) => (
            <Link key={idx} href={card.link}>
                <button 
                className='relative rounded-2xl flex justify-center items-center w-[400px] h-[130px] cursor-pointer'
                >
                <Image 
                    src={card.src}
                    alt={card.alt}
                    width={400}
                    height={130}
                    className='w-full h-full rounded-2xl'
                />
                <p className='text-white font-semibold text-xl absolute z-1'>
                    {card.label}
                </p>
                </button>
            </Link>
            ))}
        </div>
        <div className='flex items-center justify-between gap-8 mb-[3vh]'>
          <div className='bg-white p-4 rounded-lg shadow w-1/2'>
            <Bar data={totalWasteData} options={totalWasteOptions} />
            <p className='text-center mt-2 font-semibold text-black'>Statistik Pembuangan Sampah</p>
          </div>
          <div className='bg-white px-4 py-7 rounded-lg shadow w-1/2 overflow-y-auto'>
            <p className='text-center font-semibold mb-4 -py-3 text-black'>Tabel Histori Pembuangan Sampah</p>
            <table className='min-w-full text-left text-sm text-gray-500 h-[20vh]'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-200 sticky top-0 z-10'>
                <tr>
                  <th scope='col' className='px-6 py-3'>Date</th>
                  <th scope='col' className='px-6 py-3'>Type</th>
                  <th scope='col' className='px-6 py-3'>Weight</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, idx) => (
                  <tr key={idx} className='bg-white border-b'>
                    <td className='px-6 py-4'>{row.date}</td>
                    <td className='px-6 py-4'>{row.type}</td>
                    <td className='px-6 py-4'>{row.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='flex items-center justify-between gap-4'>
          <ProgressCard 
            title='Weekly Progress'
            weight='0.0/10 Kg'
            information='This milestone will reset within 7 days'
          />
          <ProgressCard 
            title='Most Frequent Waste'
            weight='Organic'
            information='This milestone will reset within 7 days'
          />
          <ProgressCard 
            title='Weekly Progress'
            weight='0.0/10 Kg'
            information='This milestone will reset within 7 days'
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
