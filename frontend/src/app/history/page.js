import Footer from '@/components/footer';
import NavbarBackground from '@/components/navbar-background';
import React from 'react';
import WasteCard from '@/components/wasteCard';

const Page = () => {
    return (
        <div className="min-h-screen flex flex-col justify-between bg-gray-100 font-poppins">
            <NavbarBackground />
            <div className='flex flex-col mt-[18vh] mb-[5vh] gap-3 mx-[10vw]'>
                <h2 className='font-semibold text-2xl text-black'>Waste History</h2>
                <div className='flex flex-wrap gap-10 justify-between items-center'>
                    <WasteCard />
                    <WasteCard />
                    <WasteCard />
                    <WasteCard />
                    <WasteCard />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Page;
