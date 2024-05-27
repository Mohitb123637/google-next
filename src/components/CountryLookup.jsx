'use client';

import React, { useEffect, useState } from 'react';
const CountryLookup = () => {
  const [country, setCountry] = useState('India');

  useEffect(() => {
    const getCountry = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        console.log('API Key:', apiKey);
        const response = await fetch(
          `https://extreme-ip-lookup.com/json/?key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCountry(data.country);
      } catch (error) {
        console.error('Failed to fetch country:', error);
      }
    };
    getCountry();
  }, []);
  return <div>{country}</div>;
};

export default CountryLookup;
