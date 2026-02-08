import { ExperienceHero } from './components/ExperienceHero'
import { CompanyInfo } from './components/CompanyInfo'
import { RoleOverview } from './components/RoleOverview'
import { TechnicalContributions } from './components/TechnicalContributions'
import { BusinessImpact } from './components/BusinessImpact'
import { KeyTakeaways } from './components/KeyTakeaways'
import { ExperienceFooter } from './components/ExperienceFooter/ExperienceFooter'
import type { ExperienceData } from '@/lib/types/experience'

interface ExperienceLayoutProps {
  data: ExperienceData
}

export const ExperienceLayout = ({ data }: ExperienceLayoutProps) =>  (
    <div 
      className="min-h-screen font-sans antialiased bg-transparent"
    >
      <ExperienceHero data={data} />
      <CompanyInfo data={data} />
      <RoleOverview data={data} />
      <TechnicalContributions data={data} />
      <BusinessImpact data={data} />
      <KeyTakeaways data={data} />

      <ExperienceFooter currentExperienceId={data.id} />
    </div>
  )
