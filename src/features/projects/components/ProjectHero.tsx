import React from 'react'
import { FadeInUp } from '@/components/motion/animations/FadeInUp'
import { Badge } from '@/components/ui/Badge'
import { Text } from '@/components/ui/Text'

import { cn } from '@/lib/cn'

interface ProjectHeroProps {
  tag: string
  title: string
  subtitle: string
  links?: Array<{
    url: string
    label: string
    icon?: 'github' | 'live' | 'other'
  }>
}

const ProjectHeroComponent: React.FC<ProjectHeroProps> = ({
  tag,
  title,
  subtitle,
  links,
}) => {
  return (
    <section className="pt-32 pb-16 text-center">
      <FadeInUp>
        <Badge className="mb-6">{tag}</Badge>
        <Text variant="hero" className="mb-8 font-display">
          {title}
        </Text>
        <Text
          variant="lead"
          className="max-w-2xl mx-auto text-[hsl(var(--muted))] mb-12"
        >
          {subtitle}
        </Text>

        <div className="flex flex-wrap justify-center gap-4">
          {/* New Links Implementation */}
          {links &&
            links.length > 0 &&
            links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'px-6 py-3 rounded-full font-bold transition-colors flex items-center gap-2',
                  link.icon === 'live'
                    ? 'bg-[hsl(var(--primary))] text-[hsl(var(--surface-1))] hover:bg-[hsl(var(--primary-hover))]'
                    : 'bg-[hsl(var(--ink))] text-[hsl(var(--surface-1))] hover:opacity-90',
                )}
              >
                {link.label}
              </a>
            ))}
        </div>
      </FadeInUp>
    </section>
  )
}

export const ProjectHero = React.memo(ProjectHeroComponent)
