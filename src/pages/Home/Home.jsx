import React from 'react';
import Navbar from '../../components/Navbar';

function Home() {
  return (
    <div>
      <Navbar />
      <div className="bg-white mx-auto max-w-sm space-y-2 rounded-xl px-8 py-8 shadow-lg sm:flex sm:items-center sm:gap-x-6 sm:space-y-0 sm:py-4">
        <label
          className="text-gray-700 block text-sm font-medium"
        >
          Bienvenido
        </label>
      </div>
    </div>
  );
}

export default Home