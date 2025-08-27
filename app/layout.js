import Navbar from "@/components/common/Navbar";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Animao",
    template: "%s | Animao",
  },
  description: "Anime List and Detail",
  openGraph: {
    title: "Animao",
    description: "Anime List and Detail",
    type: "website",
    locale: "en_US",
    siteName: "Animao",
  },
  twitter: {
    title: "Animao",
    description: "Anime List and Detail",
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
