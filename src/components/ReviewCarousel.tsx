import React, { useState } from 'react';
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

  if (!reviews || reviews.length === 0) return null;

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  const currentReview = reviews[currentIndex];
  const starScore = (currentReview.score / 2).toFixed(1);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45, ease: "easeOut" },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.35, ease: "easeIn" },
    }),
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto my-8 px-2">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-3xl bg-[#131b2e]/80 border border-purple-900/40 shadow-[0_0_40px_rgba(168,85,247,0.15)] backdrop-blur-md min-h-[420px] md:min-h-[360px] flex items-center">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full grid grid-cols-1 md:grid-cols-12 h-full"
          >
            {/* Image Side */}
            <div className="md:col-span-6 relative h-56 md:h-full overflow-hidden bg-slate-950">
              <img
                src={currentReview.coverImage}
                alt={currentReview.gameTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#090d16] via-transparent to-transparent"></div>
              <div className="absolute top-4 left-4 bg-slate-950/80 border border-amber-500/40 px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                <span className="text-amber-400 text-sm">★</span>
                <span className="text-xs font-bold text-amber-300 font-mono-tech">{starScore}/5</span>
              </div>
            </div>

            {/* Content Side */}
            <div className="md:col-span-6 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono-tech font-bold text-purple-400 uppercase tracking-wider mb-2">
                  <span className="text-cyan-400">{currentReview.genre}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400">{currentReview.platform}</span>
                </div>

                <h3 className="text-3xl font-heading font-black text-white tracking-tight mb-3">
                  {currentReview.gameTitle}
                </h3>

                <p className="text-sm text-slate-300 italic leading-relaxed line-clamp-3 mb-4">
                  "{currentReview.verdict}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex justify-between items-center text-xs font-mono-tech">
                <a
                  href={`/reviews/${currentReview.id}`}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                >
                  READ VERDICT →
                </a>
                <span className="text-slate-500">By {currentReview.author}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-4 px-2">
        {/* Pagination Dots */}
        <div className="flex items-center gap-2">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? 'w-8 bg-purple-500 shadow-[0_0_10px_#a855f7]'
                  : 'w-2 bg-slate-800 hover:bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Arrow Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-xl bg-[#131b2e] border border-slate-800 hover:border-purple-500/60 text-slate-300 hover:text-white flex items-center justify-center font-mono-tech text-lg transition-all"
            aria-label="Previous Slide"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-xl bg-[#131b2e] border border-slate-800 hover:border-purple-500/60 text-slate-300 hover:text-white flex items-center justify-center font-mono-tech text-lg transition-all"
            aria-label="Next Slide"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}