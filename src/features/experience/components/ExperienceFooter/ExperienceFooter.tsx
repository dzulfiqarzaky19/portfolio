import { ExperienceCardContent } from './ExperienceCardContent'
import { EXPERIENCE_DETAILS } from '@/lib/constant/experience'
import { SwipeNavigator } from '@/components/motion/SwipeNavigator'
import { SliderCardMotion } from '@/components/motion/SliderCardMotion'

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

  const experiences =
    otherExperiences.length >= 2 ? otherExperiences : allExperiences

  return (
    <footer className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center transition-[background] duration-1000 bg-gradient-to-br from-slate-900 to-slate-800">
      <SwipeNavigator
        items={experiences}
        direction="y"
        itemLabel="experience"
        getItemName={(exp) => exp.company.name}
        className="relative w-[90%] max-w-7xl h-[600px] lg:h-[800px] flex items-center justify-center"
        renderItem={({ item, index, offset, isCenter, isMobile }) => (
          <SliderCardMotion
            key={`${item.id}-${index}`}
            direction="y"
            offset={offset}
            isCenter={isCenter}
            isMobile={isMobile}
          >
            <ExperienceCardContent experience={item} />
          </SliderCardMotion>
        )}
      />

      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-white/40 text-xs md:text-sm font-bold uppercase tracking-widest text-center px-4 w-full">
        Next Experience
      </div>
    </footer>
  )
}

