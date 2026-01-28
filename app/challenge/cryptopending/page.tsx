'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function CryptoPendingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-20 border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center">
            <a href="/" className="text-xl font-bold tracking-tight text-center hover:opacity-80 transition-opacity">
              BLACKWIRE<span className="text-cyan-400">.VIP</span>
            </a>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-12 pb-16">
        {/* Success Icon */}
        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center mb-8">
          <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-cyan-400 mb-6 text-center">
          Payment Pending...
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8 text-center">
          Your crypto payment has been submitted! We're now verifying the transaction and setting up your direct funded account.
        </p>

        {/* Status Card */}
        <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">What happens next?</h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-black font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Payment Verification (30-60 min)</h3>
                <p className="text-gray-400 text-sm">We're verifying your crypto payment on the blockchain. This may take longer depending on network conditions.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-black font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Account Setup</h3>
                <p className="text-gray-400 text-sm">We'll configure your direct funded account with your selected parameters.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-black font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Login Credentials Sent</h3>
                <p className="text-gray-400 text-sm">You'll receive your MT4/MT5 login details via email within 1-24 hours.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-black font-bold text-sm">4</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Start Trading</h3>
                <p className="text-gray-400 text-sm">Begin trading with day-1 payout access, static drawdown, and no restrictions.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Highlight */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Drawdown", value: "Static" },
            { label: "First Payout", value: "7 Days" },
            { label: "Profit Split", value: "Up to 90%" },
            { label: "Restrictions", value: "None" }
          ].map((item, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-cyan-400 font-bold text-xl">{item.value}</div>
              <div className="text-gray-300 text-sm">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="px-8 py-4 bg-cyan-400 hover:bg-cyan-500 text-black font-bold rounded-lg transition-all duration-300 hover:scale-105"
          >
            Go to Dashboard
          </button>
          <a
            href="https://discord.gg/AKsDMBvQBT"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-cyan-400 font-bold rounded-lg border border-cyan-400 transition-all duration-300 hover:scale-105 text-center"
          >
            Join Discord
          </a>
        </div>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Direct funded allocation. No evaluation. Just trade.
        </p>
      </div>
    </div>
  );
}
