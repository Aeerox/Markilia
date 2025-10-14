import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "@/components/AnimatedBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Markilia - Digital Sanctuary für Schönheit & Gemeinschaft",
  description: "Ein digitales Zuhause für Kreativität, Schönheit und Gemeinschaft. Hier findest du deinen Platz, deinen Stil, deine Menschen. ✨",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        {/* Animated Galaxy Background */}
        <AnimatedBackground />
        
        {/* Main Content with proper z-index */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
