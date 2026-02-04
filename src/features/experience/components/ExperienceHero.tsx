import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import type { ExperienceData } from '@/lib/types/experience';

interface ExperienceHeroProps {
  data: ExperienceData;
}

export const ExperienceHero: React.FC<ExperienceHeroProps> = ({ data }) => {
  return (
    <div 
      className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden"
      style={{
        background: data.theme.gradient,
      }}
    >
      <Link 
        to="/" 
        className="absolute top-8 left-6 lg:left-8 z-10 flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        <div className="inline-block px-3 py-1 mb-6 rounded-full bg-white/10 text-white/90 text-xs font-bold tracking-wider uppercase backdrop-blur-sm border border-white/20">
            {data.role.type}
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-display tracking-tight leading-tight">
            {data.company.name}
        </h1>

        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
            {data.role.description}
        </p>

        <div className="flex gap-4 justify-center mt-8">
            <button className="px-6 py-3 rounded-full bg-white text-[hsl(var(--primary))] font-bold hover:bg-white/90 transition-colors shadow-lg">
                View Project
            </button>
             <button className="px-6 py-3 rounded-full bg-transparent border-2 border-white text-white font-bold hover:bg-white/10 transition-colors">
                View Code
            </button>
        </div>
      </motion.div>
      
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl translate-y-1/3" />
      </div>
    </div>
  );
};
