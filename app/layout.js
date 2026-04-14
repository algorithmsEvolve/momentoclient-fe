import { Inter, Cinzel, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata = {
  title: "Momento | Everything For Your Special Moments",
  description: "Premium seserahan, mahar, and digital invitations for your special moments.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className={`${montserrat.variable} min-h-full flex flex-col font-sans bg-black text-white`}>{children}</body>
    </html>
  );
}
