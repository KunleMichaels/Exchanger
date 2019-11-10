import React from 'react';

export const useRequest = (base, pollInterval, poll, getRates, requestId, isFetching) => {

   React.useEffect(() => {
    getRates(base)
   }, [base, requestId, getRates]);
  
   React.useEffect(() => {
    if (!pollInterval || isFetching) return;
    const timeoutId = setTimeout(() => {
      poll()
    }, pollInterval);
 
    return () => {
      clearTimeout(timeoutId);
    };
  }, [pollInterval, isFetching, poll]);
 
 }
 
