import React from 'react';
import { motion } from 'motion/react';
import { Text } from '@/components/ui/Text';

import { cn } from '@/lib/cn';

interface ProjectHeroProps {
  tag: string;
  title: string;
  subtitle: string;
  links?: Array<{
    url: string;
    label: string;
    icon?: 'github' | 'live' | 'other';
  }>;
  githubUrl?: string;
  liveDemoUrl?: string;
  isShowLiveDemo?: boolean;
}

export const ProjectHero: React.FC<ProjectHeroProps> = ({ 
  tag, 
  title, 
  subtitle,
  links,
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
          {/* New Links Implementation */}
          {links && links.length > 0 ? (
            links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "px-6 py-3 rounded-full font-bold transition-colors flex items-center gap-2",
                  link.icon === 'live' 
                    ? "bg-[hsl(var(--primary))] text-[hsl(var(--surface-1))] hover:bg-[hsl(var(--primary-hover))]" 
                    : "bg-[hsl(var(--ink))] text-[hsl(var(--surface-1))] hover:opacity-90"
                )}
              >
                {link.label}
              </a>
            ))
          ) : (
            // Fallback for legacy props
            <>
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
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
};
