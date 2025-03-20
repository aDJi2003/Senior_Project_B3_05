'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import NavbarUser from '@/components/navbar-user';

const ClientMap = dynamic(() => import('@/components/ClientMap'), {
  ssr: false,
});

const Page = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100 font-poppins">
      <NavbarUser />
      <div className="w-full h-[87vh] mt-[13vh]">
        <ClientMap />
      </div>
    </div>
  );
};

export default Page;
