"use client";
import React from "react";
import Image from "next/image";
import NavbarBackground from "@/components/navbar-background";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import ChatWidget from "@/components/ChatWidget";

const heroVariants = {
  hiddenLeft: { opacity: 0, x: -100 },
  hiddenRight: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.8 },
  }),
};

const contactMethods = [
  {
    title: "CALL US DIRECTLY",
    icon: "/phone.png",
    info: "+62 812-1111-1111",
    href: "tel:+628121111111",
    delay: 0.2,
  },
  {
    title: "FIND US ON SOCIAL MEDIA",
    icon: "/ig.png",
    info: "@trash-ify",
    href: "https://instagram.com/trash-ify",
    delay: 0.4,
  },
  {
    title: "OUR EMAIL",
    icon: "/mail.png",
    info: "needtrashify@gmail.com",
    href: "mailto:needtrashify@gmail.com",
    delay: 0.6,
  },
];

const ContactPage = () => {
  return (
    <div className="font-poppins bg-white">
      <NavbarBackground />

      <div className="flex flex-col md:flex-row items-center justify-center h-[80vh] lg:min-h-screen pt-[28vh] md:pt-[15vh] lg:pt-[10vh]">
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial="hiddenLeft"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={heroVariants}
          transition={{ ease: 'easeOut', duration: 0.8 }}
        >
          <Image src="/contact.png" alt="Contact" width={500} height={500} />
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 mt-8 md:mt-0 px-[5vw] sm:px-[6vw]"
          initial="hiddenRight"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={heroVariants}
          transition={{ ease: 'easeOut', duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-black mb-6 font-bebas-neue text-center md:text-left">
            CONTACT US FOR ANY INFORMATION ABOUT TRASHIFY
          </h1>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base xl:text-lg">
            {`We're here to help! Whether you have questions about how Trashify
            works, need assistance with waste classification, or want to
            collaborate with us in promoting responsible waste management, feel
            free to reach out. Our team is committed to supporting sustainable
            practices and ensuring your experience with Trashify is smooth and
            impactful. Let's create a cleaner future together—one step at a
            time.`}
          </p>
        </motion.div>
      </div>

      <section className="flex flex-col md:flex-row justify-center items-center gap-8 mt-[20vh] md:mt-[10vh] lg:mt-0 pb-10 md:pb-16 px-[5vw]">
        {contactMethods.map(({ title, icon, info, href, delay }, i) => (
          <motion.a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#f5ffbd] p-6 rounded-xl text-center w-72 hover:shadow-lg transition cursor-pointer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            custom={delay}
            variants={cardVariants}
          >
            <h2 className="text-2xl font-bold mb-4 text-black font-bebas-neue">
              {title}
            </h2>
            <Image
              src={icon}
              alt={title}
              width={50}
              height={50}
              className="mx-auto mb-2"
            />
            <p className="text-black font-medium">{info}</p>
          </motion.a>
        ))}
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default ContactPage;
