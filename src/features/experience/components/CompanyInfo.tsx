import { Building2, Globe, TrendingUp } from 'lucide-react';
import type { ExperienceData } from '@/lib/types/experience';

interface CompanyInfoProps {
  data: ExperienceData;
}

export const CompanyInfo: React.FC<CompanyInfoProps> = ({ data }) => {
  return (
    <section className="py-20 bg-[hsl(var(--surface-1))]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold font-display text-[hsl(var(--ink))] mb-4">About the Company</h2>
        <p className="text-[hsl(var(--muted))] max-w-2xl mx-auto mb-16">{data.company.about}</p>

        <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[hsl(var(--surface-2))] text-left hover:bg-[hsl(var(--surface-3))] transition-colors">
                <div className="w-12 h-12 bg-[hsl(var(--primary)/0.1)] rounded-full flex items-center justify-center text-[hsl(var(--primary))] mb-6">
                    <Building2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-[hsl(var(--ink))]">Industry</h3>
                <p className="text-sm text-[hsl(var(--muted))] leading-relaxed">{data.company.industry}</p>
            </div>
             <div className="p-8 rounded-2xl bg-[hsl(var(--surface-2))] text-left hover:bg-[hsl(var(--surface-3))] transition-colors">
                <div className="w-12 h-12 bg-[hsl(var(--primary)/0.1)] rounded-full flex items-center justify-center text-[hsl(var(--primary))] mb-6">
                    <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-[hsl(var(--ink))]">Mission</h3>
                <p className="text-sm text-[hsl(var(--muted))] leading-relaxed">{data.company.mission}</p>
            </div>
             <div className="p-8 rounded-2xl bg-[hsl(var(--surface-2))] text-left hover:bg-[hsl(var(--surface-3))] transition-colors">
                <div className="w-12 h-12 bg-[hsl(var(--primary)/0.1)] rounded-full flex items-center justify-center text-[hsl(var(--primary))] mb-6">
                     <Globe className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-[hsl(var(--ink))]">Massive Scale</h3>
                <p className="text-sm text-[hsl(var(--muted))] leading-relaxed">{data.company.scale}</p>
            </div>
        </div>
      </div>
    </section>
  );
};
