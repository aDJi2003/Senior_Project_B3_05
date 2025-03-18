'use client'
import React, { useRef } from 'react';
import Image from 'next/image';
import Footer from '@/components/footer';
import NavbarUser from '@/components/navbar-user';

const Page = () => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100 font-poppins">
      <NavbarUser />
      <div className='flex justify-center items-center mt-[23vh]'>
        <div className='w-[60vw] px-[4vw] py-[5vh] rounded-3xl bg-[#A9C46C80] flex flex-col gap-6 items-center'>
          <h2 className='text-4xl font-bold text-black'>Scan Waste</h2>
          <p className='text-xl text-black text-center'>
            Understand waste types and dispose of them properly to protect our environment. 
            Scan to recognize, sort to recycle!
          </p>
          <button 
            className='w-[20vw] rounded-xl bg-[#5D8736] px-4 py-3 flex items-center justify-center gap-3 cursor-pointer'
            onClick={handleButtonClick}
          >
            <p className='text-xl font-bold text-black'>Upload Files</p> 
            <Image src='/upload_file.png' alt="upload_files_image" width={30} height={30} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*" 
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;