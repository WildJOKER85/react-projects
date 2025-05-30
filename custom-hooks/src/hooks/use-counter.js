import { useState, useEffect } from 'react';

const useCounter = (isPositive = true) => {
   const [counter, setCounter] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         if (isPositive) {
            setCounter(prevCount => prevCount + 1);
         } else {
            setCounter(prevCount => prevCount - 1);
         }
      }, 1000);
      return () => clearInterval(interval);
   }, [isPositive]);
   return counter;
};

export default useCounter;