import React from 'react'
import type { ProjectSection as IProjectSection } from '@/lib/types/project'
import { Text } from '@/components/ui/Text'
import { FadeInUp } from '@/components/motion/animations/FadeInUp'
import { TiltOnView } from '@/components/motion/animations/TiltOnView'
import { cn } from '@/lib/cn'

interface ProjectSectionProps {
  section: IProjectSection
  index: number
}

const ProjectSectionComponent: React.FC<ProjectSectionProps> = ({
  section,
  index,
}) => {
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

        {renderContent(section, isEven)}
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
            className={cn(
              'w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl bg-[hsl(var(--surface-2))] border border-[hsl(var(--border))]',
              section.codeSnippet ? 'h-auto' : 'aspect-square lg:aspect-video',
            )}
          >
            <ContentInner section={section} />
          </TiltOnView>
        ) : (
          <FadeInUp
            distance={30}
            className={cn(
              'relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl bg-[hsl(var(--surface-2))] border border-[hsl(var(--border))]',
              section.codeSnippet ? 'h-auto' : 'aspect-square lg:aspect-video',
            )}
          >
            <ContentInner section={section} />
          </FadeInUp>
        )}
      </div>
    </section>
  )
}

export const ProjectSection = React.memo(ProjectSectionComponent)

const ContentInner = ({ section }: { section: IProjectSection }) => (
  <div
    className={cn(
      'relative',
      section.codeSnippet
        ? ''
        : 'absolute inset-0 flex items-center justify-center p-4',
    )}
  >
    {section.codeSnippet ? (
      <div className="w-full bg-[#1e1e1e] p-6 text-left">
        <pre className="font-mono text-xs sm:text-sm text-teal-500 whitespace-pre-wrap break-all">
          <code>{section.codeSnippet}</code>
        </pre>
      </div>
    ) : section.image ? (
      <img
        src={section.image}
        alt={section.imageAlt || section.heading}
        className="w-full h-full object-cover rounded-2xl"
      />
    ) : (
      <div className="w-full h-full bg-linear-to-br from-[hsl(var(--primary)/0.2)] to-[hsl(var(--accent)/0.2)] flex items-center justify-center">
        <Text color="muted" className="text-center px-4">
          Visualizing: {section.heading}
        </Text>
      </div>
    )}
  </div>
)

function renderContent(section: IProjectSection, isRightAligned: boolean) {
  const alignClasses = isRightAligned
    ? 'lg:items-end lg:text-right'
    : 'lg:items-start lg:text-left'
  const flexRowClasses = isRightAligned
    ? 'lg:flex-row-reverse lg:text-right'
    : 'lg:flex-row lg:text-left'

  switch (section.type) {
    case 'challenge':
      return (
        section.content?.highlight && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 w-full max-w-md text-left">
            <p className="text-xs font-bold uppercase mb-1">
              {section.content.highlight.title}
            </p>
            <p className="text-sm">{section.content.highlight.message}</p>
          </div>
        )
      )
    case 'folder-structure':
      return (
        section.content?.bullets && (
          <ul className={cn('space-y-4 flex flex-col w-full', alignClasses)}>
            {section.content.bullets.map((bullet, i: number) => (
              <li
                key={i}
                className={cn('flex gap-3 text-left', flexRowClasses)}
              >
                <span className="shrink-0 w-6 h-6 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center text-[hsl(var(--surface-1))] text-xs font-bold">
                  ✓
                </span>
                <div>
                  <p className="font-bold">{bullet.title}</p>
                  <p className="text-sm text-[hsl(var(--muted))]">
                    {bullet.message}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )
      )
    case 'caching':
      return (
        section.content?.highlights && (
          <div className={cn('space-y-4 flex flex-col w-full', alignClasses)}>
            {section.content.highlights.map((h, i: number) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-[hsl(var(--surface-2))] border border-[hsl(var(--border))] w-full max-w-md text-left"
              >
                <p className="text-xs font-bold uppercase mb-1 text-[hsl(var(--primary))]">
                  {h.type}
                </p>
                <p className="text-sm">{h.message}</p>
              </div>
            ))}
          </div>
        )
      )
    case 'lessons':
      return (
        section.content?.items && (
          <div className={cn('space-y-6 flex flex-col w-full', alignClasses)}>
            {section.content.items.map((item, i: number) => (
              <div
                key={i}
                className={cn('flex gap-4 text-left', flexRowClasses)}
              >
                <span className="shrink-0 text-2xl text-[hsl(var(--primary))]">
                  +
                </span>
                <div>
                  <p className="font-bold">{item.title}</p>
                  <p className="text-sm text-[hsl(var(--muted))]">
                    {item.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )
      )
    case 'metrics':
      return (
        section.content?.cards && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 w-full">
            {section.content.cards.map((card, i: number) => (
              <div
                key={i}
                className="group relative aspect-3/4 rounded-2xl overflow-hidden bg-[hsl(var(--surface-2))] border border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)] transition-colors"
              >
                {card.image && (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10" />
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <p className="font-bold text-white text-sm">{card.title}</p>
                  <p className="text-white/60 text-xs mt-1">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )
      )
    case 'flow':
      return (
        section.content?.steps && (
          <div className={cn('space-y-6 flex flex-col w-full', alignClasses)}>
            {section.content.steps.map((step, i: number) => (
              <div
                key={i}
                className={cn('flex gap-4 text-left relative', flexRowClasses)}
              >
                {/* Connecting Line */}
                {i !== (section.content.steps?.length || 0) - 1 && (
                  <div
                    className={cn(
                      'absolute top-8 w-0.5 h-full bg-[hsl(var(--border))]',
                      isRightAligned ? 'right-[11px]' : 'left-[11px]',
                    )}
                  />
                )}

                <span className="shrink-0 z-10 w-6 h-6 rounded-full bg-[hsl(var(--surface-2))] border-2 border-[hsl(var(--primary))] flex items-center justify-center text-[10px] font-bold text-[hsl(var(--primary))]">
                  {i + 1}
                </span>

                <div>
                  <p className="font-bold text-[hsl(var(--ink))]">
                    {step.title}
                  </p>
                  <p className="text-sm text-[hsl(var(--muted))] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )
      )
    case 'cta':
      return (
        <div
          className={cn(
            'flex gap-4 pt-8 w-full',
            isRightAligned ? 'justify-end' : 'justify-start',
          )}
        >
          <button className="px-6 py-3 rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--surface-1))] font-bold hover:bg-[hsl(var(--primary-hover))] transition-colors">
            Next Case Study
          </button>
          <button className="px-6 py-3 rounded-full bg-[hsl(var(--surface-2))] border border-[hsl(var(--border))] font-bold hover:bg-[hsl(var(--border))] transition-colors">
            View All Work
          </button>
        </div>
      )
    default:
      return null
  }
}
