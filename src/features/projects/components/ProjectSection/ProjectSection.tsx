import React from 'react'
import { ProjectSectionContent } from './ProjectSectionContent'
import { ContentInner } from './ProjectSectionContentInner'
import type { ProjectSection as IProjectSection } from '@/lib/types/project'
import { Text } from '@/components/ui/Text'
import { FadeInUp } from '@/components/motion/animations/FadeInUp'
import { TiltOnView } from '@/components/motion/animations/TiltOnView'
import { BrowserFrame } from '@/components/ui/BrowserFrame'
import { cn } from '@/lib/cn'

interface ProjectSectionProps {
  section: IProjectSection
  index: number
}

const ProjectSectionComponent = ({ section, index }: ProjectSectionProps) => {
  const isEven = index % 2 === 0

  return (
    <section
      id={section.id}
      className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center min-h-[60vh] scroll-mt-32 relative"
    >
      <div
        className={cn(
          'space-y-6 relative flex flex-col',
          isEven
            ? 'lg:order-1 lg:items-end lg:text-right'
            : 'lg:order-2 lg:items-start lg:text-left',
        )}
      >
        <div
          className={cn(
            'absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[hsl(var(--primary))] ring-4 ring-[hsl(var(--surface-1))] z-10 hidden lg:block',
            isEven ? '-right-[calc(3rem+8px)]' : '-left-[calc(3rem+8px)]',
          )}
        />

        {section.number && (
          <Text
            variant="h2"
            className="text-[hsl(var(--primary))] opacity-50 font-mono"
          >
            {section.number}.
          </Text>
        )}
        <Text variant="h2" className="font-display">
          {section.heading}
        </Text>
        {section.description && (
          <Text className="text-[hsl(var(--muted))] text-lg leading-relaxed">
            {section.description}
          </Text>
        )}

        <ProjectSectionContent section={section} isRightAligned={isEven} />
      </div>

      <div
        className={cn(
          'relative flex justify-center',
          isEven ? 'lg:order-2' : 'lg:order-1',
        )}
      >
        {section.isTilted ? (
          <TiltOnView
            direction={isEven ? 'left' : 'right'}
            className="w-full max-w-lg"
          >
            <BrowserFrame
              className={cn(
                'w-full bg-[hsl(var(--surface-2))] border-[hsl(var(--border))]',
                section.codeSnippet
                  ? 'h-auto'
                  : 'aspect-video',
              )}
              contentClassName="p-0 pt-0"
            >
              <ContentInner section={section} />
            </BrowserFrame>
          </TiltOnView>
        ) : (
          <FadeInUp distance={30} className="relative w-full max-w-lg">
            <BrowserFrame
              className={cn(
                'w-full bg-[hsl(var(--surface-2))] border-[hsl(var(--border))]',
                section.codeSnippet
                  ? 'h-auto'
                  : 'aspect-video',
              )}
              contentClassName="p-0 pt-0"
            >
              <ContentInner section={section} />
            </BrowserFrame>
          </FadeInUp>
        )}
      </div>
    </section>
  )
}

export const ProjectSection = React.memo(ProjectSectionComponent)



