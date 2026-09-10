import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

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

interface CarouselProps {
  reviews: ReviewItem[];
}

export default function ReviewCarousel({ reviews }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  if (!reviews || reviews.length === 0) return null;

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused, reviews.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setMousePos({ x: 0, y: 0 });
  };

  const currentReview = reviews[currentIndex];
  const starScore = (currentReview.score / 2).toFixed(1);

  const card3DVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      y: 15,
      z: -200,
      rotateY: dir > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.85,
    }),
    center: {
      x: 0,
      y: 0,
      z: 0,
      rotateY: mousePos.x * 15,
      rotateX: -mousePos.y * 15,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      y: -15,
      z: -200,
      rotateY: dir < 0 ? 30 : -30,
      opacity: 0,
      scale: 0.85,
      transition: { duration: 0.4, ease: 'easeInOut' },
    }),
  };

  return (
    <div
      className="relative w-full max-w-4xl mx-auto my-10 px-2"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Stage Container */}
      <div 
        className="relative min-h-[420px] md:min-h-[360px] flex items-center justify-center select-none"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Flat 2D Hit-Box Anchor: Sits above the 3D perspective transform layer */}
        <a 
          href={`/reviews/${currentReview.id}`} 
          className="absolute inset-0 z-50 cursor-pointer rounded-3xl"
          aria-label={`Read verdict for ${currentReview.gameTitle}`}
        />

        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={card3DVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="group w-full grid grid-cols-1 md:grid-cols-12 rounded-3xl bg-[#131b2e] border-2 border-purple-500/50 shadow-[0_30px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(168,85,247,0.3)] backdrop-blur-xl overflow-hidden relative pointer-events-none"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Image Side */}
            <div className="md:col-span-6 relative h-56 md:h-full overflow-hidden bg-slate-950">
              <img
                src={currentReview.coverImage}
                alt={currentReview.gameTitle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-transparent to-cyan-400/20"></div>
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#090d16] via-transparent to-transparent"></div>

              {/* Star Badge */}
              <div className="absolute top-4 left-4 bg-slate-950/90 border border-amber-500/50 px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-1.5 shadow-[0_10px_20px_rgba(0,0,0,0.8)] z-10">
                <span className="text-amber-400 text-sm">★</span>
                <span className="text-xs font-bold text-amber-300 font-mono-tech">{starScore}/5</span>
              </div>
            </div>

            {/* Content Side */}
            <div className="md:col-span-6 p-6 md:p-8 flex flex-col justify-between relative z-10">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono-tech font-bold text-purple-400 uppercase tracking-wider mb-2">
                  <span className="text-cyan-400">{currentReview.genre}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400">{currentReview.platform}</span>
                </div>

                <h3 className="text-3xl font-heading font-black text-white group-hover:text-purple-300 tracking-tight mb-3 transition-colors">
                  {currentReview.gameTitle}
                </h3>

                <p className="text-sm text-slate-300 italic leading-relaxed line-clamp-3 mb-4">
                  "{currentReview.verdict}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex justify-between items-center text-xs font-mono-tech">
                <span className="px-4 py-2 bg-purple-600 group-hover:bg-purple-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.5)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] inline-block">
                  READ VERDICT →
                </span>
                <span className="text-slate-500">By {currentReview.author}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-6 px-2 relative z-50">
        <div className="flex items-center gap-2">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'w-8 bg-purple-500 shadow-[0_0_12px_#a855f7]'
                  : 'w-2 bg-slate-800 hover:bg-slate-700'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          {isPaused && (
            <span className="text-[10px] font-mono-tech text-purple-400 uppercase tracking-widest">// CLICK TO OPEN</span>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-xl bg-[#131b2e] border border-slate-800 hover:border-purple-500/60 text-slate-300 hover:text-white flex items-center justify-center font-mono-tech text-lg transition-all shadow-lg cursor-pointer"
              aria-label="Previous Slide"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-xl bg-[#131b2e] border border-slate-800 hover:border-purple-500/60 text-slate-300 hover:text-white flex items-center justify-center font-mono-tech text-lg transition-all shadow-lg cursor-pointer"
              aria-label="Next Slide"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}