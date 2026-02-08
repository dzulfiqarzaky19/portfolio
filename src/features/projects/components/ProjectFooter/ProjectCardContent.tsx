import { Link } from '@tanstack/react-router'
import type { ProjectData } from '@/lib/types/project'
import { Text } from '@/components/ui/Text'
import { cn } from '@/lib/cn'
import { FadeInUp } from '@/components/motion/animations/FadeInUp'
import { Badge } from '@/components/ui/Badge'
import { BrowserFrame } from '@/components/ui/BrowserFrame'

interface ProjectCardContentProps {
  project: ProjectData
  isCenter: boolean
}

export const ProjectCardContent = ({ project, isCenter }: ProjectCardContentProps) => (
  <BrowserFrame
    className={cn(
      'w-full transition-all duration-500',
      'aspect-10/16 sm:aspect-16/10',
      'rounded-[24px] md:rounded-[40px] bg-[hsl(var(--surface-0))] border-[hsl(var(--border-subtle))]',
    )}
    contentClassName="p-4 sm:p-6 md:p-8 lg:p-10 h-full overflow-hidden"
  >
    <div className="flex flex-col h-full relative z-10 text-left items-start">
      <FadeInUp animate={{ opacity: 0.6 }} className="mb-4 sm:mb-5 md:mb-6">
        <Badge
          variant="custom"
          className="border border-[hsl(var(--primary)/0.5)] bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]"
        >
          {project.tag}
        </Badge>
      </FadeInUp>

      <Text
        variant="display"
        className={cn(
          'font-display transition-all duration-500 text-[hsl(var(--ink))]',
          isCenter
            ? 'mb-3 sm:mb-4 md:mb-6 text-xl sm:text-2xl md:text-4xl'
            : 'mb-0 text-lg md:text-2xl opacity-60',
        )}
      >
        {project.title}
      </Text>

      <FadeInUp
        exit={{ opacity: 0, y: 10 }}
        className="flex flex-col flex-1 w-full min-h-0"
        initial={{ opacity: 0, y: 10 }}
      >
        <Text className="text-xs sm:text-sm md:text-lg text-[hsl(var(--ink-subtle))] mb-4 sm:mb-6 md:mb-8 line-clamp-2 sm:line-clamp-3 max-w-2xl leading-relaxed">
          {project.subtitle}
        </Text>

        <div className="flex-1 min-h-0" />

        <div className="mt-auto flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 md:gap-4 w-full shrink-0">
          <Link
            to="/projects/$projectId"
            params={{ projectId: project.id }}
            resetScroll={false}
            className="w-full sm:w-auto text-center px-4 sm:px-6 py-2 sm:py-2.5 md:py-3 rounded-full bg-[hsl(var(--ink))] text-[hsl(var(--surface-0))] text-xs md:text-sm font-bold hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Read Case Study
          </Link>

          {project.links &&
            project.links.length > 0 &&
            project.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center px-4 sm:px-6 py-2 sm:py-2.5 md:py-3 rounded-full border-2 border-[hsl(var(--border))] text-[hsl(var(--ink-muted))] text-xs md:text-sm font-bold hover:bg-[hsl(var(--surface-2))] transition-all"
              >
                {link.label}
              </a>
            ))}
        </div>
      </FadeInUp>
    </div>
  </BrowserFrame>
)
