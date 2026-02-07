import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useContainerHeight } from '@/lib/hooks/useContainerHeight'
import { useHorizontalScroll } from '@/lib/hooks/useHorizontalScroll'

interface IHorizontalScrollProps {
  slides: number
  children: Iterable<ReactNode>
}

export const HorizontalScroll = ({
  slides,
  children,
}: IHorizontalScrollProps) => {
  const { containerChildRef, containerHeight } = useContainerHeight(slides)
  
  // Initialize based on window width to avoid hydration mismatch if possible, or default to true
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024
    }
    return true
  })

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const lastSlides = Math.max(slides - 1, 0) * 100

  const { scrollerRef, x } = useHorizontalScroll({
    to: ['0%', `-${lastSlides}%`],
  })

  if (!isDesktop) {
    return <>{children}</>
  }

  return (
    <div
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen"
      ref={scrollerRef}
      style={{
        height: `${containerHeight}px`,
      }}
    >
      <div
        ref={containerChildRef}
        className="overflow-x-hidden sticky top-0"
      >
        <motion.div
          className="flex flex-row"
          style={{ x }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
