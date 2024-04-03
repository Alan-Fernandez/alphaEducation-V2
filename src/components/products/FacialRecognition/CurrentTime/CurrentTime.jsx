"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import styles from './CurrentTime.module.css';

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <div>
        <p 
            className='text-2xl font-bold text-white'
        >
            {formattedTime}
        </p>
    </div>
  );
};

export default CurrentTime;
