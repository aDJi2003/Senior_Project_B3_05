import Image from "next/image";
import Footer from "@/components/footer";
import Link from "next/link";
import NavbarUser from "@/components/navbar-user";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarUser />
      <div className="flex-1 bg-white flex items-center justify-center mt-[12vh]">
        <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/404.png"
              alt="404 Not Found"
              width={400}
              height={300}
              className="object-contain"
            />
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 text-center md:text-left md:pl-8">
            <h1 className="text-5xl font-bold text-[#5D8736]">OOPS</h1>
            <h2 className="text-4xl font-bold text-[#5D8736] mt-4">
              404 <span className="text-lg">Error</span>
            </h2>
            <p className="text-xl text-gray-700 mt-4 leading-relaxed">
              Soo..orry <br />
              The page you are looking for is not found
            </p>
            <Link
              href="/"
              className="inline-block mt-6 px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
