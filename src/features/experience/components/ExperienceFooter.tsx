import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { wrap } from 'motion'
import { Link } from '@tanstack/react-router'
import type { ExperienceData } from '@/lib/types/experience'
import { Text } from '@/components/ui/Text'
import { EXPERIENCE_DETAILS } from '@/lib/constant/experience'
import { cn } from '@/lib/cn'
import { FadeInUp } from '@/components/motion/animations/FadeInUp'
import { Badge } from '@/components/ui/Badge'
import { BrowserFrame } from '@/components/ui/BrowserFrame'

interface ExperienceFooterProps {
  currentExperienceId?: string
}

export const ExperienceFooter: React.FC<ExperienceFooterProps> = ({
  currentExperienceId,
}) => {
  const allExperiences = Object.values(EXPERIENCE_DETAILS)
  const otherExperiences = allExperiences.filter(
    (p) => p.id !== currentExperienceId,
  )

  // Ensure we have enough items for smooth infinite scrolling (padding logic)
  const experiences =
    otherExperiences.length >= 2 ? otherExperiences : allExperiences

  const total = experiences.length
  const VISIBLE_RANGE = 1

  const [index, setIndex] = useState(0)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const nextExperience = () => setIndex((prev) => prev + 1)
  const prevExperience = () => setIndex((prev) => prev - 1)

  const virtualIndex = wrap(0, total, index)
  const activeExperience = experiences[virtualIndex]

  return (
    <footer
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center transition-[background] duration-1000"
      style={{
        background: activeExperience.theme.gradient,
      }}
    >
      <motion.div
        className="relative w-[90%] max-w-7xl h-[600px] lg:h-[800px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, { offset }) => {
          const swipe = offset.y

          if (swipe < -50) {
            nextExperience()
          } else if (swipe > 50) {
            prevExperience()
          }
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {experiences.map((experience, i) => {
            const offset = wrap(-1, total - 1, i - virtualIndex)

            const isInsideWindow = Math.abs(offset) <= VISIBLE_RANGE

            if (!isInsideWindow) return null

            const isCenter = offset === 0
            const isMobile = width < 768

            return (
              <SliderCard
                key={`${experience.id}-${i}`}
                experience={experience}
                offset={offset}
                isCenter={isCenter}
                isMobile={isMobile}
              />
            )
          })}
        </AnimatePresence>
      </motion.div>

      <div className="absolute z-50 flex items-center gap-6 bottom-8 left-1/2 -translate-x-1/2 flex-row md:top-1/2 md:right-12 md:bottom-auto md:left-auto md:-translate-y-1/2 md:translate-x-0 md:flex-col">
        <button
          onClick={prevExperience}
          aria-label={`View previous experience: ${experiences[(virtualIndex - 1 + total) % total]?.company.name || 'None'}`}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all backdrop-blur-sm cursor-pointer z-50"
        >
          <span className="md:rotate-0 -rotate-90">↑</span>
        </button>

        <div className="flex flex-row md:flex-col gap-2">
          {experiences.map((_, i) => (
            <div
              key={i}
              className={cn(
                'rounded-full transition-all duration-300',
                'w-1.5 h-1.5 md:w-2 md:h-2',
                i === virtualIndex
                  ? 'w-6 md:w-2 md:h-8 bg-white'
                  : 'bg-white/30',
              )}
            />
          ))}
        </div>

        <button
          onClick={nextExperience}
          aria-label={`View next experience: ${experiences[(virtualIndex + 1) % total]?.company.name || 'None'}`}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all backdrop-blur-sm cursor-pointer z-50"
        >
          <span className="md:rotate-0 -rotate-90">↓</span>
        </button>
      </div>

      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-white/40 text-xs md:text-sm font-bold uppercase tracking-widest text-center px-4 w-full">
        Next Experience
      </div>
    </footer>
  )
}

interface SliderCardProps {
  experience: ExperienceData
  offset: number
  isCenter: boolean
  isMobile: boolean
}

