import { motion, useScroll, useSpring } from 'framer-motion';
import type { ProjectSection } from '@/lib/types/project';

interface VerticalProgressProps {
  sections: Array<ProjectSection>;
}

export const VerticalProgress: React.FC<VerticalProgressProps> = ({ sections }) => {
  const { scrollYProgress } = useScroll();
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed inset-y-0 left-1/2 -translate-x-1/2 pointer-events-none z-0 hidden lg:block">
      {/* Background Line */}
      <div className="absolute inset-y-0 w-px bg-[hsl(var(--border)/0.5)]" />
      
      {/* Progress Line */}
      <motion.div 
        className="absolute top-0 w-px bg-[hsl(var(--primary))] origin-top"
        style={{ scaleY: lineScale, height: '100%' }}
      />

      {/* Dots for each section */}
      <div className="absolute inset-0 flex flex-col justify-between py-32">
        {/* We'll need a way correlate dots with section positions. 
            For now, let's put them at equal intervals or just rely on the sections to render their own dots.
            Actually, it's better if sections render their own dots on the line.
        */}
      </div>
    </div>
  );
};
