'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ChallengeConfig {
  name: string;
  accounts: number[];
  prices: { [key: number]: number };
  maxDailyLoss: string;
  maxLoss: string;
  profitSplit: string;
  firstPayoutCap: { [key: number]: string };
  tierNames: { [key: number]: string };
}

const challengeConfigs: { [key: string]: ChallengeConfig } = {
  standard: {
    name: "Blackwire Standard",
    accounts: [300000, 200000, 100000, 50000],
    prices: { 300000: 4999, 200000: 3499, 100000: 1999, 50000: 999 },
    maxDailyLoss: "5-6%",
    maxLoss: "10-12%",
    profitSplit: "70% → 90%",
    firstPayoutCap: { 300000: "None", 200000: "$5,000", 100000: "$5,000", 50000: "$5,000" },
    tierNames: { 300000: "Institutional", 200000: "Elite", 100000: "Pro", 50000: "Core" }
  },
  vip: {
    name: "Blackwire VIP",
    accounts: [200000, 100000, 50000, 25000],
    prices: { 200000: 9999, 100000: 4999, 50000: 1999, 25000: 999 },
    maxDailyLoss: "None",
    maxLoss: "10-15%",
    profitSplit: "50% → 90%",
    firstPayoutCap: { 200000: "None", 100000: "$7,500", 50000: "$5,000", 25000: "$5,000" },
    tierNames: { 200000: "Institutional", 100000: "Elite", 50000: "Pro", 25000: "Core" }
  }
};

const ArrowDownIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12l7 7 7-7" />
  </svg>
);

const DownArrowSmallIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M8 15l4 4 4-4" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const DollarIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v12M9 9h6a2 2 0 010 4H9a2 2 0 000 4h6" />
  </svg>
);

