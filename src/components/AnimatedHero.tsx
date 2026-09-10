import React from 'react';
import { motion } from 'motion/react';

export default function AnimatedHero() {
  return (
    <section className="py-12 md:py-24 text-center relative overflow-hidden">
      {/* Ambient Pulsing Glow Backgrounds */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-purple-600 blur-[140px] rounded-full pointer-events-none -z-10"
      />
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[180px] bg-cyan-500 blur-[110px] rounded-full pointer-events-none -z-10"
      />

      <motion.span 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-block px-3 py-1 bg-purple-950/60 border border-purple-500/30 rounded-full text-xs font-mono font-bold text-purple-300 mb-6 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
      >
        // HIGH-PRECISION EVALUATIONS
      </motion.span>
      
      <motion.h1 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-5xl md:text-7xl lg:text-8xl font-heading font-black tracking-tight mb-6 text-white uppercase leading-none"
      >
        NO NOISE. JUST <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">VERDICTS.</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal"
      >
        Unfiltered analysis, technical breakdowns, and 5-star ratings for modern PC, PlayStation, Xbox, and Switch releases.
      </motion.p>
    </section>
  );
}