'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function AuthSuccess() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        router.push('/auth');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-cyan-400/10 rounded-full flex items-center justify-center">
              <svg 
                className="w-8 h-8 text-cyan-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
          </div>

          {/* Logo */}
          <div className="text-center mb-6">
            <span className="text-3xl font-bold tracking-tight">
              BLACKWIRE<span className="text-cyan-400">.VIP</span>
            </span>
          </div>

          {/* Success Message */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-3">You're on the List!</h1>
            <p className="text-gray-400 mb-2">
              Thank you for signing up. We'll notify you at
            </p>
            <p className="text-cyan-400 font-semibold mb-4">
              {userEmail || 'your email'}
            </p>
            <p className="text-gray-400 text-sm">
              as soon as Blackwire Trading goes live. Get ready to trade with the most trader-friendly prop firm.
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
            <h2 className="text-sm font-semibold text-cyan-400 mb-3">What's Next?</h2>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Check your email for confirmation</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>We'll send updates on our launch progress</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Be among the first to access your trading account</span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Link 
              href="/"
              className="block w-full bg-cyan-400 hover:bg-cyan-500 text-black font-semibold py-3 rounded-lg transition-all duration-300 text-center"
            >
              Back to Home
            </Link>
            <button
              onClick={() => {
                auth.signOut();
                router.push('/');
              }}
              className="block w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3 rounded-lg transition-all duration-300"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <p className="text-center text-gray-500 text-xs mt-6">
          Questions? Contact us at{' '}
          <a href="mailto:support@blackwiretrading.vip" className="text-cyan-400 hover:underline">
            support@blackwiretrading.vip
          </a>
        </p>
      </div>
    </div>
  );
}
