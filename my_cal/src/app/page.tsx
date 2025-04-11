// app/page.tsx
"use client";

import React from 'react';
import Calendar from '../components/Calendar';

const Home: React.FC = () => {
  return (
    <main className="flex h-screen w-screen overflow-hidden bg-gray-900 text-gray-200">
      <Calendar />
    </main>
  );
};

export default Home;