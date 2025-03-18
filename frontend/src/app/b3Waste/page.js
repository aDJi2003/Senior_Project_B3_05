import Footer from '@/components/footer';
import NavbarUser from '@/components/navbar-user';
import React from 'react';
import Image from 'next/image';

const images = ['/b3_waste.png', '/b3_waste.png', '/b3_waste.png'];

const steps = [
    { step: 'Toxic', desc: 'Contains poisonous substances that can cause harm if ingested, inhaled, or absorbed by the skin (e.g., pesticides, lead batteries).' },
    { step: 'Flammable', desc: 'Easily catches fire, posing a fire or explosion risk (e.g., gasoline, alcohol, solvents).' },
    { step: 'Corrosive', desc: 'Can cause damage to living tissues or materials (e.g., acids, strong bases, bleach).' },
    { step: 'Reactive', desc: 'Can undergo dangerous chemical reactions when exposed to other substances (e.g., lithium batteries, ammonia).' },
    { step: 'Infectious', desc: 'Contains harmful biological agents like bacteria or viruses (e.g., medical waste, used syringes).' }
];

// Ganti konten section ketiga sesuai kebutuhan
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
                <h2 className='text-black text-2xl font-semibold mb-[2vh]'>B3 Waste</h2>
                <div className='w-full gap-4 flex items-center mb-[3vh]'>
                    {images.map((src, index) => (
                        <Image key={index} src={src} alt='b3_waste' width={400} height={300} />
                    ))}
                </div>
                
                <Section title='B3 Waste (Hazardous and Toxic Waste) Overview'>
                    <p className='text-black font-light text-lg'>
                        B3 waste, or Hazardous and Toxic Waste, refers to waste materials that contain substances 
                        that can be harmful to humans, animals, and the environment. These materials require special 
                        handling and disposal methods to prevent pollution and health hazards.
                    </p>
                </Section>
                
                <Section title='Characteristics of B3 Waste:'>
                    <ol className='font-light text-black text-lg list-decimal ml-5'>
                        {steps.map((item, index) => (
                            <li key={index} className='mb-2'>
                                <span className='font-bold'>{item.step}</span> – {item.desc}
                            </li>
                        ))}
                    </ol>
                </Section>
                
                {/* Section ketiga dimodifikasi agar mirip dengan teks pada gambar */}
                <Section title='Safe Disposal & Management of B3 Waste:'>
                    <ol className='font-light text-black text-lg list-decimal ml-5'>
                        {disposalMethods.map((method, index) => (
                            <li key={index} className='mb-2'>
                                <span className='font-bold'>{method.title}</span>
                                <ul className='list-disc ml-5'>
                                    {method.details.map((detail, i) => (
                                        <li key={i}>{detail}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ol>
                </Section>
                
                <h3 className='text-black text-lg'>
                    <span className='font-bold'>Solution: </span>
                    Use apps like Trashify to identify hazardous waste and guide users on proper disposal methods!
                </h3>
            </div>
            <Footer />
        </div>
    );
};

export default Page;
