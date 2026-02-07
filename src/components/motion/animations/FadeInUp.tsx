import { motion  } from 'motion/react'
import type {HTMLMotionProps} from 'motion/react';
import { cn } from '@/lib/cn'

interface FadeInUpProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  delay?: number
  distance?: number
  className?: string
}

export const FadeInUp = ({
  children,
  delay = 0,
  distance = 20,
  className,
  initial,
  animate,
  transition,
  ...props
}: FadeInUpProps) => (
  <motion.div
    initial={initial || { opacity: 0, y: distance }}
    animate={animate || { opacity: 1, y: 0 }}
    transition={transition || { duration: 0.6, delay }}
    className={cn(className)}
    {...props}
  >
    {children}
  </motion.div>
)
