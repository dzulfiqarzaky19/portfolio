import { motion } from 'motion/react'
import React from 'react'

interface StaggerItemProps {
  children: React.ReactNode
  index: number
  staggerDelay?: number
  className?: string
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  index,
  staggerDelay = 0.1,
  className,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * staggerDelay }}
    className={className}
  >
    {children}
  </motion.div>
)
