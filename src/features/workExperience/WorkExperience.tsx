import { motion } from 'motion/react'
import { Article } from './components/Article'
import { useContainerHeight } from './useContainerHHeight'
import { EXPERIENCE } from '@/lib/constant/experience.constant'
import { SubSection } from '@/components/SubSection'
import { useHorizontalScroll } from '@/lib/hooks/useHorizontalScroll'

export const WorkExperience = () => {
  const slides = EXPERIENCE.length

  const { childrenRef, containerHeight } = useContainerHeight(slides)

  const { scrollerRef, x } = useHorizontalScroll({
    to: ['0%', `-${Math.max(slides - 1, 0) * 100}%`],
  })

  return (
    <div
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen"
      ref={scrollerRef}
      style={{
        height: `${containerHeight}px`,
      }}
    >
      <div ref={childrenRef} className="sticky top-0 overflow-x-hidden">
        <motion.div className="flex" style={{ x }}>
          {EXPERIENCE.map((experience, i) =>
            experience.description ? (
              <div className="min-w-screen">
                <SubSection
                  key={experience.title}
                  title={experience.title ?? ''}
                  description={experience.description}
                />
              </div>
            ) : (
              <Article experience={experience} i={i} />
            ),
          )}
        </motion.div>
      </div>
    </div>
  )
}
