import Navbar from "../components/navbar";

export default function Home() {
  return (
    <div className="font-poppins">
      <Navbar />
      <main
        className="min-h-screen bg-cover bg-center flex items-center text-white px-6 md:px-12"
        style={{ backgroundImage: "url('/bg-landing-page.png')" }}
      >
        <div className="max-w-2xl text-left mx-auto">
          <h1 className="text-5xl font-bold">Scan. Sort. Save the Planet!</h1>
          <p className="text-xl mt-4">
            Effortlessly identify waste. <br />
            Join us in making the planet greener!
          </p>
        </div>
      </main>
    </div>
  );
}
