import React from 'react';
import { motion } from 'motion/react';
import { Text } from '@/components/ui/Text';

interface ProjectHeroProps {
  tag: string;
  title: string;
  subtitle: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  isShowLiveDemo?: boolean;
}

export const ProjectHero: React.FC<ProjectHeroProps> = ({ 
  tag, 
  title, 
  subtitle,
  githubUrl,
  liveDemoUrl,
  isShowLiveDemo 
}) => {
  return (
    <section className="pt-32 pb-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-3 py-1 rounded-full bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] text-xs font-bold tracking-wider uppercase mb-6">
          {tag}
        </span>
        <Text variant="hero" className="mb-8 font-display">
          {title}
        </Text>
        <Text variant="lead" className="max-w-2xl mx-auto text-[hsl(var(--muted))] mb-12">
          {subtitle}
        </Text>

        <div className="flex flex-wrap justify-center gap-4">
          {githubUrl && (
            <a 
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[hsl(var(--ink))] text-[hsl(var(--surface-1))] font-bold hover:opacity-90 transition-opacity"
            >
              View on Github
            </a>
          )}
          {isShowLiveDemo && liveDemoUrl && (
            <a 
              href={liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--surface-1))] font-bold hover:bg-[hsl(var(--primary-hover))] transition-colors"
            >
              Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </section>
  );
};
