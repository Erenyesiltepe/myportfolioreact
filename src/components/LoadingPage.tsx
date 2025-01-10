"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LoadingPageProps {
  loaded?: boolean;
}

const LoadingPage = ({ loaded = true }: LoadingPageProps) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center p-8">
      {/* Container for the entire loading design */}
      <div className="relative w-full h-full overflow-hidden">
        <div className="w-full h-full flex bg-transparent">
          {/* Left half */}
          <div className={cn(
            "w-1/2 relative transition-transform duration-1000 bg-gray-800",
            loaded && "-translate-x-[120%]"
          )}>
            {/* Left horizontal line */}
            <div className="absolute top-1/2 left-0 w-[calc(100%-2.25rem)] h-[4px] bg-cyan-500">
              <div className="absolute right-0 w-1/2 h-full bg-cyan-500 animate-pulse" />
              <div className="absolute w-3 h-3 rounded-full bg-cyan-400 right-0 top-1/2 -translate-y-1/2 animate-move-left-fixed" />
            </div>

            {/* Left vertical line */}
            <div className="absolute top-0 right-0 w-[4px] h-full bg-cyan-500">
              <div className="absolute bottom-1/2 h-1/4 w-full bg-cyan-500 animate-pulse" />
              {/* Top moving circle */}
              <div className="absolute h-3 w-3 rounded-full bg-cyan-400 bottom-1/2 left-1/2 -translate-x-1/2 animate-move-up-fixed" />
              {/* Bottom moving circle */}
              <div className="absolute h-3 w-3 rounded-full bg-cyan-400 top-1/2 left-1/2 -translate-x-1/2 animate-move-down-fixed" />
            </div>

            {/* Left corner dots */}
            <div className="absolute top-4 left-4">
              <div className="flex gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-gray-600" />
                ))}
              </div>
              <div className="flex flex-col gap-3 mt-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-gray-600" />
                ))}
              </div>
            </div>

            <div className="absolute bottom-4 left-4">
              <div className="flex flex-col gap-3 mb-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-gray-600" />
                ))}
              </div>
              <div className="flex gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-gray-600" />
                ))}
              </div>
            </div>

            {/* Center logo (moved to left half) */}
            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-50">
              <div className="w-36 h-36 rounded-full bg-gray-900 border-4 border-gray-700 flex items-center justify-center">
                <div 
                  className="w-28 h-28 rounded-full bg-gray-800 flex items-center justify-center"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  <Image 
                    priority 
                    src="/logo.png" 
                    alt=""
                    width={112}
                    height={112}
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right half */}
          <div className={cn(
            "w-1/2 relative transition-transform duration-1000 bg-gray-800",
            loaded && "translate-x-[120%]"
          )}>
            {/* Right horizontal line */}
            <div className="absolute top-1/2 right-0 w-[calc(100%-2.25rem)] h-[4px] bg-cyan-500">
              <div className="absolute left-0 w-1/2 h-full bg-cyan-500 animate-pulse" />
              <div className="absolute w-3 h-3 rounded-full bg-cyan-400 left-0 top-1/2 -translate-y-1/2 animate-move-right-fixed" />
            </div>

            {/* Right vertical line */}
            <div className="absolute top-0 left-0 w-[4px] h-full bg-cyan-500">
              <div className="absolute bottom-1/2 h-1/4 w-full bg-cyan-500 animate-pulse" />
              {/* Top moving circle */}
              <div className="absolute h-3 w-3 rounded-full bg-cyan-400 bottom-1/2 left-1/2 -translate-x-1/2 animate-move-up-fixed" />
              {/* Bottom moving circle */}
              <div className="absolute h-3 w-3 rounded-full bg-cyan-400 top-1/2 left-1/2 -translate-x-1/2 animate-move-down-fixed" />
            </div>

            {/* Right corner dots */}
            <div className="absolute top-4 right-4">
              <div className="flex gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-gray-600" />
                ))}
              </div>
              <div className="absolute right-0 flex flex-col gap-3 mt-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-gray-600" />
                ))}
              </div>
            </div>

            <div className="absolute bottom-4 right-4">
              <div className="absolute right-0 bottom-2 flex flex-col gap-3 mb-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-gray-600" />
                ))}
              </div>
              <div className="flex gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-gray-600" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage; 