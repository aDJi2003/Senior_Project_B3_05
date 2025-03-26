'use client'

import Footer from '@/components/footer';
import NavbarUser from '@/components/navbar-user';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const images = ['/b3_waste.png', '/b3_waste_1.jpg', '/b3_waste_2.jpg'];

const steps = [
    { step: 'Toxic', desc: 'Contains poisonous substances that can cause harm if ingested, inhaled, or absorbed by the skin (e.g., pesticides, lead batteries).' },
    { step: 'Flammable', desc: 'Easily catches fire, posing a fire or explosion risk (e.g., gasoline, alcohol, solvents).' },
    { step: 'Corrosive', desc: 'Can cause damage to living tissues or materials (e.g., acids, strong bases, bleach).' },
    { step: 'Reactive', desc: 'Can undergo dangerous chemical reactions when exposed to other substances (e.g., lithium batteries, ammonia).' },
    { step: 'Infectious', desc: 'Contains harmful biological agents like bacteria or viruses (e.g., medical waste, used syringes).' }
];

const disposalMethods = [
    {
        title: 'Household B3 Waste',
        details: [
            'Store in sealed containers and dispose of at hazardous waste collection centers.',
            'Never pour chemicals or oil down the drain!'
        ]
    },
    {
        title: 'Electronic & Industrial Waste',
        details: [
            'Use e-waste recycling programs.',
            'Follow government regulations for industrial waste treatment.'
        ]
    },
    {
        title: 'Medical & Infectious Waste',
        details: [
            'Must be incinerated or treated in licensed medical waste facilities.'
        ]
    }
];

const Section = ({ title, children }) => (
    <div className='flex flex-col gap-3 mb-10'>
        <h2 className='text-green-700 text-3xl font-semibold border-l-4 border-green-700 pl-3'>{title}</h2>
        {children}
    </div>
);

const Page = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const router = useRouter();

    return (
        <div className='min-h-screen flex flex-col bg-gray-50 font-poppins'>
            <NavbarUser />
            <div className='flex flex-col mt-[12vh] mx-auto max-w-5xl p-6'>
                <div className="flex items-center justify-between mb-8">
                    <span 
                        className="text-green-700 text-lg font-light cursor-pointer hover:underline hover:text-green-900 transition"
                        onClick={() => router.push('/organicWaste')}
                    >
                        &lt; Organic Waste
                    </span>

                    <h2 className='text-black text-4xl font-bold text-center'>B3 Waste</h2>

                    <span 
                        className="text-green-700 text-lg font-light cursor-pointer hover:underline hover:text-green-900 transition"
                        onClick={() => router.push('/inorganicWaste')}
                    >
                        Inorganic Waste &gt;
                    </span>
                </div>
                
                <div className='grid grid-cols-3 gap-4 mb-10'>
                    {images.map((src, index) => (
                        <div 
                            key={index} 
                            className='relative w-full h-64 rounded-lg overflow-hidden shadow-md cursor-pointer'
                            onClick={() => setSelectedImage(src)}
                        >
                            <Image src={src} alt='b3_waste' fill className='object-cover' />
                        </div>
                    ))}
                </div>
                
                <Section title='B3 Waste (Hazardous and Toxic Waste) Overview'>
                    <p className='text-gray-700 text-lg leading-relaxed bg-white p-4 shadow-md rounded-lg'>
                        B3 waste, or Hazardous and Toxic Waste, refers to waste materials that <span className='text-green-500'>contain substances 
                        that can be harmful to humans, animals, and the environment.</span> These materials require special 
                        handling and disposal methods to prevent pollution and health hazards.
                    </p>
                </Section>
                
                <Section title='Characteristics of B3 Waste:'>
                    <div className='grid md:grid-cols-2 gap-6'>
                        {steps.map((item, index) => (
                            <div key={index} className='p-4 shadow-lg border-l-4 border-green-500 rounded bg-white'>
                                <h3 className='text-xl font-bold text-green-500'>{index + 1}. {item.step}</h3>
                                <p className='text-gray-700'>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </Section>
                
                <Section title='Safe Disposal & Management of B3 Waste:'>
                    <div className='grid md:grid-cols-1 gap-6'>
                        {disposalMethods.map((method, index) => (
                            <div key={index} className='p-4 shadow-lg border-l-4 border-green-500 rounded bg-white'>
                                <h3 className='text-xl font-bold text-green-500'>{method.title}</h3>
                                <ul className='list-disc ml-5 text-gray-700'>
                                    {method.details.map((detail, i) => (
                                        <li key={i}>{detail}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </Section>
                
                <div className='bg-green-100 p-6 rounded-lg text-center shadow-md'>
                    <h3 className='text-xl font-semibold text-green-700 mb-2'>Solution:</h3>
                    <p className='text-gray-700 mb-4'>Use apps like <span className='font-bold'>Trashify</span> to identify hazardous waste and guide users on proper disposal methods!</p>
                </div>
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-11/12 md:w-3/4 lg:w-1/2 h-auto"
                        >
                            <Image src={selectedImage} alt="enlarged image" width={800} height={600} className="object-contain rounded-lg" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <Footer />
        </div>
    );
};

export default Page;
