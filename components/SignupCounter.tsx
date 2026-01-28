'use client';
import React, { useState, useEffect } from 'react';
import { getUserCount } from '../lib/firebase';

const BASE_COUNT = 62; // Starting count as requested

export default function SignupCounter() {
  const [count, setCount] = useState<number>(BASE_COUNT);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const realCount = await getUserCount();
        const totalCount = BASE_COUNT + realCount;
        setCount(totalCount);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user count:', error);
        setCount(BASE_COUNT);
        setIsLoading(false);
      }
    };

    fetchUserCount();

    // Refresh count every 30 seconds to show live updates
    const interval = setInterval(fetchUserCount, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-cyan-400/30 rounded-full px-6 py-3">
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
        </div>
        <span className="text-gray-300 text-sm">
          {isLoading ? (
            'Loading...'
          ) : (
            <>
              <span className="text-cyan-400 font-bold text-lg">{count}</span>
              <span className="ml-1">Traders Signed Up</span>
            </>
          )}
        </span>
      </div>
    </div>
  );
}
