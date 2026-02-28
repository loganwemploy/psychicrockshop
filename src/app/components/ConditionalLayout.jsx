"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <div className="site-root">
        {children}
        {!isHome && <Footer />}
      </div>
      {!isHome && <ScrollToTop />}
    </>
  );
}
