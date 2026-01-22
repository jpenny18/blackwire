'use client';
import React, { useState, useEffect } from 'react';
import { submitFeedbackVote, getVoteCounts } from '../lib/firebase';

type VoteOption = 'ready' | 'interested' | 'not_yet';

type VoteCounts = {
  ready: number;
  interested: number;
  not_yet: number;
};

// SVG icon components (simple examples)
const ReadyIcon = () => (
  <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
  </svg>
);
const InterestedIcon = () => (
  <svg className="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <ellipse cx="12" cy="12" rx="10" ry="8" stroke="currentColor" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
);
const NotYetIcon = () => (
  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" stroke="currentColor" />
    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 10c0-1.1 1.343-2 3-2s3 .9 3 2-1.343 2-3 2-3-.9-3-2zm0 6h6" />
  </svg>
);

export default function FeedbackVote() {
  const [selectedVote, setSelectedVote] = useState<VoteOption | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voteCounts, setVoteCounts] = useState<VoteCounts>({ ready: 0, interested: 0, not_yet: 0 });
  const [isLoadingCounts, setIsLoadingCounts] = useState(true);

  useEffect(() => {
    // Fetch initial vote counts
    fetchVoteCounts();

    // Refresh counts every 10 seconds
    const interval = setInterval(fetchVoteCounts, 10000);

    return () => clearInterval(interval);
  }, []);

  const fetchVoteCounts = async () => {
    const counts = await getVoteCounts();
    setVoteCounts(counts);
    setIsLoadingCounts(false);
  };

  const handleVote = async (vote: VoteOption) => {
    if (hasVoted || isSubmitting) return;

    setIsSubmitting(true);
    const result = await submitFeedbackVote(vote);

    if (result.success) {
      setSelectedVote(vote);
      setHasVoted(true);
      // Immediately refresh counts to show the new vote
      await fetchVoteCounts();
    }

    setIsSubmitting(false);
  };

  const voteOptions: {
    id: VoteOption,
    label: string,
    icon: React.ReactNode,
    description: string
  }[] = [
    {
      id: 'ready',
      label: "I'm Ready",
      icon: <ReadyIcon />,
      description: 'Sign me up now'
    },
    {
      id: 'interested',
      label: 'Interested',
      icon: <InterestedIcon />,
      description: 'Tell me more'
    },
    {
      id: 'not_yet',
      label: 'Not Yet',
      icon: <NotYetIcon />,
      description: 'Still deciding'
    }
  ];

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Would You Fund With Blackwire?</h3>
        <p className="text-gray-400">Help us understand trader interest</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {voteOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleVote(option.id)}
            disabled={hasVoted || isSubmitting}
            className={`
              relative p-6 rounded-xl border-2 transition-all duration-300
              ${
                selectedVote === option.id
                  ? 'border-cyan-400 bg-cyan-400/10 scale-105'
                  : 'border-white/10 hover:border-cyan-400/50 hover:bg-white/5'
              }
              ${hasVoted && selectedVote !== option.id ? 'opacity-50' : ''}
              ${hasVoted ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
              disabled:cursor-not-allowed
            `}
          >
            <div className="flex justify-center mb-2">{option.icon}</div>
            <div className="text-lg font-bold mb-1">{option.label}</div>
            <div className="text-sm text-gray-400 mb-2">{option.description}</div>
            
            {/* Live vote count */}
            <div className="mt-2 pt-2 border-t border-white/10">
              <div className="text-xs text-gray-500">
                {isLoadingCounts ? (
                  'Loading...'
                ) : (
                  <>
                    <span className="text-cyan-400 font-bold text-sm">{voteCounts[option.id]}</span>
                    <span className="ml-1">{voteCounts[option.id] === 1 ? 'vote' : 'votes'}</span>
                  </>
                )}
              </div>
            </div>
            
            {selectedVote === option.id && (
              <div className="absolute top-2 right-2">
                <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {hasVoted && (
        <div className="mt-6 text-center">
          <p className="text-cyan-400 font-semibold">Thanks for your feedback! 🙏</p>
        </div>
      )}
      
      {/* Total votes */}
      {!isLoadingCounts && (
        <div className="mt-4 text-center text-sm text-gray-500">
          Total responses: <span className="text-cyan-400 font-semibold">{voteCounts.ready + voteCounts.interested + voteCounts.not_yet}</span>
        </div>
      )}
    </div>
  );
}
