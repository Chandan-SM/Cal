// app/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Calendar from '../components/Calendar';
import { Theme } from '@/components/ThemeToggle';
import { useTheme } from 'next-themes';

const Home: React.FC = () => {

  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentTheme = isMounted ? resolvedTheme : "system";

  return (
    <main className={`pl-40 pr-40 pt-30 pb-30 h-[100vh] w-[100vw] ${currentTheme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'}`}>
      <h1 className="text-2xl font-bold mb-6">Next.js Calendar App</h1>
      <Calendar />
      <Theme />
    </main>
  );
};

export default Home;