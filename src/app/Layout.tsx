import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { NavDots } from "../components/NavDots";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Layout() {
  const mainRef = React.useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  React.useEffect(() => {
    const id = requestAnimationFrame(() => {
      mainRef.current?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:m-3 focus:p-3 focus:bg-black/80 focus:text-white rounded"
      >
        Skip to content
      </a>
      <AnimatePresence mode="wait">
        <motion.main
          id="main"
          ref={mainRef}
          tabIndex={-1}
          className="outline-none min-h-dvh"
          role="main"
          aria-label="Main content"
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Header />
          {isHome && <NavDots />}
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <ScrollRestoration />
    </>
  );
}
