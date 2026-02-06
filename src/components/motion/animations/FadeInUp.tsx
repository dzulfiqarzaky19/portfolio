import { motion } from 'motion/react'
import React from 'react'

interface FadeInUpProps {
  children: React.ReactNode
  delay?: number
  distance?: number
  className?: string
}

export const FadeInUp: React.FC<FadeInUpProps> = ({
  children,
  delay = 0,
  distance = 20,
  className,
}) => (
  <motion.div
    initial={{ opacity: 0, y: distance }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
)
