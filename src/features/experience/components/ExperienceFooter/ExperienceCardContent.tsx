import { Link } from '@tanstack/react-router'
import type { ExperienceData } from '@/lib/types/experience'
import { Text } from '@/components/ui/Text'
import { cn } from '@/lib/cn'
import { FadeInUp } from '@/components/motion/animations/FadeInUp'
import { Badge } from '@/components/ui/Badge'
import { BrowserFrame } from '@/components/ui/BrowserFrame'

interface ExperienceCardContentProps {
  experience: ExperienceData
}

export const ExperienceCardContent = ({ experience }: ExperienceCardContentProps) => (
  <BrowserFrame
    className={cn(
      'w-full md:w-[80%] lg:w-full transition-all duration-500',
      'aspect-3/4 md:aspect-video lg:aspect-2/1',
      'rounded-[24px] md:rounded-[32px] bg-[hsl(var(--surface-0))] border-[hsl(var(--border-subtle))]',
    )}
    contentClassName="p-6 md:p-6 lg:p-12 h-full overflow-hidden"
  >
    <div className="flex flex-col lg:flex-row h-full relative z-10 gap-6 lg:gap-12 items-center justify-center md:justify-start">
      <div className="flex flex-col flex-1 items-center md:items-start text-center md:text-left h-full justify-center">
        <FadeInUp transition={{ delay: 0.1 }} className="mb-4 md:mb-4 lg:mb-6">
          <Badge
            variant="custom"
            className="border border-[hsl(var(--warning)/0.5)] bg-[hsl(var(--warning)/0.1)] text-[hsl(var(--warning))]"
          >
            {experience.role.type}
          </Badge>
        </FadeInUp>

        <FadeInUp transition={{ delay: 0.2 }}>
          <Text
            variant="h2"
            className="text-[hsl(var(--ink))] font-bold leading-tight mb-2 text-2xl md:text-2xl lg:text-4xl"
          >
            {experience.company.name}
          </Text>

          <Text
            variant="h3"
            className="text-[hsl(var(--ink-muted))] font-medium text-sm md:text-sm lg:text-lg mb-4 md:mb-3 lg:mb-6"
          >
            {experience.role.title}
          </Text>

          <p className="text-[hsl(var(--ink-subtle))] leading-relaxed mb-6 md:mb-4 lg:mb-8 text-xs md:text-xs lg:text-base max-w-sm line-clamp-4 md:line-clamp-2 lg:line-clamp-3">
            {experience.role.description}
          </p>
        </FadeInUp>

        <FadeInUp transition={{ delay: 0.3 }} className="mt-2 md:mt-auto shrink-0">
          <Link
            to="/experience/$experienceId"
            params={{ experienceId: experience.id }}
            resetScroll={false}
            className="group inline-flex items-center gap-2 px-6 py-3 md:px-4 md:py-2 lg:px-6 lg:py-3 rounded-full bg-[hsl(var(--ink))] text-[hsl(var(--surface-0))] text-sm md:text-xs lg:text-base font-medium hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
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
          <div className="w-full h-full bg-[hsl(var(--surface-2))] rounded-xl overflow-hidden shadow-2xl border border-[hsl(var(--border))] flex flex-col">
            <div className="h-8 bg-[hsl(var(--surface-0))] border-b border-[hsl(var(--border))] flex items-center px-3 gap-2 shrink-0">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--danger))]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--warning))]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--success))]" />
              </div>
              <div className="flex-1 mx-4 h-5 bg-[hsl(var(--surface-2))] rounded flex items-center justify-center">
                <span className="text-[10px] text-[hsl(var(--ink-subtle))] font-medium truncate max-w-[150px]">
                  {experience.company.name.toLowerCase().replace(/\s+/g, '')}
                  .com
                </span>
              </div>
            </div>

            <div className="flex-1 relative bg-[hsl(var(--surface-1))] overflow-hidden group">
              <img
                src={experience.cardImage}
                alt={experience.company.name}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[hsl(var(--ink)/0.05)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          </div>
        </div>
      )}
    </div>
  </BrowserFrame>
)

