import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mission 007 Mentorship Non Profit",
  description: "Our Home Hub for mentorship, and guidance for youth ages 16-25 years old",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Catamaran:wght@100..900&family=Mako&family=Oxygen:wght@300;400;700&family=Questrial&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
</head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}



