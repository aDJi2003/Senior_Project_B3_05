'use client';
import Footer from '@/components/footer';
import NavbarUser from '@/components/navbar-user';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const images = ['/inorganic_waste.png', '/inorganic_waste_1.jpg', '/inorganic_waste_2.jpg'];

const steps = [
    { step: 'Separate waste', desc: 'based on material (plastic, metal, glass).' },
    { step: 'Clean and dry', desc: 'plastic, glass, and metal before recycling.' },
    { step: 'Reuse items', desc: 'such as plastic bottles and glass jars whenever possible.' },
    { step: 'Bring recyclables to proper facilities', desc: 'or use designated recycling bins.' },
    { step: 'Dispose of hazardous inorganic waste', desc: 'at specialized collection centers.' }
];

const benefits = [
    'Reduces environmental pollution and conserves natural resources.',
    'Lowers the amount of waste sent to landfills.',
    'Saves energy compared to producing new materials from raw resources.',
    'Helps create jobs in the recycling and waste management industries.'
];

const Section = ({ title, children }) => (
    <div className='flex flex-col gap-3 mb-10'>
        <h2 className='text-green-700 text-3xl font-semibold border-l-4 border-green-600 pl-3'>{title}</h2>
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
                        className="text-green-700 text-lg font-light cursor-pointer hover:underline hover:text-green-900 transition flex items-center"
                        onClick={() => router.push('/b3Waste')}
                    >
                        <FaAngleLeft className="mr-1" /> B3 Waste
                    </span>

                    <h2 className='text-black text-4xl font-bold text-center'>Inorganic Waste</h2>

                    <span 
                        className="text-green-700 text-lg font-light cursor-pointer hover:underline hover:text-green-900 transition flex items-center"
                        onClick={() => router.push('/organicWaste')}
                    >
                        Organic Waste <FaAngleRight className="ml-1" />
                    </span>
                </div>

                <div className='grid grid-cols-3 gap-4 mb-10'>
                    {images.map((src, index) => (
                        <div 
                            key={index} 
                            className='relative w-full h-64 rounded-lg overflow-hidden shadow-md cursor-pointer'
                            onClick={() => setSelectedImage(src)}
                        >
                            <Image src={src} alt='inorganic_waste' fill className='object-cover' />
                        </div>
                    ))}
                </div>
                <Section title='What is Inorganic Waste?'>
                    <p className='text-gray-700 text-lg leading-relaxed bg-white p-4 shadow-md rounded-lg'>
                        Inorganic waste consists of materials that do not decompose easily or naturally, such as <span className='font-semibold text-green-500'>plastic, glass, metal, and electronic waste</span>. These materials take hundreds to thousands of years to break down in the environment.
                    </p>
                </Section>
                <Section title='How to Recycle Inorganic Waste:'>
                    <div className='grid md:grid-cols-2 gap-6'>
                        {steps.map((item, index) => (
                            <div key={index} className='p-4 shadow-lg border-l-4 border-green-500 rounded bg-white'>
                                <h3 className='text-xl font-bold text-green-500'>{index + 1}. {item.step}</h3>
                                <p className='text-gray-700'>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </Section>
                <Section title='Benefits of Recycling Inorganic Waste:'>
                    <div className='grid md:grid-cols-2 gap-6'>
                        {benefits.map((benefit, index) => (
                            <div key={index} className='p-4 shadow-lg border-l-4 border-green-500 rounded bg-white'>
                                <p className='text-gray-700'><span className='text-green-500 font-bold'>{index + 1}.</span> {benefit}</p>
                            </div>
                        ))}
                    </div>
                </Section>
                <div className='bg-green-100 p-6 rounded-lg text-center shadow-md'>
                    <h3 className='text-xl font-semibold text-green-700 mb-2'>Solution:</h3>
                    <p className='text-gray-700 mb-4'>Use apps like <span className='font-bold'>Trashify</span> to classify inorganic waste and find the best recycling or disposal methods to reduce pollution and promote sustainability!</p>
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
                            <Image src={selectedImage} alt="enlarged inorganic waste" width={800} height={600} className="object-contain rounded-lg" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <Footer />
        </div>
    );
};

export default Page;
