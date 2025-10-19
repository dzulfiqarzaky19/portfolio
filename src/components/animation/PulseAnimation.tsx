import * as React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

type PulseLinkProps = {
  to: string;
  children: React.ReactNode;
};

export const PulseButton = ({ to, children }: PulseLinkProps) => {
  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={{
        scale: [1, 1.015, 1],
        opacity: [1, 0.95, 1],
      }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className="inline-block"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        to={to}
        className="relative inline-flex items-center justify-center px-6 py-3 text-white font-semibold bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        aria-label={typeof children === "string" ? children : "Open link"}
      >
        <span className="relative z-10">{children}</span>
      </Link>
    </motion.div>
  );
};