export default function PromoPricingCards() {
  const router = useRouter();
  const [currentPlan, setCurrentPlan] = useState<'standard' | 'vip'>('standard');
  const [selectedMobileAccount, setSelectedMobileAccount] = useState(100000);

  const config = challengeConfigs[currentPlan];
  // Best value is 100K (index 2)
  const bestValueIndex = 2;

  const handlePurchase = (account: number) => {
    const challengeType = currentPlan === 'standard' ? 'Blackwire Standard' : 'Blackwire VIP';
    const tierName = config.tierNames[account];
    const price = config.prices[account];
    
    sessionStorage.setItem('preselectedChallengeType', challengeType);
    sessionStorage.setItem('preselectedTier', tierName);
    sessionStorage.setItem('preselectedBalance', account.toString());
    
    // Redirect to crypto payment page with challenge details
    router.push(`/challenge/payment?type=${encodeURIComponent(challengeType)}&tier=${encodeURIComponent(tierName)}&balance=${account}&price=${price}`);
  };

  const features = [
    { icon: <ArrowDownIcon />, label: 'Max. Daily Loss', getValue: () => config.maxDailyLoss },
    { icon: <DownArrowSmallIcon />, label: 'Max. Drawdown', getValue: () => config.maxLoss },
    { icon: <DollarIcon />, label: 'Profit Split', getValue: () => config.profitSplit },
    { icon: <ClockIcon />, label: 'First Payout', getValue: () => '7 days' },
    { icon: <CalendarIcon />, label: 'Drawdown Type', getValue: () => 'Static' }
  ];

  return (
    <div className="relative z-10">
      {/* Plan Type Selection */}
      <div className="container max-w-7xl mx-auto mb-6 px-4">
        <div className="flex justify-center text-white">
          <div className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-cyan-400/30 bg-black/60 backdrop-blur-sm px-3 py-2">
            <button
              type="button"
              onClick={() => setCurrentPlan('standard')}
              className={`flex items-center justify-center rounded-full text-xs md:text-sm px-4 md:px-6 py-1.5 md:py-2 font-bold transition-all duration-300 ${
                currentPlan === 'standard' 
                  ? 'bg-cyan-400 text-black border border-cyan-400' 
                  : 'bg-transparent text-white/80 border border-white/20 hover:bg-cyan-400/10'
              }`}
            >
              Blackwire Standard
            </button>
            <button
              type="button"
              onClick={() => setCurrentPlan('vip')}
              className={`flex items-center justify-center rounded-full text-xs md:text-sm px-4 md:px-6 py-1.5 md:py-2 font-bold transition-all duration-300 ${
                currentPlan === 'vip' 
                  ? 'bg-cyan-400 text-black border border-cyan-400' 
                  : 'bg-transparent text-white/80 border border-white/20 hover:bg-cyan-400/10'
              }`}
            >
              Blackwire VIP
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block max-w-[1400px] mx-auto px-4 overflow-x-auto pt-4">
        <div className="flex gap-0 min-w-fit">
          {/* Left Column - Feature Labels */}
          <div className="flex-shrink-0 w-40 pt-[80px]">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="h-[44px] flex items-center gap-2 px-2"
              >
                <span className="text-gray-400">{feature.icon}</span>
                <span className="text-white text-[11px] font-medium">{feature.label}</span>
              </div>
            ))}
            <div className="mt-2 px-2">
              <p className="text-gray-500 text-[10px]">All prices are one-time payments</p>
            </div>
          </div>

          {/* Account Cards */}
          <div className="flex gap-1.5 flex-1 justify-center">
            {config.accounts.map((account, cardIndex) => {
              const isBestValue = cardIndex === bestValueIndex;
              const tierName = config.tierNames[account];
              const firstPayoutCap = config.firstPayoutCap[account];
              
              return (
                <div 
                  key={account} 
                  className={`flex-shrink-0 w-[140px] relative ${isBestValue ? 'z-10' : ''}`}
                >
                  {/* Best Value Badge */}
                  {isBestValue && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
                      <div className="bg-cyan-400 text-black text-[9px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap">
                        Best value
                      </div>
                    </div>
                  )}
                  
                  <div className={`rounded-lg overflow-hidden ${
                    isBestValue 
                      ? 'bg-[#0d1a1f] border-2 border-cyan-400/50' 
                      : 'bg-[#0d1117] border border-gray-800'
                  }`}>
                    {/* Account Size Header */}
                    <div className={`p-3 text-center ${isBestValue ? 'pt-4' : ''}`}>
                      <div className="text-cyan-400 text-[9px] font-medium mb-0.5 uppercase">{tierName}</div>
                      <div className="text-white text-lg font-bold">
                        ${account >= 1000 ? `${account / 1000}K` : account}
                      </div>
                    </div>

                    {/* Feature Values */}
                    <div className="flex flex-col">
                      {features.map((feature, idx) => {
                        const value = feature.getValue();
                        
                        return (
                          <div 
                            key={idx} 
                            className="h-[44px] flex items-center justify-center px-1.5 border-t border-gray-800/50"
                          >
                            <span className="text-white text-[11px] font-medium">{value as string}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Pricing */}
                    <div className="p-3 pt-2 border-t border-gray-800/50">
                      <div className="flex items-center justify-center mb-0.5">
                        <span className="text-cyan-400 text-lg font-bold">${config.prices[account]}</span>
                      </div>
                      
                      <div className="text-center mb-2">
                        <span className="text-cyan-400 text-[9px] font-medium">Direct Allocation</span>
                      </div>
                      
                      <button
                        onClick={() => handlePurchase(account)}
                        className="w-full bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-1.5 px-2 rounded-md transition-all duration-300 hover:scale-105 text-xs"
                      >
                        Get Funded
                      </button>
                    </div>

                    {/* First Payout Cap */}
                    <div className="px-3 pb-3">
                      <div className="bg-[#1a2332] rounded-md py-2 px-2 text-center">
                        <div className="text-white text-sm font-bold">{firstPayoutCap}</div>
                        <div className="text-gray-400 text-[9px]">1st Payout Cap</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden px-4">
        {/* Mobile Account Selector */}
        <div className="flex justify-center gap-1.5 mb-5 flex-wrap">
          {config.accounts.map((account) => (
            <button
              key={account}
              onClick={() => setSelectedMobileAccount(account)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all duration-300 ${
                selectedMobileAccount === account
                  ? 'bg-cyan-400 text-black'
                  : 'bg-[#1a2332] text-white border border-gray-700'
              }`}
            >
              ${account >= 1000 ? `${account / 1000}K` : account}
            </button>
          ))}
        </div>

        {/* Mobile Card */}
        <div className="max-w-sm mx-auto">
          <div className="bg-[#0d1117] border border-cyan-400/30 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="p-5 text-center border-b border-gray-800/50">
              <div className="text-cyan-400 text-xs font-medium mb-1 uppercase">{config.tierNames[selectedMobileAccount]}</div>
              <div className="text-white text-3xl font-bold">${selectedMobileAccount.toLocaleString()}</div>
            </div>

            {/* Features */}
            <div className="divide-y divide-gray-800/50">
              {features.map((feature, idx) => {
                const value = feature.getValue();
                
                return (
                  <div key={idx} className="flex items-center justify-between px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">{feature.icon}</span>
                      <span className="text-white text-sm">{feature.label}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-white text-sm font-medium">{value as string}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pricing */}
            <div className="p-5 border-t border-gray-800/50">
              <div className="flex items-center justify-center mb-1">
                <span className="text-cyan-400 text-2xl font-bold">${config.prices[selectedMobileAccount]}</span>
              </div>
              
              <div className="text-center mb-4">
                <span className="text-cyan-400 text-xs font-medium">Direct Allocation - No Evaluation</span>
              </div>
              
              <button
                onClick={() => handlePurchase(selectedMobileAccount)}
                className="w-full bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 text-base"
              >
                Get Funded
              </button>
            </div>

            {/* First Payout Cap */}
            <div className="px-5 pb-5">
              <div className="bg-[#1a2332] rounded-lg py-3 px-4 text-center">
                <div className="text-white text-lg font-bold">{config.firstPayoutCap[selectedMobileAccount]}</div>
                <div className="text-gray-400 text-xs">1st Payout Cap</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
