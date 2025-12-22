"use client";
import React from "react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon, MonitorIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeSwitch() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <motion.div
        className="flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="h-8  w-24 rounded-full border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800" />
      </motion.div>
    );
  }

  // Determine the current theme (system, light, or dark)
  const currentTheme = theme === "system" ? "system" : theme;

  const themes = [
    { key: "system", icon: MonitorIcon, label: "System" },
    { key: "light", icon: SunIcon, label: "Light" },
    { key: "dark", icon: MoonIcon, label: "Dark" },
  ];

  return (
    <motion.div
      className="flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <div className="relative h-8.5 w-24 border border-gray-300 rounded-full  bg-white dark:border-gray-600 dark:bg-gray-950">
        {/* Background slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTheme}
            className="absolute top-0.5 left-0.5 h-7 w-7 rounded-full bg-white shadow-sm"
            initial={false}
            animate={{
              x: themes.findIndex((t) => t.key === currentTheme) * 32,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
            layoutId="theme-slider"
          />
        </AnimatePresence>

        {/* Theme buttons */}
        <div className="relative flex h-full w-full">
          {themes.map((themeOption, index) => {
            const Icon = themeOption.icon;
            const isActive = currentTheme === themeOption.key;

            return (
              <motion.button
                key={themeOption.key}
                onClick={() => setTheme(themeOption.key)}
                className={`relative flex h-full w-8 items-center justify-center transition-colors duration-200 ${
                  isActive
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
                aria-label={`Switch to ${themeOption.label} theme`}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                }}
                whileTap={{
                  scale: 0.9,
                  rotate: -5,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isActive ? "active" : "inactive"}
                    initial={{
                      scale: 0.8,
                      opacity: 0,
                      rotate: isActive ? -180 : 180,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      rotate: 0,
                    }}
                    exit={{
                      scale: 0.8,
                      opacity: 0,
                      rotate: isActive ? 180 : -180,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {/* Ripple effect on theme change */}
        <AnimatePresence>
          {mounted && (
            <motion.div
              className={`absolute inset-0 rounded-full pointer-events-none ${
                theme === "dark"
                  ? "bg-gradient-to-r from-brand-secondary/20 to-brand-secondary/20"
                  : "bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10"
              }`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
