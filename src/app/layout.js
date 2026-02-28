import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavTransitionProvider } from "./components/NavTransitionOverlay";
import ConditionalLayout from "./components/ConditionalLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "psychic &amp; rock shop | Crystal & Psychic Healing",
  description: "psychic &amp; rock shop. Crystal therapy, tarot readings, energy cleansing, and spiritual services. Pain relief and energetic alignment.",
  keywords: "crystal healing, tarot reading, psychic reading, energy cleansing, spiritual wellness, crystal therapy, Julibe",
  author: "Julibe",
  themeColor: "#3f1677",
  openGraph: {
    title: "psychic &amp; rock shop | Crystal & Psychic Healing",
    description: "Crystal therapy, tarot readings, energy cleansing, and spiritual services.",
    type: "website",
    images: ["https://dl4.pushbulletusercontent2.com/dGLvQNacaSYF4R560iIwxmyBlN0xWAat/IMG_0937.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "psychic &amp; rock shop | Crystal & Psychic Healing",
    description: "Crystal therapy, tarot readings, energy cleansing, and spiritual services.",
    images: ["https://dl4.pushbulletusercontent2.com/dGLvQNacaSYF4R560iIwxmyBlN0xWAat/IMG_0937.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
<link href="https://fonts.googleapis.com/css2?family=Catamaran:wght@100..900&family=Mako&family=Oxygen:wght@300;400;700&family=Questrial&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
</head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NavTransitionProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </NavTransitionProvider>
      </body>
    </html>
  );
}



