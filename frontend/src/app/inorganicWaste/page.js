import Footer from '@/components/footer';
import NavbarUser from '@/components/navbar-user';
import React from 'react';
import Image from 'next/image';

const images = ['/inorganic_waste.png', '/inorganic_waste.png', '/inorganic_waste.png'];

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
    <div className='flex flex-col gap-1 mb-[3vh]'>
        <h2 className='text-black text-2xl font-semibold'>{title}</h2>
        {children}
    </div>
);

const Page = () => {
    return (
        <div className='min-h-screen flex flex-col justify-between bg-gray-100 font-poppins'>
            <NavbarUser />
            <div className='flex flex-col mt-[18vh] mx-[10vw] mb-[5vh]'>
                <h2 className='text-black text-2xl font-semibold mb-[2vh]'>Inorganic Waste</h2>
                <div className='w-full gap-4 flex items-center mb-[3vh]'>
                    {images.map((src, index) => (
                        <Image key={index} src={src} alt='organic_waste' width={400} height={300} />
                    ))}
                </div>
                
                <Section title='What is Inorganic Waste?'>
                    <p className='text-black font-light text-lg'>Inorganic waste consists of materials that do not decompose easily or naturally, such as plastic, glass, metal, and electronic waste. These materials take hundreds to thousands of years to break down in the environment.</p>
                </Section>
                
                <Section title='How to Recycle Inorganic Waste:'>
                    <ol className='font-light text-black text-lg'>
                        {steps.map((item, index) => (
                            <li key={index}>{index + 1}. <span className='font-bold'>{item.step}</span> {item.desc}</li>
                        ))}
                    </ol>
                </Section>
                
                <Section title='Benefits of Recycling Inorganic Waste:'>
                    <ol className='font-light text-black text-lg'>
                        {benefits.map((benefit, index) => (
                            <li key={index}>{index + 1}. {benefit}</li>
                        ))}
                    </ol>
                </Section>
                
                <h3 className='text-black text-lg'><span className='font-bold'>Solution: </span>Use apps like Trashify to classify inorganic waste and find the best recycling or disposal methods to reduce pollution and promote sustainability! 🚮🔄</h3>
            </div>
            <Footer />
        </div>
    );
};

export default Page;
