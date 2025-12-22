"use client";
import React from "react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon, MonitorIcon } from "lucide-react";

export default function ThemeSwitchSimple() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-8 w-24 rounded-md border border-gray-200 dark:border-gray-800" />
    );
  }

  const themes = [
    { key: "system", icon: MonitorIcon },
    { key: "light", icon: SunIcon },
    { key: "dark", icon: MoonIcon },
  ];

  return (
    <div className="inline-flex h-8 items-center rounded-md border border-gray-200 bg-transparent dark:border-gray-500">
      {themes.map((themeOption) => {
        const Icon = themeOption.icon;
        const isActive = theme === themeOption.key;

        return (
          <button
            key={themeOption.key}
            onClick={() => setTheme(themeOption.key)}
            className={`inline-flex h-full w-8 items-center justify-center text-sm font-medium transition-colors first:rounded-l-md last:rounded-r-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-0 dark:focus:ring-gray-600 ${
              isActive
                ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            }`}
            aria-label={`Switch to ${themeOption.key} theme`}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        );
      })}
    </div>
  );
}
