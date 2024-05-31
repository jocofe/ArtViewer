import { useState, useEffect } from 'react';

export const useClearsMessage = (timeout = 3000) => { // Set time (3sec)
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (message || error) {
    // Clear message or error if time is pass
      timer = setTimeout(() => {
        setMessage('');
        setError('');
      }, timeout);
    }
    // Clear timeout if logic is executed again or component is unmounted
    return () => clearTimeout(timer);
  }, [message, error, timeout]);

  return { message, setMessage, error, setError };
};