import { motion } from 'motion/react'
import React from 'react'
import { cn } from '@/lib/cn'

interface TiltOnViewProps {
  children: React.ReactNode
  direction?: 'left' | 'right'
  className?: string
}

export const TiltOnView: React.FC<TiltOnViewProps> = ({
  children,
  direction = 'right',
  className,
}) => {
  const rotation = direction === 'left' ? -5 : 5

  return (
    <motion.div
      initial={{ rotate: rotation, scale: 0.95, opacity: 0 }}
      whileInView={{ rotate: 0, scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className={cn('relative', className)}
    >
      {children}
    </motion.div>
  )
}
