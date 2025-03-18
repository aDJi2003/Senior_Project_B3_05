import Footer from '@/components/footer';
import NavbarUser from '@/components/navbar-user';
import React from 'react';
import Image from 'next/image';

const images = ['/organic_waste.png', '/organic_waste.png', '/organic_waste.png'];

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
                <h2 className='text-black text-2xl font-semibold mb-[2vh]'>Organic Waste</h2>
                <div className='w-full gap-4 flex items-center mb-[3vh]'>
                    {images.map((src, index) => (
                        <Image key={index} src={src} alt='organic_waste' width={400} height={300} />
                    ))}
                </div>
                
                <Section title='What is Organic Waste?'>
                    <p className='text-black font-light text-lg'>Organic waste includes biodegradable materials such as food scraps, garden waste,
                    and other natural materials that decompose over time.</p>
                </Section>
                
                <Section title='How to Recycle Organic Waste:'>
                    <ol className='font-light text-black text-lg'>
                        {steps.map((item, index) => (
                            <li key={index}>{index + 1}. <span className='font-bold'>{item.step}</span> {item.desc}</li>
                        ))}
                    </ol>
                </Section>
                
                <Section title='Benefits of Recycling Organic Waste:'>
                    <ol className='font-light text-black text-lg'>
                        {benefits.map((benefit, index) => (
                            <li key={index}>{index + 1}. {benefit}</li>
                        ))}
                    </ol>
                </Section>
                
                <h3 className='text-black text-lg'><span className='font-bold'>Solution: </span>Use apps like Trashify to identify organic waste and learn how to compost or dispose of it properly for a more sustainable environment! 🌱♻️</h3>
            </div>
            <Footer />
        </div>
    );
};

export default Page;