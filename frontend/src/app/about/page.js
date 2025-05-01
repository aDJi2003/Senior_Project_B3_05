import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-white">
      <div className="absolute top-0 left-0 w-full z-0">
        <Image
          src="/trees.png"
          alt="Trees background"
          layout="responsive"
          width={1920}
          height={1080}
          className="object-contain object-top"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-[8rem] md:text-[9.5rem] lg:text-[12.5rem] xl:text-[15.5rem] font-bold tracking-widest leading-none font-bebas-neue">
            OUR MISSION
          </h1>
        </div>
      </div>

      <Navbar />

      <div className="relative pt-[10rem] md:pt-[20rem] lg:pt-[35rem] px-4 md:px-32">
        <div className="flex flex-row items-center justify-between mt-32">
          <div className="md:w-1/5 flex items-center">
            <h2 className="text-7xl font-bold text-black font-bebas-neue">TRASHIFY</h2>
          </div>
          <div className="md:w-4/5">
            <p className="text-base md:text-xl leading-relaxed text-black">
              At Trashify, our mission is to empower people to manage waste responsibly.
              We strive to reduce pollution, protect the environment, and raise awareness about
              proper waste disposal. By leveraging technology, we make waste classification
              fast, easy, and accurate. Join us in building a community of eco-conscious users
              who care about the environment and the future of our planet!
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-32">
        <div className="w-full md:w-[30%] flex justify-start">
          <Image
            src="/left.png"
            alt="Person with recycling bin"
            width={450}
            height={450}
          />
        </div>

        <div className="w-full md:w-[30%] px-4 text-center md:text-left">
          <h2 className="text-7xl font-bold text-black font-bebas-neue">OUR VISION</h2>
          <p className="text-base md:text-xl leading-relaxed text-black mt-4">
            Our goal is to create a cleaner, greener world for future generations.
            We believe that everyone can make a difference, and we are committed to
            providing the tools and resources needed to make waste management easier
            and more effective. Together, we can create a sustainable future for our planet.
          </p>
        </div>

        <div className="w-full md:w-2/5 flex justify-end">
          <Image
            src="/right.png"
            alt="Waste management worker"
            width={700}
            height={700}
          />
        </div>
      </div>

      <div className="relative z-10 bg-white px-4 md:px-32 text-black mb-[10vh]">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Simplifying Waste Disposal Responsibly
            </h2>
            <p className="text-lg">
              {`Trashify makes waste disposal easy and eco-friendly. Upload a photo, and our system classifies it as
              organic, inorganic, or B3. Small actions lead to big changes—let's create cleaner, greener communities
              together!`}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
