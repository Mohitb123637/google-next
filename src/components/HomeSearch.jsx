'use client';

import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoMdMic } from 'react-icons/io';
import { useRouter } from 'next/navigation';

const HomeSearch = () => {
  const [input, setInput] = useState('');
  const [randomSearchLoading, setRandomSearchLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    router.push(`/search/web?searchTerm=${input}`);
    setInput('');
  };

  const randomSearch = async (e) => {
    setRandomSearchLoading(true);
    const response = await fetch('https://random-word-api.herokuapp.com/word')
      .then((res) => res.json())
      .then((data) => data[0]);
    if (!response) return;
    router.push(`/search/web?searchTerm=${response}`);
    setRandomSearchLoading(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex w-full mt-5 mx-auto max-w-[90%] border border-gray-200 px-5 py-3 rounded-full hover:shadow-md focus-within:shadow-md transition-shadow sm:max-w-xl lg:max-2xl:"
      >
        <CiSearch className="text-xl text-gray-500 mr-3" />
        <input
          type="text"
          className="flex-grow focus:outline-none"
          onChange={(e) => setInput(e.target.value)}
        />
        <IoMdMic className=" text-lg" />
      </form>
      <div className="flex flex-col sm:flex-row justify-center mt-8 space-y-2 sm:space-y-0 sm:space-x-4">
        <button
          className="bg-gray-100 rounded-md text-sm text-gray-800 hover:ring-2 hover:ring-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 active:ring-gray-300 hover:shadow-md transition-all duration-300 ease-in-out px-4 py-2 w-full sm:w-auto"
          onClick={handleSubmit}
          aria-label="Google Search"
        >
          Google Search
        </button>
        <button
          disabled={randomSearchLoading}
          className="bg-gray-100 rounded-md text-sm text-gray-800 hover:ring-2 hover:ring-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 active:ring-gray-300 hover:shadow-md transition-all duration-300 ease-in-out px-4 py-2 w-full sm:w-auto disabled:opacity-80"
          aria-label="I am feeling lucky"
          onClick={randomSearch}
        >
          {randomSearchLoading ? 'Loading...' : '  I am feeling lucky'}
        </button>
      </div>
    </>
  );
};

export default HomeSearch;
