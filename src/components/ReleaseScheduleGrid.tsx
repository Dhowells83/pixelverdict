import React, { useState, useEffect, useMemo } from 'react';

interface GameRelease {
  id: number;
  title: string;
  releaseDate: string;
  coverImage: string;
  platforms: string[];
  genres: string[];
  publisher: string;
  source: 'Official eShop' | 'PlayStation Direct' | 'Xbox Store' | 'Steam' | 'IGDB Feed';
}

export default function ReleaseScheduleGrid() {
  const [releases, setReleases] = useState<GameRelease[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('ALL');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const res = await fetch('/api/releases');
        const data = await res.json();
        setReleases(data);
      } catch (e) {
        console.error('Failed to load schedule data', e);
      } finally {
        setLoading(false);
      }
    }
    fetchSchedule();
  }, []);

  const platforms = ['ALL', 'PC', 'PlayStation 5', 'Xbox Series X/S', 'Nintendo Switch'];

  const filteredReleases = useMemo(() => {
    if (selectedPlatform === 'ALL') return releases;
    return releases.filter((game) =>
      game.platforms.some((p) => p.toLowerCase().includes(selectedPlatform.toLowerCase()))
    );
  }, [releases, selectedPlatform]);

  if (loading) {
    return (
      <div className="text-center py-20 font-mono-tech text-purple-400 animate-pulse">
        // AGGREGATING STEAM, PLAYSTATION, XBOX, & NINTENDO RELEASE DATA...
      </div>
    );
  }

  return (
    <div>
      {/* Platform Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        {platforms.map((platform) => (
          <button
            key={platform}
            onClick={() => setSelectedPlatform(platform)}
            className={`px-4 py-2 rounded-xl text-xs font-mono-tech font-bold uppercase transition-all cursor-pointer ${
              selectedPlatform === platform
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] border border-purple-400'
                : 'bg-[#131b2e]/80 text-slate-400 border border-purple-900/40 hover:text-slate-200'
            }`}
          >
            {platform === 'ALL' ? '🎮 ALL STORES' : platform}
          </button>
        ))}
      </div>

      {/* Release Cards Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReleases.map((game) => (
          <div
            key={game.id}
            className="group bg-[#131b2e]/80 rounded-2xl border border-purple-900/40 overflow-hidden backdrop-blur-md flex flex-col justify-between hover:-translate-y-1 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            <div className="relative h-48 w-full overflow-hidden bg-slate-950">
              <img
                src={game.coverImage}
                alt={game.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e] via-transparent to-transparent"></div>

              {/* Source Store Badge */}
              <div className="absolute top-3 left-3 bg-slate-950/90 border border-cyan-500/40 px-2.5 py-1 rounded-full text-[10px] font-mono-tech font-bold text-cyan-300 shadow-lg">
                ⚡ {game.source}
              </div>

              {/* Release Date Chip */}
              <div className="absolute top-3 right-3 bg-purple-950/90 border border-purple-500/50 px-3 py-1 rounded-full text-xs font-mono-tech font-bold text-purple-300 shadow-lg">
                📅 {game.releaseDate}
              </div>
            </div>

            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono-tech text-cyan-400 font-bold uppercase tracking-wider mb-2">
                  <span>{game.genres.join(' • ')}</span>
                  <span className="text-slate-500 text-[10px]">{game.publisher}</span>
                </div>

                <h3 className="text-xl font-heading font-bold text-white group-hover:text-purple-300 transition-colors mb-3">
                  {game.title}
                </h3>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5 mt-4">
                {game.platforms.map((p) => (
                  <span
                    key={p}
                    className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono-tech text-slate-300"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}