// app/page.tsx
"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Use dynamic import for Calendar to ensure it only loads on client side
const AnimatedCalendar = dynamic(() => import('../components/AnimatedCalendar'), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-16 w-16 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"
        />
        <p className="text-xl text-gray-300">Loading calendar...</p>
      </div>
    </div>
  ),
});

const Home: React.FC = () => {
  return (
    <main className="flex h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-gray-200">
      <AnimatedCalendar />
    </main>
  );
};

export default Home;