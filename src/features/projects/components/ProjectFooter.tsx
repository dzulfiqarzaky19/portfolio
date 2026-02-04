import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from '@tanstack/react-router';
import type { ProjectData } from '@/lib/types/project';
import { Text } from '@/components/ui/Text';
import { PROJECT_DETAILS } from '@/lib/constant/projects';

interface ProjectFooterProps {
  currentProjectId?: string;
}

export const ProjectFooter: React.FC<ProjectFooterProps> = ({ currentProjectId }) => {
  // Filter out the current project to show "other" projects
  const allProjects = Object.values(PROJECT_DETAILS).filter((p): p is ProjectData => p !== undefined);
  const otherProjects = allProjects.filter(p => p.id !== currentProjectId);
  
  // Ensure we have at least 3 for a nice slider, or fallback to all if needed
  const projects = otherProjects.length >= 2 ? otherProjects : allProjects;
  
  const [activeIndex, setActiveIndex] = useState(0);

  const nextProject = () => setActiveIndex((prev) => (prev + 1) % projects.length);
  const prevProject = () => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);

  const bgColors = [
    "bg-[hsl(255,80%,48%)]", 
    "bg-[hsl(190,85%,40%)]", 
    "bg-[hsl(280,75%,45%)]", 
    "bg-[hsl(160,80%,35%)]",
  ];

  return (
    <footer className={cn(
      "relative w-full h-screen overflow-hidden flex flex-col items-center justify-center transition-colors duration-1000",
      bgColors[activeIndex % bgColors.length]
    )}>
      <div className="relative w-full max-w-7xl h-[800px] flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {projects.map((project, index) => {
            let offset = index - activeIndex;
            if (offset > projects.length / 2) offset -= projects.length;
            if (offset < -projects.length / 2) offset += projects.length;

            const isCenter = index === activeIndex;
            const isVisible = Math.abs(offset) <= 1;

            if (!isVisible) return null;

            return (
              <SliderCard 
                key={project.id}
                project={project}
                offset={offset}
                isCenter={isCenter}
              />
            );
          })}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-12 z-50">
        <button 
          onClick={prevProject}
          className="w-12 h-12 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all backdrop-blur-sm"
        >
          ←
        </button>

        <div className="flex gap-2">
            {projects.map((_, i) => (
                <div 
                    key={i} 
                    className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300", 
                        i === activeIndex ? "w-8 bg-white" : "bg-white/30"
                    )} 
                />
            ))}
        </div>

        <button 
          onClick={nextProject}
          className="w-12 h-12 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all backdrop-blur-sm"
        >
          →
        </button>
      </div>

      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-white/40 text-sm font-bold uppercase tracking-widest">
         Next Case Study
      </div>
    </footer>
  );
};

interface SliderCardProps {
  project: ProjectData;
  offset: number;
  isCenter: boolean;
}

const SliderCard: React.FC<SliderCardProps> = ({ project, offset, isCenter }) => {
  const scale = isCenter ? 1 : 0.75;
  const x = offset * 550; 
  const z = isCenter ? 30 : 10;
  const opacity = isCenter ? 1 : 0.5;
  const rotationY = offset * 12;

  return (
    <motion.div
      className="absolute flex items-center justify-center w-full max-w-2xl md:max-w-3xl"
      style={{ zIndex: z }}
      initial={{ opacity: 0, scale: 0.8, x: x * 1.5 }}
      animate={{
        x,
        scale,
        opacity,
        rotateY: rotationY,
        filter: isCenter ? 'blur(0px)' : 'blur(6px)',
      }}
      exit={{ opacity: 0, scale: 0.5, x: -x }}
      transition={{
        type: 'spring',
        stiffness: 120,
        damping: 20
      }}
    >
      <div className={cn(
        "relative w-full aspect-16/10 rounded-[40px] p-10 md:p-16 overflow-hidden border border-white/20 backdrop-blur-xl transition-all duration-500",
        isCenter ? "bg-white/15 shadow-2xl shadow-black/40" : "bg-white/5"
      )}>
        <div className="flex flex-col h-full text-white relative z-10">
          <motion.span 
            animate={{ opacity: isCenter ? 0.6 : 0 }}
            className="text-sm font-bold tracking-[0.2em] uppercase mb-4"
          >
            {project.tag}
          </motion.span>
          
          <Text variant="display" color="surface" className={cn("font-display transition-all duration-500", isCenter ? "mb-6 text-5xl" : "mb-0 text-3xl opacity-60")}>
            {project.title}
          </Text>
          
          <AnimatePresence>
            {isCenter && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex flex-col flex-1"
              >
                <Text color="surface" className="text-xl opacity-80 mb-10 line-clamp-2 max-w-2xl leading-relaxed">
                  {project.subtitle}
                </Text>

                <div className="flex-1" />

                <div className="mt-12 flex flex-wrap gap-6">
                  <Link
                    to="/projects/$projectId"
                    params={{ projectId: project.id }}
                    className="px-10 py-4 rounded-full bg-white text-black font-bold border-2 border-white hover:bg-transparent hover:text-white transition-all shadow-xl hover:shadow-white/10"
                  >
                    Read Case Study
                  </Link>

                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-10 py-4 rounded-full border-2 border-white/20 text-white font-bold hover:bg-white/10 transition-all backdrop-blur-md"
                    >
                      View on Github
                    </a>
                  )}

                  {project.isShowLiveDemo && project.liveDemoUrl && (
                    <a 
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-10 py-4 rounded-full border-2 border-white/20 text-white font-bold hover:bg-white/10 transition-all backdrop-blur-md"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

function cn(...classes: Array<string | boolean | undefined | null>) {
  return classes.filter(Boolean).join(' ');
}
