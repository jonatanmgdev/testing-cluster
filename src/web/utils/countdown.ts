"use client";
import { useEffect, useState } from 'react';

const countdown = (initialState: number) => {
    const [counter, setCounter] = useState<number>(initialState);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCounter((prevCounter) => (prevCounter > 0 ? prevCounter - 1 : 0));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [initialState]);

    return counter;
};

export default countdown;