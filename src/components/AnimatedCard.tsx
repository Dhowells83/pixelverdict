import React from 'react';
import { motion } from 'motion/react';

interface CardProps {
  id: string;
  title: string;
  verdict: string;
  coverImage: string;
  genre: string;
  platform: string;
  author: string;
  date: string;
  score: number;
}

export default function AnimatedCard({ id, title, verdict, coverImage, genre, platform, author, date, score }: CardProps) {
  const starScore = (score / 2).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative bg-[#131b2e]/60 rounded-2xl overflow-hidden border border-purple-900/30 hover:border-purple-500/60 shadow-[0_0_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.25)] transition-all duration-300 backdrop-blur-sm flex flex-col h-full"
    >
      <a href={`/reviews/${id}`} className="flex flex-col h-full">
        {/* Cover Image Container */}
        <div class="relative h-52 w-full overflow-hidden bg-slate-950">
          <motion.img 
            src={coverImage} 
            alt={title} 
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.4 }}
            className="h-full w-full object-cover opacity-90 group-hover:opacity-100" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent" />
          
          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-slate-950/80 border border-amber-500/40 px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5 shadow-lg">
            <span className="text-amber-400 text-sm">★</span>
            <span className="text-xs font-bold text-amber-300 font-mono">{starScore}/5</span>
          </div>
        </div>
        
        {/* Card Content */}
        <div className="p-6 flex-grow flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 uppercase tracking-wider mb-2">
              <span className="text-cyan-400">{genre}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">{platform}</span>
            </div>
            
            <h3 className="text-2xl font-heading font-bold text-white group-hover:text-purple-300 transition-colors tracking-tight">
              {title}
            </h3>
            
            <p className="text-sm text-slate-400 mt-2 line-clamp-2 leading-relaxed italic">
              "{verdict}"
            </p>
          </div>
          
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-between items-center text-xs font-mono text-slate-500">
            <span className="group-hover:text-slate-300 transition-colors">By {author}</span>
            <span>{date}</span>
          </div>
        </div>
      </a>
    </motion.div>
  );
}