import React, { useState, useEffect } from 'react';

interface VerdictSplitProps {
  reviewId: string;
  criticScore: number; // 0 - 10 scale
  initialCommunityScore?: number;
  initialTotalVotes?: number;
}

export default function VerdictSplit({
  reviewId,
  criticScore,
  initialCommunityScore = 8.2,
  initialTotalVotes = 142,
}: VerdictSplitProps) {
  const [userRating, setUserRating] = useState<number | null>(null);
  const [agreed, setAgreed] = useState<boolean | null>(null);
  const [communityScore, setCommunityScore] = useState<number>(initialCommunityScore);
  const [totalVotes, setTotalVotes] = useState<number>(initialTotalVotes);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  // Load existing vote from localStorage
  useEffect(() => {
    const savedVote = localStorage.getItem(`pv_vote_${reviewId}`);
    if (savedVote) {
      const parsed = JSON.parse(savedVote);
      setUserRating(parsed.rating);
      setAgreed(parsed.agreed);
      setHasVoted(true);
    }
  }, [reviewId]);

  const handleVote = (rating: number) => {
    if (hasVoted) return;

    const newTotalVotes = totalVotes + 1;
    const newCommunityScore = Number(
      ((communityScore * totalVotes + rating) / newTotalVotes).toFixed(1)
    );

    setCommunityScore(newCommunityScore);
    setTotalVotes(newTotalVotes);
    setUserRating(rating);
    setHasVoted(true);

    // Save vote state
    localStorage.setItem(
      `pv_vote_${reviewId}`,
      JSON.stringify({ rating, agreed: rating >= 7 })
    );
  };

  const criticStars = (criticScore / 2).toFixed(1);
  const communityStars = (communityScore / 2).toFixed(1);

  return (
    <div className="bg-[#131b2e]/80 border border-purple-900/40 rounded-2xl p-6 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)] my-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
        <h3 className="text-lg font-heading font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-xs bg-cyan-400 shadow-[0_0_8px_#06b6d4]"></span>
          The Verdict Split
        </h3>
        <span className="text-xs font-mono-tech text-cyan-400 font-bold uppercase">
          // CRITIC VS COMMUNITY
        </span>
      </div>

      {/* Comparison Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Critic Score */}
        <div className="bg-[#05070e]/90 border border-purple-500/30 rounded-xl p-4 flex items-center justify-between shadow-[0_0_15px_rgba(168,85,247,0.15)]">
          <div>
            <span className="text-[10px] font-mono-tech text-purple-400 uppercase tracking-widest font-bold">
              // PIXELVERDICT CRITIC
            </span>
            <p className="text-2xl font-heading font-black text-white mt-1">
              {criticStars} <span className="text-xs text-amber-400">★</span>
            </p>
          </div>
          <div className="text-right font-mono-tech text-xs text-slate-400">
            <span>OFFICIAL SCORE</span>
          </div>
        </div>

        {/* Community Score */}
        <div className="bg-[#05070e]/90 border border-cyan-500/30 rounded-xl p-4 flex items-center justify-between shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <div>
            <span className="text-[10px] font-mono-tech text-cyan-400 uppercase tracking-widest font-bold">
              // COMMUNITY RATING
            </span>
            <p className="text-2xl font-heading font-black text-white mt-1">
              {communityStars} <span className="text-xs text-amber-400">★</span>
            </p>
          </div>
          <div className="text-right font-mono-tech text-xs text-slate-400">
            <span>{totalVotes} VOTES</span>
          </div>
        </div>
      </div>

      {/* Interactive Voting Panel */}
      <div className="bg-[#05070e]/80 border border-slate-800 rounded-xl p-4 font-mono-tech text-center">
        {!hasVoted ? (
          <div>
            <span className="text-xs text-slate-300 font-bold uppercase tracking-wider block mb-3">
              CAST YOUR VERDICT RATING
            </span>
            <div className="flex justify-center items-center gap-2">
              {[2, 4, 6, 8, 10].map((val) => (
                <button
                  key={val}
                  onClick={() => handleVote(val)}
                  className="px-3.5 py-2 bg-[#131b2e] border border-slate-800 hover:border-purple-500 hover:bg-purple-600/30 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  {(val / 2).toFixed(1)} ★
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-2">
            <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">
              ✓ YOUR VOTE HAS BEEN RECORDED ({((userRating || 0) / 2).toFixed(1)} ★)
            </span>
            <p className="text-[11px] text-slate-500 mt-1">
              Thanks for contributing to the PixelVerdict community consensus!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}