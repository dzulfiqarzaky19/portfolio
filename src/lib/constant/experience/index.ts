import { RAIZ_INVEST } from './raiz.constant'
import { EDOT } from './edot.constant'
import { MANDIRI } from './mandiri.constant'
import { CONSISTECH } from './consistech.constant'
import type { ExperienceData } from '@/lib/types/experience'

export const EXPERIENCE_DETAILS: Record<string, ExperienceData> = {
  [RAIZ_INVEST.id]: RAIZ_INVEST,
  [EDOT.id]: EDOT,
  [MANDIRI.id]: MANDIRI,
  [CONSISTECH.id]: CONSISTECH,
}
