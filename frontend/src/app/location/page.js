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
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          <p className="text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100 font-poppins">
      <NavbarUser />
      <div className="w-full h-[89vh] mt-[11vh]">
        <ClientMap />
      </div>
    </div>
  );
};

export default Page;
