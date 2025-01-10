"use client"
import { useEffect, useState } from 'react';
import LoadingPage from '@/components/LoadingPage';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 3000); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  return <LoadingPage loaded={loaded} />;
}
