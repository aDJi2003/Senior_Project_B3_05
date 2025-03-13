import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 mt-[15vh] bg-gray-200">
                <h1 className="text-5xl font-bold text-green-700">OOPS</h1>
                <Image src="/404.png" alt="404 Not Found" width={400} height={300} className="mt-4" />
                <h2 className="text-6xl font-bold text-green-700 mt-6">404 <span className="text-lg">Error</span></h2>
                <p className="text-xl text-gray-700 mt-2">
                    Soo..orry <br /> The page you are looking for is not found
                </p>
                <Link href="/" className="mt-6 px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800">
                    Back to Home
                </Link>
            </div>
            <Footer />
        </div>
    );
}