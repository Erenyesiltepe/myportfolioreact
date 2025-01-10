"use client"
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import LoadingPage from './LoadingPage';
import Navigation from './Navigation';

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const [showLoading, setShowLoading] = useState(true);
  const [loadingState, setLoadingState] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setShowLoading(true);
    setLoadingState(false);

    // Start exit animation after 1 second
    const startExitTimer = setTimeout(() => {
      setLoadingState(true);
    }, 500);

    // Remove loading component after 2 seconds
    const removeTimer = setTimeout(() => {
      setShowLoading(false);
    }, 1000);

    return () => {
      clearTimeout(startExitTimer);
      clearTimeout(removeTimer);
    };
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-[calc(100vw-4rem)] mx-auto bg-gray-800 rounded-lg border-2 border-gray-700 h-[calc(100vh-4rem)] flex flex-col">
        <Navigation />
        {children}
        {showLoading && (
          <div className="fixed inset-0 z-50">
            <LoadingPage loaded={loadingState} />
          </div>
        )}
      </div>
    </div>
  );
} 