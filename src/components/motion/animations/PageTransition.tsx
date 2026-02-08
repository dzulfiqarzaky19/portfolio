import { forwardRef } from 'react'
import { motion } from 'motion/react'
import type { MotionProps } from 'motion/react'
import { cn } from '@/lib/cn'

interface PageTransitionProps extends MotionProps {
  children: React.ReactNode
  className?: string
}

export const PageTransition = forwardRef<HTMLDivElement, PageTransitionProps>(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ 
        duration: 0.5, 
        ease: [0.7, 0.3, 0.3, 0.7] 
      }}
      className={cn('w-full', className)}
      {...props}
    >
      {children}
    </motion.div>
  )
})

PageTransition.displayName = 'PageTransition'
