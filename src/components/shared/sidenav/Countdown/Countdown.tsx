import React, { useState, useEffect } from 'react';


const Countdown = ({ seconds }:any) => {
    const [timeLeft, setTimeLeft] = useState(seconds);

    useEffect(() => {
        if (!timeLeft) return;
        const timerId = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearTimeout(timerId);
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const remainingSeconds = timeLeft % 60;

    return (
        <div className='dark:text-gray-200'>
                Tiempo Token:{minutes}:{remainingSeconds}
        </div>
    );
};

export default Countdown;