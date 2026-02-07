import { PORTFOLIO_PROJECT } from './project/portfolio.constant'
import { WEB_NOVEL_PROJECT } from './project/web-novel.constant'
import { ANGULAR_EMS_PROJECT } from './project/angular-ems.constant'
import { BULK_IMPORT_PROJECT } from './project/bulk-data-import.constant'
import { KANBAN_BOARD_PROJECT } from './project/kanban-board.constant'
import { ECOMMERCE_PROJECT } from './project/ecommerce.constant'
import type { ProjectData } from '../types/project'

export const PROJECT_DETAILS: Record<string, ProjectData> = {
  portfolio: PORTFOLIO_PROJECT,
  'web-novel': WEB_NOVEL_PROJECT,
  'bulk-data-import': BULK_IMPORT_PROJECT,
  'kanban-board': KANBAN_BOARD_PROJECT,
  'angular-ems': ANGULAR_EMS_PROJECT,
  ecommerce: ECOMMERCE_PROJECT,
}
