import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { wrap } from 'motion';
import { Link } from '@tanstack/react-router';
import type { ProjectData } from '@/lib/types/project';
import { Text } from '@/components/ui/Text';
import { PROJECT_DETAILS } from '@/lib/constant/projects';
import { cn } from '@/lib/cn';

interface ProjectFooterProps {
    currentProjectId: string;
}

export const ProjectFooter: React.FC<ProjectFooterProps> = ({ currentProjectId }) => {

  const uniqueProjects = Object.values(PROJECT_DETAILS) as Array<ProjectData>;
  
  const otherProjects = uniqueProjects.filter(p => p.id !== currentProjectId);
  
  const projects = otherProjects;

  const total = projects.length;
  const VISIBLE_RANGE = 1;
  
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextProject = () => setIndex((prev) => prev + 1);
  const prevProject = () => setIndex((prev) => prev - 1);
  
  const virtualIndex = wrap(0, total, index);
  const activeProject = projects[virtualIndex];

  return (
    <footer 
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center transition-[background] duration-1000"
      style={{
        background: activeProject.theme.gradient || 'hsl(var(--primary))'
      }}
    >
      <div className="relative w-full max-w-7xl h-[800px] flex items-center justify-center">
        <AnimatePresence mode="popLayout" initial={false}>
          {projects.map((project, i) => {
            // User's requested logic
            const offset = wrap(-1, total - 1, i - virtualIndex);
            
            const isInsideWindow = Math.abs(offset) <= VISIBLE_RANGE;

            if (!isInsideWindow) return null;
            
            const isCenter = offset === 0;

            // Simple responsive offset logic, can be tuned
            const baseOffset = width < 768 ? 250 : 250; 

            return (
              <SliderCard 
                key={`${project.id}-${i}`}
                project={project}
                offset={offset}
                isCenter={isCenter}
                baseOffset={baseOffset}
              />
            );
          })}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-12 z-50">
        <button 
          onClick={prevProject}
          className="w-12 h-12 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all backdrop-blur-sm cursor-pointer z-50"
        >
          ←
        </button>

        <div className="flex gap-2">
            {projects.map((_, i) => (
                <div 
                    key={i} 
                    className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300", 
                        i === virtualIndex ? "w-8 bg-white" : "bg-white/30"
                    )} 
                />
            ))}
        </div>

        <button 
          onClick={nextProject}
          className="w-12 h-12 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all backdrop-blur-sm cursor-pointer z-50"
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
  baseOffset: number; // Added prop
}

const SliderCard: React.FC<SliderCardProps> = ({ project, offset, isCenter, baseOffset }) => {
  const scale = isCenter ? 1 : 0.85;
  const x = offset * baseOffset; // Use dynamic baseOffset
  const z = isCenter ? 30 : 10;
  const opacity = isCenter ? 1 : 0.9;
  const rotationY = offset * 5;

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
        filter: isCenter ? 'blur(0px)' : 'blur(0px)',
      }}
      exit={{ opacity: 0, scale: 0.5, x: -x }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 25
      }}
    >
      <div className={cn(
        "relative w-full aspect-16/10 rounded-[40px] p-10 md:p-16 overflow-hidden shadow-2xl transition-all duration-500",
        "bg-white border border-white/50" // White card
      )}>
        <div className="flex flex-col h-full relative z-10 text-left items-start">
          <motion.div 
            animate={{ opacity: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block px-3 py-1 rounded-full border border-blue-500/50 bg-blue-50 text-blue-700 text-xs font-bold tracking-widest uppercase shadow-sm">
             {project.tag}
            </span>
          </motion.div>
          
          <Text variant="display" className={cn("font-display transition-all duration-500 text-gray-900", isCenter ? "mb-6 text-5xl" : "mb-0 text-3xl opacity-60")}>
            {project.title}
          </Text>
          
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex flex-col flex-1"
              >
                <Text className="text-xl text-gray-600 mb-10 line-clamp-2 max-w-2xl leading-relaxed">
                  {project.subtitle}
                </Text>

                <div className="flex-1" />

                <div className="mt-12 flex flex-wrap gap-6">
                  <Link
                    to="/projects/$projectId"
                    params={{ projectId: project.id }}
                    className="px-8 py-3 rounded-full bg-gray-900 text-white font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Read Case Study
                  </Link>

                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 rounded-full border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-all"
                    >
                      View on Github
                    </a>
                  )}

                  {project.isShowLiveDemo && project.liveDemoUrl && (
                    <a 
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 rounded-full border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-all"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
        </div>
      </div>
    </motion.div>
  );
};


