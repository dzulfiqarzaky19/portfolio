import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { wrap } from 'motion';
import { Link } from '@tanstack/react-router';
import type { ExperienceData } from '@/lib/types/experience';
import { Text } from '@/components/ui/Text';
import { EXPERIENCE_DETAILS } from '@/lib/constant/experience';
import { cn } from '@/lib/cn';

interface ExperienceFooterProps {
  currentExperienceId?: string;
}

export const ExperienceFooter: React.FC<ExperienceFooterProps> = ({ currentExperienceId }) => {
  const allExperiences = Object.values(EXPERIENCE_DETAILS);
  const otherExperiences = allExperiences.filter(p => p.id !== currentExperienceId);
  
  // Ensure we have enough items for smooth infinite scrolling (padding logic)
  const experiences = otherExperiences.length >= 2 ? otherExperiences : allExperiences;

  const total = experiences.length;
  const VISIBLE_RANGE = 1;
  
  const [index, setIndex] = useState(0);

  const nextExperience = () => setIndex((prev) => prev + 1);
  const prevExperience = () => setIndex((prev) => prev - 1);

  const virtualIndex = wrap(0, total, index);
  const activeExperience = experiences[virtualIndex];

  return (
    <footer 
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center transition-[background] duration-1000"
      style={{
        background: activeExperience.theme.gradient 
      }}
    >
      <div className="relative w-full max-w-7xl h-[800px] flex items-center justify-center">
        <AnimatePresence mode="popLayout" initial={false}>
          {experiences.map((experience, i) => {
            const offset = wrap(-1, total - 1, i - virtualIndex);
            
            const isInsideWindow = Math.abs(offset) <= VISIBLE_RANGE;

            if (!isInsideWindow) return null;
            
            const isCenter = offset === 0;

            return (
              <SliderCard 
                key={`${experience.id}-${i}`}
                experience={experience}
                offset={offset}
                isCenter={isCenter}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Controls - Moved to right side for vertical feel */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-50">
        <button 
          onClick={prevExperience}
          className="w-12 h-12 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all backdrop-blur-sm cursor-pointer z-50"
        >
          ↑
        </button>

        <div className="flex flex-col gap-2">
            {experiences.map((_, i) => (
                <div 
                    key={i} 
                    className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300", 
                        i === virtualIndex ? "h-8 bg-white" : "bg-white/30"
                    )} 
                />
            ))}
        </div>

        <button 
          onClick={nextExperience}
          className="w-12 h-12 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all backdrop-blur-sm cursor-pointer z-50"
        >
          ↓
        </button>
      </div>

      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-white/40 text-sm font-bold uppercase tracking-widest">
         Next Experience
      </div>
    </footer>
  );
};

interface SliderCardProps {
  experience: ExperienceData;
  offset: number;
  isCenter: boolean;
}

const SliderCard: React.FC<SliderCardProps> = ({ experience, offset, isCenter }) => {
  const scale = isCenter ? 1.25 : 1;
  const y = offset * 150; // Vertical spacing
  const z = isCenter ? 30 : 10;
  const opacity = isCenter ? 1 : 0.8;
  const rotationX = offset * -10; // Vertical rotation

  return (
    <motion.div
      className="absolute flex items-center justify-center w-full max-w-4xl px-4"
      style={{ zIndex: z }}
      initial={{ opacity: 0, scale: 0.8, y: y * 1.5 }}
      animate={{
        y,
        scale,
        opacity,
        rotateX: rotationX,
        filter: isCenter ? 'blur(0px)' : 'blur(0px)',
      }}
      exit={{ opacity: 0, scale: 0.5, y: -y }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 25
      }}
    >
      <div className={cn(
        "relative w-full aspect-video lg:aspect-2/1 rounded-[32px] p-8 md:p-12 overflow-hidden shadow-2xl transition-all duration-500",
        "bg-white border border-white/50" // White card
      )}>
        <div className="flex flex-col lg:flex-row h-full relative z-10 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col flex-1 items-start text-left h-full justify-center">
            
            <motion.div 
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="mb-6"
            >
                <span className="inline-block px-3 py-1 rounded-full border border-yellow-500/50 bg-yellow-50 text-yellow-700 text-xs font-bold tracking-widest uppercase shadow-sm">
                {experience.role.type}
                </span>
            </motion.div>

            <motion.div
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Text variant="h2" className="text-gray-900 font-bold leading-tight mb-2">
                {experience.company.name}
                </Text>
                
                <Text variant="h3" className="text-gray-500 font-medium text-lg mb-6">
                {experience.role.title}
                </Text>

                <p className="text-gray-600 leading-relaxed mb-8 max-w-sm line-clamp-3">
                {experience.role.description}
                </p>
            </motion.div>

            <motion.div
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="mt-auto"
            >
                <Link
                to="/experience/$experienceId"
                params={{ experienceId: experience.id }}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 text-white font-medium hover:bg-black transition-all shadow-lg hover:shadow-xl"
                >
                View Details
                <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
            </motion.div>
          </div>

          {/* Right Image (Browser Mockup) */}
          {experience.cardImage && (
            <div className={cn(
                "hidden lg:block w-1/2 h-full relative perspective-distant",
                "transition-all duration-700 delay-100",
                "opacity-100 translate-x-0 rotate-y-0"
            )}>
                 {/* Browser Window Frame */}
                <div className="w-full h-full bg-gray-100 rounded-xl overflow-hidden shadow-2xl border border-gray-200/50 flex flex-col">
                    {/* Browser Toolbar */}
                    <div className="h-8 bg-white border-b border-gray-200 flex items-center px-3 gap-2 shrink-0">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                        </div>
                        {/* URL Bar */}
                        <div className="flex-1 mx-4 h-5 bg-gray-100 rounded flex items-center justify-center">
                            <span className="text-[10px] text-gray-400 font-medium truncate max-w-[150px]">
                                {experience.company.name.toLowerCase().replace(/\s+/g, '')}.com
                            </span>
                        </div>
                    </div>
                    {/* Content */}
                    <div className="flex-1 relative bg-gray-50 overflow-hidden group">
                        <img 
                            src={experience.cardImage} 
                            alt={experience.company.name} 
                            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                            loading="lazy"
                        />
                         {/* Hover Overlay */}
                         <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
