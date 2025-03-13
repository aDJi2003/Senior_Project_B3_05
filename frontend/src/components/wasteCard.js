import React from 'react';
import Image from 'next/image';

const WasteCard = () => {
  return (
    <div className="border-2 border-[#809D3C] rounded-lg w-auto max-w-[50vw] px-4 py-4">
      {/* Bagian Atas: Timestamp, Mass of Weight, dan View Location */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-[#809D3C] text-center">
        {/* Timestamp */}
        <div className="flex flex-col items-center text-center md:items-start text-black">
          <p className="font-bold">Timestamp</p>
          <p className='text-gray-700'>11 - 02 - 2025</p>
        </div>
        
        {/* Mass of Weight */}
        <div className="flex flex-col items-center text-center md:items-start text-black">
          <p className="font-bold">Mass of Weight</p>
          <p className='text-gray-700'>12 Kg</p>
        </div>
        
        {/* Tombol View Location */}
        <button className="border border-[#809D3C] text-black rounded-md px-4 py-2 hover:bg-green-50 transition font-semibold cursor-pointer">
          View Location
        </button>
      </div>
      
      {/* Bagian Bawah: Gambar + Status dan Tipe Sampah */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-4">
        {/* Gambar sampah */}
        <div className="mb-4 mr-4">
          <div className="border border-gray-300">
            <Image
              src="/sample_waste.png" // Ganti dengan path gambar Anda
              alt="Sampah Organik"
              width={400}
              height={325}
              className="object-cover"
            />
          </div>
        </div>
        
        {/* Status dan Tipe Sampah */}
        <div className="flex flex-col gap-4">
          <div className='flex flex-col items-center justify-center'>
            <p className="font-semibold text-black">Status</p>
            <p className="text-gray-700">Completed</p>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <p className="font-semibold text-black">Type of Waste</p>
            <p className="text-gray-700">Organic</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasteCard;