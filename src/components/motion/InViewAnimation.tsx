import { motion } from 'framer-motion'
import React, { Children, cloneElement, forwardRef } from 'react'
import { cn } from '@/lib/cn'

interface IInviewTransitionProps {
  children: React.ReactNode
  className?: string
}

export const InViewTransition = forwardRef<
  HTMLDivElement,
  IInviewTransitionProps
>(({ children, className }, ref) => {
  // should access below parent
  // parent -> inview -> child
  // trying to do this inview -> parent -> child (take the child)
  // it works, but still destroy styling on parents, if they got flex, wont be implemented to child, because this component cannot be detected as <></>
  return Children.map(children, (child) => {
    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, staggerChildren: 0.15 }}
      >
        {React.isValidElement(child) ? cloneElement(child) : child}
      </motion.div>
    )
  })
})
