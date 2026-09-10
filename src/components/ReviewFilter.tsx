import React, { useState } from 'react';

interface ReviewItem {
  id: string;
  gameTitle: string;
  verdict: string;
  coverImage: string;
  genre: string;
  platform: string;
  author: string;
  date: string;
  score: number;
}

interface FilterProps {
  initialReviews: ReviewItem[];
}

export default function ReviewFilter({ initialReviews }: FilterProps) {
  const [search, setSearch] = useState('');
  const [minRating, setMinRating] = useState<number>(0);

  const filteredReviews = initialReviews.filter((review) => {
    const starRating = review.score / 2;
    const matchesSearch = 
      review.gameTitle.toLowerCase().includes(search.toLowerCase()) ||
      review.genre.toLowerCase().includes(search.toLowerCase()) ||
      review.platform.toLowerCase().includes(search.toLowerCase());
    
    const matchesRating = minRating === 0 || starRating >= minRating;

    return matchesSearch && matchesRating;
  });

  return (
    <div>
      {/* Controls Panel */}
      <div className="bg-[#131b2e]/80 border border-purple-900/40 p-4 md:p-6 rounded-2xl backdrop-blur-md mb-8 flex flex-col md:flex-row gap-4 items-center justify-between shadow-[0_0_25px_rgba(0,0,0,0.5)]">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search game, genre, or platform..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#05070e] border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm font-mono-tech text-slate-100 outline-none transition-colors placeholder:text-slate-600"
          />
          {search && (
            <button 
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs font-mono-tech"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Rating Filter Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <span className="text-xs font-mono-tech text-slate-400 mr-1 whitespace-nowrap">// MIN RATING:</span>
          {[0, 3, 4, 4.5].map((stars) => (
            <button
              key={stars}
              onClick={() => setMinRating(stars)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech font-bold transition-all whitespace-nowrap ${
                minRating === stars
                  ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                  : 'bg-[#05070e] text-slate-400 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {stars === 0 ? 'ALL' : `${stars}+ ★`}
            </button>
          ))}
        </div>
      </div>

      {/* Live Count Status */}
      <div className="flex justify-between items-center mb-6 border-b border-slate-800/80 pb-3">
        <h2 className="text-xl font-heading font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-cyan-400 rounded-xs shadow-[0_0_8px_#06b6d4]"></span>
          Filtered Results
        </h2>
        <span className="text-xs font-mono-tech text-slate-500">
          // SHOWING {filteredReviews.length} OF {initialReviews.length}
        </span>
      </div>

      {/* Filtered Review Cards Grid */}
      {filteredReviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => {
            const starScore = (review.score / 2).toFixed(1);
            return (
              <a 
                key={review.id}
                href={`/reviews/${review.id}`} 
                className="group bg-[#131b2e]/70 rounded-2xl overflow-hidden hover:-translate-y-1.5 transition-all duration-300 border border-purple-900/40 hover:border-purple-500/70 flex flex-col shadow-[0_0_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(168,85,247,0.3)] backdrop-blur-md"
              >
                <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                  <img 
                    src={review.coverImage} 
                    alt={review.gameTitle} 
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent"></div>
                  
                  <div className="absolute top-3 right-3 bg-slate-950/80 border border-amber-500/40 px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                    <span className="text-amber-400 text-sm">★</span>
                    <span className="text-xs font-bold text-amber-300 font-mono-tech">{starScore}/5</span>
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono-tech font-bold text-purple-400 uppercase tracking-wider mb-2">
                      <span className="text-cyan-400">{review.genre}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400">{review.platform}</span>
                    </div>
                    
                    <h3 className="text-2xl font-heading font-bold text-white group-hover:text-purple-300 transition-colors tracking-tight">
                      {review.gameTitle}
                    </h3>
                    
                    <p className="text-sm text-slate-400 mt-2 line-clamp-2 leading-relaxed italic">
                      "{review.verdict}"
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-between items-center text-xs font-mono-tech text-slate-500">
                    <span className="group-hover:text-slate-300 transition-colors">By {review.author}</span>
                    <span>{review.date}</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#131b2e]/30 border border-slate-800/80 rounded-2xl">
          <p className="text-slate-400 font-mono-tech text-sm">// NO VERDICTS FOUND MATCHING YOUR CRITERIA</p>
          <button 
            onClick={() => { setSearch(''); setMinRating(0); }}
            className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-mono-tech text-xs font-bold rounded-lg transition-colors"
          >
            RESET FILTERS
          </button>
        </div>
      )}
    </div>
  );
}