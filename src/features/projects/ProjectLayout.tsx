import { motion, useScroll, useSpring } from 'motion/react';
import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { ProjectFooter } from './components/ProjectFooter.tsx';
import { ProjectHero } from './components/ProjectHero.tsx';
import { ProjectSection } from './components/ProjectSection.tsx';
import { VerticalProgress } from './components/VerticalProgress.tsx';
import type { ProjectData } from '@/lib/types/project';

interface ProjectLayoutProps {
  project: ProjectData;
}

export const ProjectLayout: React.FC<ProjectLayoutProps> = ({ project }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen bg-[hsl(var(--surface-1))] text-[hsl(var(--ink))]">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[hsl(var(--primary))] origin-left z-50"
        style={{ scaleX }}
      />

      <VerticalProgress sections={project.sections} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <Link 
          to="/" 
          className="absolute top-8 left-6 lg:left-8 z-10 flex items-center gap-2 text-sm font-medium text-[hsl(var(--muted))] hover:text-[hsl(var(--primary))] transition-colors max-w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <ProjectHero 
          tag={project.tag} 
          title={project.title} 
          subtitle={project.subtitle} 
          githubUrl={project.githubUrl}
          liveDemoUrl={project.liveDemoUrl}
          isShowLiveDemo={project.isShowLiveDemo}
        />

        <div className="space-y-32 py-24">
          {project.sections.map((section, index) => (
            <ProjectSection 
              key={section.id} 
              section={section} 
              index={index} 
            />
          ))}
        </div>
      </div>

      <ProjectFooter currentProjectId={project.id} />
    </div>
  );
};
