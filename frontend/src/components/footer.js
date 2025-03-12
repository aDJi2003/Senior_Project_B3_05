export default function Footer() {
    return (
      <footer className="bg-[#5D8736] text-white py-8 px-6 font-poppins">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/4 flex items-center justify-center md:mr-12">
            <img src="/logo.png" alt="Trashify" className="h-12 w-auto"/>
          </div>
          <div className="md:w-3/4 text-left mt-4 md:mt-0 md:ml-12">
            <p className="text-sm tracking-wider">
              <strong>Trashify</strong> Trashify is a digital waste management application that helps users categorize waste, 
              track disposal history, and access educational content on sustainable waste management. Using image processing 
              technology, it scans and records waste types while providing the correct disposal locations. The platform ensures 
              efficient waste distribution monitoring and promotes better waste management practices. Additionally, it offers 
              educational resources to raise awareness about proper waste disposal.
            </p>
            <p className="mt-4 font-bold">
              Copyright ©2025 Trashify | Fight for the future
            </p>
          </div>
        </div>
      </footer>
    );
  }