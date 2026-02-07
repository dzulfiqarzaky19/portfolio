import React from 'react'
import type { ExperienceData } from '@/lib/types/experience'
import { FadeInUp } from '@/components/motion/animations/FadeInUp'
import { Badge } from '@/components/ui/Badge'
import { BackButton } from '@/components/BackButton'

interface ExperienceHeroProps {
  data: ExperienceData
}

const ExperienceHeroComponent = ({ data }: ExperienceHeroProps) => (
    <div
      className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden"
      style={{
        background: data.theme.gradient,
      }}
    >
      <BackButton variant="light" />

      <FadeInUp className="relative z-10 max-w-4xl mx-auto">
        {data.company.logo && (
          <div className="mb-8">
            <img
              src={data.company.logo}
              alt={`${data.company.name} Logo`}
              className="w-20 h-20 md:w-24 md:h-24 object-contain mx-auto bg-white/10 rounded-2xl p-2 backdrop-blur-sm border border-white/20 shadow-xl"
            />
          </div>
        )}

        <Badge variant="white" className="mb-6">
          {data.role.type}
        </Badge>

        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-display tracking-tight leading-tight">
          {data.company.name}
        </h1>

        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
          {data.role.description}
        </p>

        <div className="flex gap-4 justify-center mt-8">
          {data.company.website && (
            <a
              href={data.company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-white text-[hsl(var(--primary))] font-bold hover:bg-white/90 transition-colors shadow-lg"
            >
              View Company
            </a>
          )}
        </div>
      </FadeInUp>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl translate-y-1/3" />
      </div>
    </div>
  )

export const ExperienceHero = React.memo(ExperienceHeroComponent)
