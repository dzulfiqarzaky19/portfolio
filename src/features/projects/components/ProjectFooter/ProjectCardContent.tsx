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
        'rounded-[24px] md:rounded-[40px] bg-white border-white/50',
      )}
      contentClassName="p-6 md:p-16 h-full"
    >
      <div className="flex flex-col h-full relative z-10 text-left items-start">
        <FadeInUp animate={{ opacity: 0.6 }} className="mb-4 md:mb-6">
          <Badge
            variant="custom"
            className="border border-blue-500/50 bg-blue-50 text-blue-700"
          >
            {project.tag}
          </Badge>
        </FadeInUp>

        <Text
          variant="display"
          className={cn(
            'font-display transition-all duration-500 text-gray-900',
            isCenter
              ? 'mb-4 md:mb-6 text-2xl md:text-4xl'
              : 'mb-0 text-lg md:text-2xl opacity-60',
          )}
        >
          {project.title}
        </Text>

        <FadeInUp
          exit={{ opacity: 0, y: 10 }}
          className="flex flex-col flex-1 w-full"
          initial={{ opacity: 0, y: 10 }}
        >
          <Text className="text-sm md:text-lg text-gray-600 mb-6 md:mb-10 line-clamp-4 md:line-clamp-2 max-w-2xl leading-relaxed">
            {project.subtitle}
          </Text>

          <div className="flex-1" />

          <div className="mt-4 md:mt-12 grid grid-cols-1 md:flex md:flex-wrap gap-2 md:gap-6 w-full">
            <Link
              to="/projects/$projectId"
              params={{ projectId: project.id }}
              className="w-full md:w-auto text-center px-6 py-2.5 md:py-3 rounded-full bg-gray-900 text-white text-xs md:text-sm font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
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
                  className="w-full md:w-auto text-center px-6 py-2.5 md:py-3 rounded-full border-2 border-gray-200 text-gray-700 text-xs md:text-sm font-bold hover:bg-gray-50 transition-all"
                >
                  {link.label}
                </a>
              ))}
          </div>
        </FadeInUp>
      </div>
    </BrowserFrame>
  )
