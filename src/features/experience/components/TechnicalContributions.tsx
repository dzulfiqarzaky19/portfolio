import type { ExperienceData } from '@/lib/types/experience';
import { cn } from '@/lib/cn';

interface TechnicalContributionsProps {
  data: ExperienceData;
}

export const TechnicalContributions: React.FC<TechnicalContributionsProps> = ({ data }) => {
  return (
    <section className="py-20 bg-[hsl(var(--surface-1))]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
         <div className="mb-12">
            <h2 className="text-3xl font-bold font-display text-[hsl(var(--ink))] mb-2">Technical Contributions</h2>
            <p className="text-[hsl(var(--muted))]">What I built and achieved during my tenure.</p>
         </div>

         <div className="flex flex-col lg:flex-row gap-12">
             <div className="flex-1 space-y-8">
                 {data.technicalContributions.map((item, index) => {
                     const Icon = item.icon;
                     return (
                         <div key={index} className="flex gap-4">
                             <div className="shrink-0 w-10 h-10 rounded-lg bg-[hsl(var(--primary)/0.1)] flex items-center justify-center text-[hsl(var(--primary))]">
                                 {Icon && <Icon className="w-5 h-5" />}
                             </div>
                             <div>
                                 <h3 className="text-xl font-bold text-[hsl(var(--ink))] mb-2">{item.title}</h3>
                                 <p className="text-[hsl(var(--muted))] leading-relaxed text-sm">{item.description}</p>
                             </div>
                         </div>
                     )
                 })}
             </div>

              <div className="flex-1 w-full">
                  {data.codeSnippet && (
                       <div className="rounded-xl bg-[#0f172a] p-6 shadow-2xl border border-[hsl(var(--border))] font-mono text-xs md:text-sm text-blue-100 overflow-hidden relative">
                            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                                 <span className="text-white/40">Code Snippet</span>
                                 <span className={cn(`text-xs px-2 py-0.5 rounded bg-blue-500/20`, data.codeLanguage === 'JavaScript' ? 'text-yellow-400' : 'text-blue-400')}>{data.codeLanguage}</span>
                            </div>
                            <pre className="overflow-x-auto">
                                <code>
                                    {data.codeSnippet}
                                </code>
                            </pre>
                            <div className="mt-4 pt-2 border-t border-white/5 text-center">
                                <p className="text-[10px] text-white/30 italic">
                                    Note: This is an illustrative snippet, not actual production code.
                                </p>
                            </div>
                       </div>
                  )}
              </div>
         </div>
      </div>
    </section>
  );
};
