"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function Theme() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent component from rendering during SSR
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={`p-2 rounded-full ${
        resolvedTheme === 'dark' ? 'bg-white' : 'bg-gray-900'
      } transition absolute bottom-5 right-5`}
    >
      {resolvedTheme === "dark" ? (
        <Sun color="black" size={24} />
      ) : (
        <Moon color="white" size={24} />
      )}
    </button>
  );
}