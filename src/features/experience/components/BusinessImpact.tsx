import type { ExperienceData } from '@/lib/types/experience'

interface BusinessImpactProps {
  data: ExperienceData
}

export const BusinessImpact: React.FC<BusinessImpactProps> = ({ data }) => {
  return (
    <section className="py-20 bg-[hsl(var(--primary))] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold font-display mb-4">
          Business Impact
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-16">
          Measuring success through performance, accessibility, and quality.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {data.businessImpact.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-black/20 border border-white/10 hover:border-white/30 transition-all text-left"
            >
              <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent z-10" />
              {/* Placeholder for Image - in real implementation this would be an img tag */}
              <div className="h-40 w-full bg-white/5 group-hover:bg-white/10 transition-colors" />

              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <div className="inline-block px-2 py-0.5 rounded bg-[hsl(var(--primary))] text-white text-[10px] uppercase font-bold tracking-wider mb-2">
                  {item.metric}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
