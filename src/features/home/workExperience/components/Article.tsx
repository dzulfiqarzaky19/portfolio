import { AnimatePresence } from 'motion/react'
import { Link } from '@tanstack/react-router'
import type { Experience } from '@/lib/constant/home/experience.constant'
import { BrowserFrame } from '@/components/ui/BrowserFrame'
import { cn } from '@/lib/cn'
import { InViewTransition } from '@/components/motion/InViewAnimation'
import { Text } from '@/components/ui/Text'

type Props = {
  experience: Partial<Experience>
  i: number
}

export const Article = ({ experience, i }: Props) => {
  return (
    <AnimatePresence mode="wait">
      <article
        key={experience.title}
        className={cn(
          'min-w-dvw min-h-dvh flex justify-center items-center px-6 sm:px-10 lg:px-14',
          i % 2 === 0 ? 'bg-[hsl(var(--primary))]' : 'bg-[hsl(var(--accent))]',
        )}
      >
        <div
          className={cn(
            'w-full max-w-7xl mx-auto flex justify-center items-center flex-col-reverse gap-16',
            i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse',
          )}
        >
          <div
            className={cn(
              `w-full lg:w-1/2 flex flex-col gap-4 max-w-2xl`,
              i % 2 === 0
                ? 'lg:items-end lg:text-right'
                : 'lg:items-start lg:text-left',
            )}
          >
            <InViewTransition>
              <Text variant="display" color="surface">
                {experience.title}
              </Text>

              <Text variant="h3" color="surface">
                {experience.role}
              </Text>

              <Text variant="lead" color="surface">
                {experience.highlight}
              </Text>

              <Link
                to="/experience/$experienceId"
                params={{
                  experienceId:
                    experience.detailUrl?.split('/').pop() ?? 'raiz',
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--surface-0))] px-4 py-2 text-[hsl(var(--ink))] ring-1 ring-[hsl(var(--border))] hover:bg-[hsl(var(--surface-2))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus))]"
              >
                Learn More
                <span aria-hidden>↗</span>
              </Link>
            </InViewTransition>
          </div>

          <div className="w-full lg:w-1/2 max-w-xl">
            <BrowserFrame variant="desktop" isHome className='bg-[hsl(var(--surface-0))] border-[hsl(var(--border-subtle))]'>
              <img
                src={experience.imgUrl}
                alt={`${experience.title} screenshot`}
                className="h-full w-full object-top object-cover"
                loading="lazy"
              />
            </BrowserFrame>
          </div>
        </div>
      </article>
    </AnimatePresence>
  )
}
