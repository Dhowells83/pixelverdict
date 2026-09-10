import React, { useState, useEffect, useMemo } from 'react';

interface ReviewItem {
  id: string;
  gameTitle: string;
  verdict: string;
  coverImage: string;
  genre: string;
  platform: string;
  platforms?: string[];
  author: string;
  date: string;
  score: number;
}

interface FilterProps {
  initialReviews: ReviewItem[];
}

export default function ReviewFilter({ initialReviews }: FilterProps) {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('ALL');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('ALL');
  const [minRating, setMinRating] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const genres = useMemo(() => {
    const list = Array.from(new Set(initialReviews.map((r) => r.genre).filter(Boolean)));
    return ['ALL', ...list.sort()];
  }, [initialReviews]);

  const platforms = useMemo(() => {
    const allPlatforms = initialReviews.flatMap((r) => r.platforms || [r.platform]).filter(Boolean);
    const list = Array.from(new Set(allPlatforms));
    return ['ALL', ...list.sort()];
  }, [initialReviews]);

  const filteredReviews = useMemo(() => {
    return initialReviews.filter((review) => {
      const starRating = review.score / 2;
      const reviewPlatforms = review.platforms || [review.platform];

      const matchesSearch =
        review.gameTitle.toLowerCase().includes(search.toLowerCase()) ||
        review.genre.toLowerCase().includes(search.toLowerCase()) ||
        reviewPlatforms.some(p => p.toLowerCase().includes(search.toLowerCase()));

      const matchesGenre = selectedGenre === 'ALL' || review.genre.toLowerCase() === selectedGenre.toLowerCase();
      const matchesPlatform =
        selectedPlatform === 'ALL' ||
        reviewPlatforms.some(p => p.toLowerCase() === selectedPlatform.toLowerCase());

      const matchesRating = minRating === 0 || starRating >= minRating;

      return matchesSearch && matchesGenre && matchesPlatform && matchesRating;
    });
  }, [initialReviews, search, selectedGenre, selectedPlatform, minRating]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedGenre, selectedPlatform, minRating]);

  const totalPages = Math.ceil(filteredReviews.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedReviews = filteredReviews.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const resetAllFilters = () => {
    setSearch('');
    setSelectedGenre('ALL');
    setSelectedPlatform('ALL');
    setMinRating(0);
  };

  return (
    <div>
      {/* Controls Panel */}
      <div className="bg-[#131b2e]/80 border border-purple-900/40 p-4 md:p-6 rounded-2xl backdrop-blur-md mb-8 flex flex-col gap-4 shadow-[0_0_25px_rgba(0,0,0,0.4)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <input
              type="text"
              placeholder="Search games, titles, or mechanics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#070a12] border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-xs font-mono-tech text-slate-100 outline-none transition-colors placeholder:text-slate-600"
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

          {/* Genre Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full bg-[#070a12] border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2.5 text-xs font-mono-tech text-slate-200 outline-none transition-colors cursor-pointer"
            >
              <option value="ALL">GENRE: ALL</option>
              {genres.filter(g => g !== 'ALL').map((genre) => (
                <option key={genre} value={genre}>
                  GENRE: {genre.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Platform Dropdown */}
          <div className="md:col-span-4">
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full bg-[#070a12] border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2.5 text-xs font-mono-tech text-slate-200 outline-none transition-colors cursor-pointer"
            >
              <option value="ALL">PLATFORM: ALL</option>
              {platforms.filter(p => p !== 'ALL').map((platform) => (
                <option key={platform} value={platform}>
                  PLATFORM: {platform.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Rating Filter Buttons & Reset */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/80">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-mono-tech text-slate-400 mr-1 whitespace-nowrap">// RATING:</span>
            {[0, 3, 4, 4.5].map((stars) => (
              <button
                key={stars}
                onClick={() => setMinRating(stars)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech font-bold transition-all whitespace-nowrap ${
                  minRating === stars
                    ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                    : 'bg-[#070a12] text-slate-400 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {stars === 0 ? 'ALL' : `${stars}+ ★`}
              </button>
            ))}
          </div>

          {(search || selectedGenre !== 'ALL' || selectedPlatform !== 'ALL' || minRating !== 0) && (
            <button
              onClick={resetAllFilters}
              className="text-xs font-mono-tech text-purple-400 hover:text-purple-300 font-bold uppercase transition-colors"
            >
              [RESET ALL FILTERS]
            </button>
          )}
        </div>
      </div>

      {/* Live Count Status Bar */}
      <div className="flex justify-between items-center mb-6 border-b border-slate-800/80 pb-3">
        <h2 className="text-xl font-heading font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-cyan-400 rounded-xs shadow-[0_0_8px_#06b6d4]"></span>
          All Verdicts
        </h2>
        <span className="text-xs font-mono-tech text-slate-500">
          // SHOWING {paginatedReviews.length} OF {filteredReviews.length} (PAGE {currentPage} OF {totalPages || 1})
        </span>
      </div>

      {/* Filtered Review Cards Grid */}
      {paginatedReviews.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedReviews.map((review) => {
              const starScore = (review.score / 2).toFixed(1);
              const displayPlatforms = review.platforms ? review.platforms.join(' • ') : review.platform;

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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1322] via-transparent to-transparent"></div>

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
                        <span className="text-slate-400 truncate max-w-[150px]">{displayPlatforms}</span>
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-12 font-mono-tech">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl bg-[#131b2e] border border-slate-800 hover:border-purple-500/60 disabled:opacity-40 disabled:hover:border-slate-800 text-slate-300 text-xs font-bold transition-all"
              >
                ← PREV
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                      currentPage === page
                        ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                        : 'bg-[#131b2e] text-slate-400 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl bg-[#131b2e] border border-slate-800 hover:border-purple-500/60 disabled:opacity-40 disabled:hover:border-slate-800 text-slate-300 text-xs font-bold transition-all"
              >
                NEXT →
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 bg-[#131b2e]/30 border border-slate-800/80 rounded-2xl">
          <p className="text-slate-400 font-mono-tech text-sm">// NO VERDICTS FOUND MATCHING YOUR FILTER CRITERIA</p>
          <button
            onClick={resetAllFilters}
            className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-mono-tech text-xs font-bold rounded-lg transition-colors"
          >
            RESET ALL FILTERS
          </button>
        </div>
      )}
    </div>
  );
}