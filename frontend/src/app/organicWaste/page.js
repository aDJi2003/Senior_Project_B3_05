'use client'

import Footer from '@/components/footer';
import NavbarUser from '@/components/navbar-user';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const images = ['/organic_waste.png', '/organic_waste_1.jpg', '/organic_waste_2.jpg'];

const steps = [
    { step: 'Separate organic waste', desc: 'from non-biodegradable materials like plastic or metal.' },
    { step: 'Compost at home', desc: 'by using a compost bin or pile in your garden.' },
    { step: 'Use composting techniques', desc: 'such as vermicomposting (using worms) or aerobic composting.' },
    { step: 'Turn organic waste into fertilizer', desc: 'to improve soil quality for plants.' },
    { step: 'Dispose of organic waste properly', desc: 'if composting is not possible—some cities offer organic waste collection services.' }
];

const benefits = [
    'Reduces landfill waste and greenhouse gas emissions.',
    'Produces nutrient-rich compost for plants and gardens.',
    'Supports sustainable agriculture and urban greenery.',
    'Helps manage household waste in an eco-friendly way.'
];

const Section = ({ title, children }) => (
    <div className='flex flex-col gap-3 mb-10'>
        <h2 className='text-green-700 text-3xl font-semibold border-l-4 border-green-600 pl-3'>{title}</h2>
        {children}
    </div>
);

const Page = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className='min-h-screen flex flex-col bg-gray-50 font-poppins'>
            <NavbarUser />
            <div className='flex flex-col mt-[12vh] mx-auto max-w-5xl p-6'>
                <h2 className='text-black text-4xl font-bold text-center mb-8'>Organic Waste</h2>
                
                <div className='grid grid-cols-3 gap-4 mb-10'>
                    {images.map((src, index) => (
                        <div 
                            key={index} 
                            className='relative w-full h-64 rounded-lg overflow-hidden shadow-md cursor-pointer'
                            onClick={() => setSelectedImage(src)}
                        >
                            <Image src={src} alt='organic_waste' fill className='object-cover' />
                        </div>
                    ))}
                </div>
                
                <Section title='What is Organic Waste?'>
                    <p className='text-gray-700 text-lg leading-relaxed bg-white p-4 shadow-md rounded-lg'>
                        Organic waste includes biodegradable materials such as <span className='text-green-500'>food scraps, garden waste,
                        and other natural materials </span>that decompose over time.
                    </p>
                </Section>
                
                <Section title='How to Recycle Organic Waste:'>
                    <div className='grid md:grid-cols-2 gap-6'>
                        {steps.map((item, index) => (
                            <div key={index} className='p-4 shadow-lg border-l-4 border-green-500 rounded bg-white'>
                                <h3 className='text-xl font-bold text-green-700'>{index + 1}. {item.step}</h3>
                                <p className='text-gray-700'>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </Section>
                
                <Section title='Benefits of Recycling Organic Waste:'>
                    <div className='grid md:grid-cols-2 gap-6'>
                        {benefits.map((benefit, index) => (
                            <div key={index} className='p-4 shadow-lg border-l-4 border-green-500 rounded bg-white'>
                                <p className='text-gray-700'><span className='text-green-700 font-bold'>{index + 1}.</span> {benefit}</p>
                            </div>
                        ))}
                    </div>
                </Section>
                
                <div className='bg-green-100 p-6 rounded-lg text-center shadow-md'>
                    <h3 className='text-xl font-semibold text-green-700 mb-2'>Solution:</h3>
                    <p className='text-gray-700 mb-4'>
                        Use apps like <span className='font-bold'>Trashify</span> to identify organic waste and learn how to compost or dispose of it properly for a more sustainable environment!
                    </p>
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
                            <Image src={selectedImage} alt="enlarged organic waste" width={800} height={600} className="object-contain rounded-lg" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <Footer />
        </div>
    );
};

export default Page;
