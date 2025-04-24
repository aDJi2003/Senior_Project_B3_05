import React from "react";
import Image from "next/image";
import NavbarBackground from "@/components/navbar-background";
import Footer from "@/components/footer";

const ContactPage = () => {
  return (
    <div>
      <NavbarBackground />
      
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-8 bg-white">
        <div className="w-full md:w-1/2 flex justify-center">
          <Image src="/contact.png" alt="Contact" width={500} height={500} />
        </div>

        <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-16">
          <h1 className="text-5xl font-bold text-black mb-6 font-bebas-neue">
            CONTACT US FOR ANY INFORMATION ABOUT TRASHIFY
          </h1>
          <p className="text-gray-700 leading-relaxed">
            We're here to help! Whether you have questions about how Trashify
            works, need assistance with waste classification, or want to
            collaborate with us in promoting responsible waste management, feel
            free to reach out. Our team is committed to supporting sustainable
            practices and ensuring your experience with Trashify is smooth and
            impactful. Let's create a cleaner future together—one step at a
            time.
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 pb-30 bg-white">
        <div className="bg-[#f5ffbd] p-6 rounded-xl text-center w-72">
          <h2 className="text-2xl font-bold mb-4 text-black font-bebas-neue">CALL US DIRECTLY</h2>
          <Image src="/phone.png" alt="Phone" width={50} height={50} className="mx-auto mb-2" />
          <p className="text-black font-medium">+62 812-1111-1111</p>
        </div>

        <div className="bg-[#f5ffbd] p-6 rounded-xl text-center w-72">
          <h2 className="text-2xl font-bold mb-4 text-black font-bebas-neue">FIND US ON SOCIAL MEDIA</h2>
          <Image src="/ig.png" alt="Instagram" width={50} height={50} className="mx-auto mb-2" />
          <p className="text-black font-medium">@trash-ify</p>
        </div>

        <div className="bg-[#f5ffbd] p-6 rounded-xl text-center w-72">
          <h2 className="text-2xl font-bold mb-4 text-black font-bebas-neue">OUR EMAIL</h2>
          <Image src="/mail.png" alt="Email" width={50} height={50} className="mx-auto mb-2" />
          <p className="text-black font-medium">needtrashify@gmail.com</p>
        </div>
    </div>
    <Footer />
    </div>
  );
};

export default ContactPage;
