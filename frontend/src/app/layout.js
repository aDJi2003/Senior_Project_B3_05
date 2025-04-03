import { Geist, Geist_Mono } from "next/font/google";
import { Poppins, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas-neue',
});

export const metadata = {
  title: "Trashify",
  description: "Make a better future",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${bebasNeue.variable} antialiased`}
      >
        <AuthProvider> 
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
