import { useState } from 'react'
import { ProjectCardContent } from './ProjectCardContent'
import { PROJECT_DETAILS } from '@/lib/constant/projects'
import { SwipeNavigator } from '@/components/motion/SwipeNavigator'
import { SliderCardMotion } from '@/components/motion/SliderCardMotion'

interface ProjectFooterProps {
  currentProjectId: string
}

export const ProjectFooter = ({ currentProjectId }: ProjectFooterProps) => {
  const uniqueProjects = Object.values(PROJECT_DETAILS)
  const projects = uniqueProjects.filter((p) => p.id !== currentProjectId)
  
  const [currentGradient, setCurrentGradient] = useState(
    projects[0]?.theme?.gradient || 'linear-gradient(90deg, #1e293b 0%, #334155 100%)'
  )

  return (
    <footer
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center transition-[background] duration-1000"
      style={{ background: currentGradient }}
    >
      <SwipeNavigator
        items={projects}
        direction="x"
        itemLabel="project"
        getItemName={(project) => project.title}
        onIndexChange={(project) => {
          if (project.theme.gradient) {
            setCurrentGradient(project.theme.gradient)
          }
        }}
        className="relative w-[80%] max-w-7xl h-[600px] md:h-[800px] flex items-center justify-center"
        renderItem={({ item, index, offset, isCenter, isMobile }) => (
          <SliderCardMotion
            key={`${item.id}-${index}`}
            direction="x"
            offset={offset}
            isCenter={isCenter}
            isMobile={isMobile}
          >
            <ProjectCardContent project={item} isCenter={isCenter} />
          </SliderCardMotion>
        )}
      />

      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-white/40 text-sm font-bold uppercase tracking-widest">
        Next Case Study
      </div>
    </footer>
  )
}
