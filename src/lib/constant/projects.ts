import { EMPLOYEES_20K_PROJECT } from './project/employees-20k.constant'
import { CHAT_SNAP_PROJECT } from './project/chat-snap.constant'
import { LEGACY_SYSTEM_PROJECT } from './project/legacy-system.constant'
import { PORTFOLIO_PROJECT } from './project/portfolio.constant'
import { WEB_NOVEL_PROJECT } from './project/web-novel.constant'
import { TRELLO_CLONE_PROJECT } from './project/trello-clone.constant'
import { ANGULAR_EMS_PROJECT } from './project/angular-ems.constant'
import { ECOMMERCE_DASHBOARD_PROJECT } from './project/ecommerce-dashboard.constant'
import type { ProjectData } from '../types/project'

export const PROJECT_DETAILS: Record<string, ProjectData> = {
  'legacy-system': LEGACY_SYSTEM_PROJECT,
  'chat-snap': CHAT_SNAP_PROJECT,
  portfolio: PORTFOLIO_PROJECT,
  'web-novel': WEB_NOVEL_PROJECT,
  'employees-20k': EMPLOYEES_20K_PROJECT,
  'trello-clone': TRELLO_CLONE_PROJECT,
  'angular-ems': ANGULAR_EMS_PROJECT,
  'ecommerce-dashboard': ECOMMERCE_DASHBOARD_PROJECT,
}
