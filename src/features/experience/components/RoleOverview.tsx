import { CheckCircle2 } from 'lucide-react'
import type { ExperienceData } from '@/lib/types/experience'
import { Badge } from '@/components/ui/Badge'
import { BrowserFrame } from '@/components/ui/BrowserFrame'

interface RoleOverviewProps {
  data: ExperienceData
}

export const RoleOverview = ({ data }: RoleOverviewProps) =>   (
    <section className="py-20 bg-[hsl(var(--primary)/0.05)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <Badge className="mb-6">{data.role.type}</Badge>
            <h2 className="text-4xl font-bold font-display text-[hsl(var(--ink))] mb-6">
              My Role
            </h2>
            <p className="text-[hsl(var(--muted))] text-lg leading-relaxed mb-8">
              {data.role.description}
            </p>

            <div className="space-y-4">
              {data.role.focus.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-[hsl(var(--ink))] font-medium"
                >
                  <CheckCircle2 className="w-5 h-5 text-[hsl(var(--primary))]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full relative">
            <BrowserFrame className="aspect-video">
              {data.role.image ? (
                <img
                  src={data.role.image}
                  alt={data.role.title}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="mt-2 ml-2 p-4 rounded-tl-lg bg-[hsl(var(--surface-1))] h-full border-t border-l border-[hsl(var(--border))] opacity-50 group-hover:opacity-100 transition-opacity">
                  <div className="space-y-2">
                    <div className="h-2 w-1/3 bg-[hsl(var(--muted))/0.2] rounded" />
                    <div className="h-2 w-1/2 bg-[hsl(var(--muted))/0.2] rounded" />
                    <div className="h-2 w-2/3 bg-[hsl(var(--muted))/0.2] rounded" />
                  </div>
                </div>
              )}
            </BrowserFrame>
          </div>
        </div>
      </div>
    </section>
  )
