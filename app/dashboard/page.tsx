'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  const handleStartChallenge = (type: string) => {
    sessionStorage.setItem('preselectedChallengeType', type);
    router.push('/dashboard/challenge');
  };

  return (
    <div className="relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-gray-400 mb-8">Choose your trading model to get started</p>

        {/* Promotional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:scale-[1.02] transition-all duration-300 border border-white/10 hover:border-cyan-400/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Blackwire Standard</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">Direct funded allocation with competitive profit splits and flexible drawdown limits.</p>
            
            <div className="space-y-2 mb-4">
              {[
                'Up to $300,000 in Capital',
                '10-12% Max Total Drawdown',
                '5-6% Max Daily Drawdown',
                'Static Drawdown',
                'Profit Split: 70% → 90%'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-cyan-400/20 flex items-center justify-center">
                    <span className="text-cyan-400 text-xs">✓</span>
                  </div>
                  <span className="text-gray-300 text-xs">{feature}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => handleStartChallenge('Blackwire Standard')}
              className="w-full bg-cyan-400 hover:bg-cyan-500 text-black font-bold text-sm py-3 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Start Trading
            </button>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:scale-[1.02] transition-all duration-300 border border-white/10 hover:border-cyan-400/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Blackwire VIP</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">Premium direct funding with higher drawdown limits and no daily restrictions.</p>
            
            <div className="space-y-2 mb-4">
              {[
                'Up to $200,000 in Capital',
                '10-15% Max Total Drawdown',
                'No Daily Drawdown Limit',
                'Static Drawdown',
                'Profit Split: 50% → 90%'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-cyan-400/20 flex items-center justify-center">
                    <span className="text-cyan-400 text-xs">✓</span>
                  </div>
                  <span className="text-gray-300 text-xs">{feature}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => handleStartChallenge('Blackwire VIP')}
              className="w-full bg-cyan-400 hover:bg-cyan-500 text-black font-bold text-sm py-3 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Get VIP Access
            </button>
          </div>
        </div>
        
        <div className="mt-8 max-w-4xl">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-cyan-400/20 p-4">
            <p className="text-gray-400 text-sm">
              <span className="text-cyan-400 font-semibold">Direct Funded Allocation:</span> No evaluation required. Get instant access to your trading capital and start trading immediately. First payout unlocks after 7 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 