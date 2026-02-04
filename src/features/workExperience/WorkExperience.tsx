import { Article } from './components/Article'
import { EXPERIENCE } from '@/lib/constant/home/experience.constant'
import { SubSection } from '@/components/SubSection'
import { HorizontalScroll } from '@/components/motion/HorizontalScroll'

export const WorkExperience = () => {
  const slides = EXPERIENCE.length

  return (
    <HorizontalScroll slides={slides}>
      {EXPERIENCE.map((experience, i) =>
        experience.description ? (
          <div className="min-w-screen">
            <SubSection
              key={experience.title}
              title={experience.title || ''}
              description={experience.description}
            />
          </div>
        ) : (
          <Article experience={experience} i={i} />
        ),
      )}
    </HorizontalScroll>
  )
}