const SliderCard: React.FC<SliderCardProps> = ({
  experience,
  offset,
  isCenter,
  isMobile,
}) => {
  const scale = isCenter ? (isMobile ? 1 : 1.25) : isMobile ? 0.9 : 1

  const responsiveY = offset * (isMobile ? 100 : 150)

  const z = isCenter ? 30 : 10
  const opacity = isCenter ? 1 : 0.4
  const rotationX = offset * -10

  return (
    <motion.div
      className="absolute flex items-center justify-center w-full px-4 md:px-0 max-w-[90%] md:max-w-4xl"
      style={{ zIndex: z }}
      initial={{ opacity: 0, scale: 0.8, y: responsiveY * 1.5 }}
      animate={{
        y: responsiveY,
        scale,
        opacity,
        rotateX: rotationX,
        filter: isCenter ? 'blur(0px)' : 'blur(0px)',
      }}
      exit={{ opacity: 0, scale: 0.5, y: -responsiveY }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 25,
      }}
    >
      <BrowserFrame
        className={cn(
          'w-full md:w-[80%] lg:w-full transition-all duration-500',
          'aspect-3/4 md:aspect-video lg:aspect-2/1',
          'rounded-[24px] md:rounded-[32px] bg-white border-white/50',
        )}
        contentClassName="p-6 md:p-12 h-full"
      >
        <div className="flex flex-col lg:flex-row h-full relative z-10 gap-6 lg:gap-12 items-center justify-center md:justify-start">
          <div className="flex flex-col flex-1 items-center md:items-start text-center md:text-left h-full justify-center">
            <FadeInUp transition={{ delay: 0.1 }} className="mb-4 md:mb-6">
              <Badge
                variant="custom"
                className="border border-yellow-500/50 bg-yellow-50 text-yellow-700"
              >
                {experience.role.type}
              </Badge>
            </FadeInUp>

            <FadeInUp transition={{ delay: 0.2 }}>
              <Text
                variant="h2"
                className="text-gray-900 font-bold leading-tight mb-2 text-2xl md:text-3xl lg:text-4xl"
              >
                {experience.company.name}
              </Text>

              <Text
                variant="h3"
                className="text-gray-500 font-medium text-sm md:text-base lg:text-lg mb-4 md:mb-6"
              >
                {experience.role.title}
              </Text>

              <p className="text-gray-600 leading-relaxed mb-6 md:mb-8 text-xs md:text-sm lg:text-base max-w-sm line-clamp-4 md:line-clamp-3">
                {experience.role.description}
              </p>
            </FadeInUp>

            <FadeInUp transition={{ delay: 0.3 }} className="mt-2 md:mt-auto">
              <Link
                to="/experience/$experienceId"
                params={{ experienceId: experience.id }}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 text-white text-sm md:text-base font-medium hover:bg-black transition-all shadow-lg hover:shadow-xl"
              >
                View Details
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </FadeInUp>
          </div>

          {experience.cardImage && (
            <div
              className={cn(
                'hidden lg:block w-1/2 h-full relative perspective-distant',
                'transition-all duration-700 delay-100',
                'opacity-100 translate-x-0 rotate-y-0',
              )}
            >
              <div className="w-full h-full bg-gray-100 rounded-xl overflow-hidden shadow-2xl border border-gray-200/50 flex flex-col">
                <div className="h-8 bg-white border-b border-gray-200 flex items-center px-3 gap-2 shrink-0">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-4 h-5 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-[10px] text-gray-400 font-medium truncate max-w-[150px]">
                      {experience.company.name
                        .toLowerCase()
                        .replace(/\s+/g, '')}
                      .com
                    </span>
                  </div>
                </div>

                <div className="flex-1 relative bg-gray-50 overflow-hidden group">
                  <img
                    src={experience.cardImage}
                    alt={experience.company.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </div>
            </div>
          )}
        </div>
      </BrowserFrame>
    </motion.div>
  )
}
