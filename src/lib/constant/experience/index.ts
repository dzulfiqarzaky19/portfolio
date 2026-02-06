import { RAIZ_INVEST } from './raiz'
import { EDOT } from './edot'
import { MANDIRI } from './mandiri'
import { CONSISTECH } from './consistech'
import type { ExperienceData } from '@/lib/types/experience'

export const EXPERIENCE_DETAILS: Record<string, ExperienceData> = {
  [RAIZ_INVEST.id]: RAIZ_INVEST,
  [EDOT.id]: EDOT,
  [MANDIRI.id]: MANDIRI,
  [CONSISTECH.id]: CONSISTECH,
}
