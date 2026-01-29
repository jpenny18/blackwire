'use client';
import React from 'react';
import PromoPricingCards from '../components/PromoPricingCards';
import FeedbackVote from '../components/FeedbackVote';
import SignupCounter from '../components/SignupCounter';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white scroll-smooth">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-20 border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center">
            <span className="text-xl font-bold tracking-tight text-center">
              BLACKWIRE<span className="text-cyan-400">.VIP</span>
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-4">
        <div className="container max-w-5xl mx-auto text-center">
          {/* Main Headline */}
          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
              Direct Funded Allocation.
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-cyan-400">
              No Evaluation.
            </h2>
          </div>

          {/* Subtext */}
          <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-6 sm:px-8">
            You're not here to prove yourself. You're here for <span className="text-cyan-400 font-semibold">capital allocation</span>,
            <span className="text-cyan-400 font-semibold"> instant payout access</span>, and
            <span className="text-cyan-400 font-semibold"> real risk bandwidth</span>.
            No hoops. No games. Just trade.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#pricing"
              className="inline-block bg-cyan-400 hover:bg-cyan-500 text-black font-bold px-8 py-3 rounded-lg text-lg transition-all duration-300 hover:scale-105"
            >
              Get Funded Now
            </a>
            <a
              href="https://discord.gg/AKsDMBvQBT"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white/10 hover:bg-white/20 text-cyan-400 font-bold px-8 py-3 rounded-lg text-lg border border-cyan-400 transition-all duration-300 hover:scale-105"
            >
              Join Discord
            </a>
          </div>

          {/* Live Signup Counter */}
          <div className="flex justify-center">
            <SignupCounter />
          </div>
        </div>
      </section>

      {/* What We Are Section */}
      <section className="relative z-10 py-8 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-500/10 via-cyan-400/5 to-cyan-500/10 backdrop-blur-sm border border-cyan-400/30 rounded-2xl p-6 md:p-8 text-center">
            <p className="text-lg md:text-xl text-white leading-relaxed">
              We are <span className="text-cyan-400 font-bold">not a propfirm</span>. We are <span className="text-cyan-400 font-semibold">immediate capital access</span> with <span className="text-cyan-400 font-bold">zero evaluation friction</span>.
            </p>
            <p className="text-gray-400 mt-3 text-sm md:text-base">
              (capital leasing with payout access)
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-16 px-4 scroll-mt-20">
        <div className="container mx-auto mb-8 text-center">
          {/* Urgency Tag */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-500/50 rounded-full px-6 py-3 mb-8">
            <div className="relative">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
            </div>
            <div className="text-left">
              <div className="text-orange-400 font-bold text-sm md:text-base">Launch Window: First 10 Allocations Only</div>
              <div className="text-orange-300 text-xs">After that: prices increase & access pauses</div>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Allocation</h2>
          <p className="text-gray-400 text-lg">Select the model that fits your trading style</p>
        </div>
        <PromoPricingCards />
      </section>

      {/* Feedback Vote Section */}
      <section className="relative z-10 py-16 px-4 hidden">
        <div className="container max-w-4xl mx-auto">
          <FeedbackVote />
        </div>
      </section>

      {/* Why We Built This */}
      <section className="relative z-10 py-16 px-4">
        <div className="container max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">Why We Built This</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Traders are tired of evaluation theatrics and hidden rules. You want <span className="font-semibold text-white">no evaluation</span>, 
              <span className="font-semibold text-white"> day-1 payouts</span>, 
              <span className="font-semibold text-white"> high drawdown</span>, and 
              <span className="font-semibold text-white"> zero trailing drawdown BS</span>. 
              We built Blackwire for operators who need a clean, no-nonsense funding solution.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features - Bento Box */}
      <section className="relative z-10 py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">The Blackwire Advantage</h2>
          
          {/* Mobile Slider */}
          <div className="lg:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-4 snap-x snap-mandatory" style={{ scrollSnapType: 'x mandatory' }}>
              {/* Create the features array twice for infinite scroll effect */}
              {[...Array(2)].flatMap((_, setIndex) => [
                  <div key={`${setIndex}-static`} className="flex-none w-[85vw] snap-center">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-[180px] flex flex-col">
                      <div className="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold mb-2">Static Drawdown</h3>
                      <p className="text-gray-400 text-sm">No trailing drawdown nonsense. Your max loss is fixed from day one.</p>
                    </div>
                  </div>,
                  <div key={`${setIndex}-payouts`} className="flex-none w-[85vw] snap-center">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-[180px] flex flex-col">
                      <div className="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold mb-2">Day-1 Payout Eligibility</h3>
                      <p className="text-gray-400 text-sm">First payout unlocks after 7 days. After that? Request payouts anytime.</p>
                    </div>
                  </div>,
                  <div key={`${setIndex}-nolimits`} className="flex-none w-[85vw] snap-center">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-[180px] flex flex-col">
                      <div className="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold mb-2">No Lot Size Limits</h3>
                      <p className="text-gray-400 text-sm">Trade however you want. No maximum lot size. No risk per trade cap.</p>
                    </div>
                  </div>,
                  <div key={`${setIndex}-scaling`} className="flex-none w-[85vw] snap-center">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-[180px] flex flex-col">
                      <div className="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold mb-2">Account Scaling</h3>
                      <p className="text-gray-400 text-sm">Earn 25% balance increase after each successful payout. Scale up to 2x your original balance.</p>
                    </div>
                  </div>,
                  <div key={`${setIndex}-profit`} className="flex-none w-[85vw] snap-center">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-[180px] flex flex-col">
                      <div className="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold mb-2">Up to 90% Profit Split</h3>
                      <p className="text-gray-400 text-sm">Start at 50-70% depending on your tier. After 2 payouts, you earn 90% of all profits.</p>
                    </div>
                  </div>,
                  <div key={`${setIndex}-consistency`} className="flex-none w-[85vw] snap-center">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-[180px] flex flex-col">
                      <div className="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold mb-2">Fair Consistency Rule</h3>
                      <p className="text-gray-400 text-sm">Single day profit can't exceed 40% of balance or 60% of total profits. Breach extends first payout to 30 days—account stays active.</p>
                    </div>
                  </div>
              ]).flat()}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:block">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-cyan-400/50 transition-all duration-300">
              <div className="grid grid-cols-3 gap-6">
                {/* Static Drawdown */}
                <div className="flex flex-col items-start text-left">
                  <div className="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Static Drawdown</h3>
                  <p className="text-gray-400 text-sm">No trailing drawdown nonsense. Your max loss is fixed from day one.</p>
                </div>
                {/* Fast Payouts */}
                <div className="flex flex-col items-start text-left">
                  <div className="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Day-1 Payout Eligibility</h3>
                  <p className="text-gray-400 text-sm">First payout unlocks after 7 days. After that? Request payouts anytime.</p>
                </div>
                {/* No Lot Limits */}
                <div className="flex flex-col items-start text-left">
                  <div className="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">No Lot Size Limits</h3>
                  <p className="text-gray-400 text-sm">Trade however you want. No maximum lot size. No risk per trade cap.</p>
                </div>
                {/* Account Scaling */}
                <div className="flex flex-col items-start text-left">
                  <div className="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Account Scaling</h3>
                  <p className="text-gray-400 text-sm">Earn 25% balance increase after each successful payout. Scale up to 2x your original balance.</p>
                </div>
                {/* Profit Split */}
                <div className="flex flex-col items-start text-left">
                  <div className="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Up to 90% Profit Split</h3>
                  <p className="text-gray-400 text-sm">Start at 50-70% depending on your tier. After 2 payouts, you earn 90% of all profits.</p>
                </div>
                {/* Consistency Rule */}
                <div className="flex flex-col items-start text-left">
                  <div className="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Fair Consistency Rule</h3>
                  <p className="text-gray-400 text-sm">Single day profit can't exceed 40% of balance or 60% of total profits. Breach extends first payout to 30 days—account stays active.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rules Section - Important Info */}
      <section className="relative z-10 py-16 px-4 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent">
        <div className="container max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-cyan-400/30 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-cyan-400">Important Account Rules</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-cyan-400/20 rounded-full flex items-center justify-center text-cyan-400 font-bold">1</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Static Drawdown</h3>
                  <p className="text-gray-400">Your max drawdown is fixed from day one. No trailing drawdown that moves with your profits.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-cyan-400/20 rounded-full flex items-center justify-center text-cyan-400 font-bold">2</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Payout Schedule</h3>
                  <p className="text-gray-400">First payout unlocks after 7 days from your first trade. All subsequent payouts can be requested anytime.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-cyan-400/20 rounded-full flex items-center justify-center text-cyan-400 font-bold">3</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">First Payout Caps</h3>
                  <div className="text-gray-400 space-y-1">
                    <p><span className="text-cyan-400 font-semibold">Blackwire Standard:</span> Core $5,000 | Pro $5,000 | Elite $5,000 | Institutional (no cap)</p>
                    <p><span className="text-cyan-400 font-semibold">Blackwire VIP:</span> Core $5,000 | Pro $5,000 | Elite $7,500 | Institutional (no cap)</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-cyan-400/20 rounded-full flex items-center justify-center text-cyan-400 font-bold">4</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Consistency Rule</h3>
                  <p className="text-gray-400">Single day profit cannot exceed <span className="text-white font-semibold">40% of total profits</span>. If breached, your account is not failed, but your first withdrawal is extended to 30 days after the first trade placed on your account.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-cyan-400/20 rounded-full flex items-center justify-center text-cyan-400 font-bold">5</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Account Scaling</h3>
                  <p className="text-gray-400">Receive 25% balance increase after each successful payout. Maximum scaling cap is 2x your original balance. Scaling resets if account is breached.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-cyan-400/20 rounded-full flex items-center justify-center text-cyan-400 font-bold">6</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">No Trading Restrictions</h3>
                  <p className="text-gray-400">We don't have maximum lot sizes or limits on how much you can risk per trade. Trade your way.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Trade?</h2>
          <p className="text-xl text-gray-400 mb-8">Get your direct funded account today. No evaluation. No waiting.</p>
          <a 
            href="#pricing" 
            className="inline-block bg-cyan-400 hover:bg-cyan-500 text-black font-bold px-12 py-4 rounded-lg text-lg transition-all duration-300 hover:scale-105"
          >
            Get Funded Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8 px-4">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          <p>&copy; 2026 Blackwire Trading. All rights reserved.</p>
          <p className="mt-2">Trading involves substantial risk. Trade responsibly.</p>
        </div>
      </footer>
    </div>
  );
}
