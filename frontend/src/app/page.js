import Navbar from "../components/navbar";

export default function Home() {
  return (
    <div className="font-poppins">
      <Navbar />
      <main
        className="min-h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/bg-landing-page.png')" }}
      >
        <h1 className="text-4xl font-bold">Welcome to Trashify</h1>
      </main>
    </div>
  );
}
