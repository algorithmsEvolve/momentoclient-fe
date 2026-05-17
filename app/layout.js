import { Inter, Cinzel, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: 'swap',
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: 'swap',
});

export const metadata = {
  title: "Momento - Undangan Digital, Mahar & Seserahan",
  description: "Ciptakan momen pernikahan yang autentik dan kreatif 🪄",
  openGraph: {
    title: "Momento - Undangan Digital, Mahar & Seserahan",
    description: "Ciptakan momen pernikahan yang autentik dan kreatif 🪄",
    url: "https://momentoproject.com",
    siteName: "Momento Project",
    images: [
      {
        url: "https://xedsqvaujcspuu3e.public.blob.vercel-storage.com/global/invitation_by_wa.png",
        width: 1200,
        height: 630,
        alt: "Momento Project Thumbnail",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cinzel.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-black text-white">
        {children}
      </body>
    </html>
  );
}
