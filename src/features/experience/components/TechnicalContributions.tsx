import type { ExperienceData } from '@/lib/types/experience';

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
                  {/* Code Mockup or Technical Visual */}
                   <div className="rounded-xl bg-[#0f172a] p-6 shadow-2xl border border-[hsl(var(--border))] font-mono text-xs md:text-sm text-blue-100 overflow-hidden">
                        <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                             <span className="text-white/40">src/components/InvestmentFlow.tsx</span>
                             <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">React</span>
                        </div>
                        <pre className="overflow-x-auto">
                            <code>
{`import { usePortfolioQuery } from '@services/api';
import { InvestmentCard } from '@components/ui';

export const PortfolioGraph = () => {
  const { data, isLoading } = usePortfolioQuery();
  
  if (isLoading) return <Skeleton h={300} />;
  
  return (
    <div className="grid gap-4">
       {data.investments.map(inv => (
          <InvestmentCard 
            key={inv.id} 
            {...inv}
            variant="interactive"
          />
       ))}
    </div>
  );
};`}
                            </code>
                        </pre>
                   </div>
             </div>
         </div>
      </div>
    </section>
  );
};
