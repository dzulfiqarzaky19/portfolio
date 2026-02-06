import type { ExperienceData } from '@/lib/types/experience'

interface KeyTakeawaysProps {
  data: ExperienceData
}

export const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({ data }) => {
  return (
    <section className="py-20 bg-[hsl(var(--surface-1))]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="p-12 rounded-3xl bg-[hsl(var(--surface-2))]">
          <h2 className="text-3xl font-bold font-display text-[hsl(var(--ink))] mb-12 text-center">
            Key Takeaways
          </h2>

          <div className="space-y-8">
            {data.keyTakeaways.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-6 items-center md:items-start p-6 rounded-xl hover:bg-[hsl(var(--surface-0))] transition-colors border border-transparent hover:border-[hsl(var(--border))]"
                >
                  <div className="shrink-0 w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[hsl(var(--primary))]">
                    {Icon && <Icon className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[hsl(var(--ink))] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[hsl(var(--muted))] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
