"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Animation({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Start off-screen and transparent
      animate={{ opacity: 1, y: 0 }} // Fade in and move into place
      transition={{ duration: 1, ease: "easeInOut" }} // Smooth transition
    >
      {children}
    </motion.div>
  );
}
