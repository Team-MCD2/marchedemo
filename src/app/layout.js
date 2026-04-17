import { Outfit, Inter } from "next/font/google";
import SmoothScrolling from "@/components/SmoothScrolling";
import CustomCursor from "@/components/animations/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactWidget from "@/components/layout/ContactWidget";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Marché de Mo' | Supermarché du Monde | Toulouse",
  description: "Marché de Mo' vous propose des produits de qualité du monde entier. Boucherie Halal, produits frais, épicerie et bien plus.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${outfit.variable} ${inter.variable}`}>
      <body className="bg-theme text-theme antialiased selection:bg-brand-green selection:text-white relative">
        <CustomCursor />
        <Navbar />

        <SmoothScrolling>
          {children}
          <Footer />
        </SmoothScrolling>

        <ContactWidget />
      </body>
    </html>
  );
}
