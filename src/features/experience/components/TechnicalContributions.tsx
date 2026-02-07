import type { ExperienceData } from '@/lib/types/experience'
import { BrowserFrame } from '@/components/ui/BrowserFrame'

interface TechnicalContributionsProps {
  data: ExperienceData
}

export const TechnicalContributions = ({ data }: TechnicalContributionsProps) => (
  <section className="py-20 bg-[hsl(var(--surface-1))]">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="mb-12">
        <h2 className="text-3xl font-bold font-display text-[hsl(var(--ink))] mb-2">
          Technical Contributions
        </h2>
        <p className="text-[hsl(var(--muted))]">
          What I built and achieved during my tenure.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-8">
          {data.technicalContributions.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-[hsl(var(--primary)/0.1)] flex items-center justify-center text-[hsl(var(--primary))]">
                  {Icon && <Icon className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[hsl(var(--ink))] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[hsl(var(--muted))] leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex-1 w-full">
          {data.codeSnippet && (
            <BrowserFrame
              className="bg-[hsl(var(--surface-2))] border-[hsl(var(--border))]"
              codeLanguage={data.codeLanguage}
              note="Note: This is an illustrative snippet, not actual production code."
            >
              <pre className="bg-[#0f172a] font-mono text-xs md:text-sm text-blue-100 overflow-x-auto whitespace-pre-wrap">
                <code>{data.codeSnippet}</code>
              </pre>
            </BrowserFrame>
          )}
        </div>
      </div>
    </div>
  </section>
)
