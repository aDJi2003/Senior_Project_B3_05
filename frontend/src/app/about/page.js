"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const aboutVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const missionVariants = {
  hiddenLeft: { opacity: 0, x: -100 },
  hiddenRight: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

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
          <motion.h1
            className="text-white text-[4rem] sm:text-[7rem] md:text-[9.5rem] lg:text-[12.5rem] xl:text-[15.5rem] font-bold tracking-widest leading-none font-bebas-neue"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            OUR MISSON
          </motion.h1>
        </div>
      </div>

      <Navbar />

      <div className="relative pt-[10rem] sm:pt-[15rem] md:pt-[20rem] lg:pt-[25rem] xl:pt-[35rem] px-10 sm:px-12 md:px-18 xl:px-32">
        <div className="flex flex-col md:flex-row items-center justify-between mt-32 gap-5">
          <motion.h2
            className="md:w-1/4 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-black font-bebas-neue"
            initial="hiddenLeft"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={missionVariants}
            transition={{ duration: 0.6 }}
          >
            TRASHIFY
          </motion.h2>
          <motion.div
            className="md:w-3/4"
            initial="hiddenRight"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={missionVariants}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-sm sm:text-base md:text-xl leading-relaxed text-black">
              At Trashify, our mission is to empower people to manage waste
              responsibly. We strive to reduce pollution, protect the
              environment, and raise awareness about proper waste disposal. By
              leveraging technology, we make waste classification fast, easy,
              and accurate. Join us in building a community of eco-conscious
              users who care about the environment and the future of our planet!
            </p>
          </motion.div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-32">
        <motion.div
          className="w-full md:w-[30%] flex justify-start"
          initial="hiddenLeft"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={missionVariants}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Image
            src="/left.png"
            alt="Person with recycling bin"
            width={450}
            height={450}
          />
        </motion.div>

        <div className="w-full md:w-[30%] px-4 text-center md:text-left">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-black font-bebas-neue"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={aboutVariants}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            OUR VISION
          </motion.h2>
          <motion.p
            className="text-sm sm:text-base md:text-xl leading-relaxed text-black mt-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={aboutVariants}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Our goal is to create a cleaner, greener world for future
            generations. We believe that everyone can make a difference, and we
            are committed to providing the tools and resources needed to make
            waste management easier and more effective. Together, we can create
            a sustainable future for our planet.
          </motion.p>
        </div>

        <motion.div
          className="w-full md:w-2/5 flex justify-end"
          initial="hiddenRight"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={missionVariants}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Image
            src="/right.png"
            alt="Waste management worker"
            width={700}
            height={700}
          />
        </motion.div>
      </div>

      <div className="relative z-10 bg-white px-6 sm:px-10 md:px-18 xl:px-32 text-black mb-[10vh]">
        <div className="container mx-auto mt-[5vh] md:mt-[4vh] lg:mt-0">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold mb-[3vh] sm:mb-[4vh] lg:mb-[5vh]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={aboutVariants}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Simplifying Waste Disposal Responsibly
            </motion.h2>
            <motion.p
              className="text-sm sm:text-base md:text-xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={aboutVariants}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {`Trashify makes waste disposal easy and eco-friendly. Upload a photo, and our system classifies it as
              organic, inorganic, or B3. Small actions lead to big changes—let's create cleaner, greener communities
              together!`}
            </motion.p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
