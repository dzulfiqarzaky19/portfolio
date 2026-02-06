import { CheckCircle2 } from 'lucide-react'
import type { ExperienceData } from '@/lib/types/experience'

interface RoleOverviewProps {
  data: ExperienceData
}

export const RoleOverview: React.FC<RoleOverviewProps> = ({ data }) => {
  return (
    <section className="py-20 bg-[hsl(var(--primary)/0.05)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] text-xs font-bold tracking-wider uppercase">
              {data.role.type}
            </div>
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
            <div className="aspect-video rounded-xl bg-[hsl(var(--surface-0))] shadow-2xl border border-[hsl(var(--border))] overflow-hidden relative group pt-10 pl-2">
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              {data.role.image ? (
                <img
                  src={data.role.image}
                  alt={data.role.title}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="mt-12 ml-4 p-4 rounded-tl-lg bg-[hsl(var(--surface-1))] h-full border-t border-l border-[hsl(var(--border))] opacity-50 group-hover:opacity-100 transition-opacity">
                  <div className="space-y-2">
                    <div className="h-2 w-1/3 bg-[hsl(var(--muted))/0.2] rounded" />
                    <div className="h-2 w-1/2 bg-[hsl(var(--muted))/0.2] rounded" />
                    <div className="h-2 w-2/3 bg-[hsl(var(--muted))/0.2] rounded" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
