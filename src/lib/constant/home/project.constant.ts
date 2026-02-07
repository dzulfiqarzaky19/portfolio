import { BULK_IMPORT_PROJECT } from '@/lib/constant/project/bulk-data-import.constant'
import { WEB_NOVEL_PROJECT } from '@/lib/constant/project/web-novel.constant'
import { KANBAN_BOARD_PROJECT } from '@/lib/constant/project/kanban-board.constant'
import { ECOMMERCE_PROJECT } from '@/lib/constant/project/ecommerce.constant'
import { ANGULAR_EMS_PROJECT } from '@/lib/constant/project/angular-ems.constant'

const BULK_IMPORT = {
  title: BULK_IMPORT_PROJECT.title,
  description: `High-Performance Data Processing System
React 19, Virtualization (20k+ Rows)
Node.js, BullMQ, Redis, Real-time Socket.IO`,
  imgUrl: '/images/ems-mobile.webp',
  detailUrl: `/projects/${BULK_IMPORT_PROJECT.id}`,
}

const KANBAN_BOARD = {
  title: KANBAN_BOARD_PROJECT.title,
  description: `Collaborative Kanban Board
React 19, Next.js 16, Hono RPC
Supabase: Auth, Real-time, PostgreSQL
Drag & Drop, Optimistic UI, Type-Safe API`,
  imgUrl: '/images/trello-project.webp',
  detailUrl: `/projects/${KANBAN_BOARD_PROJECT.id}`,
}

const WEB_NOVEL = {
  title: WEB_NOVEL_PROJECT.title,
  description: `Full-Stack Web App with Puppeteer Core
Backend: Rate Limiting, Redis Caching, Optimized Docker
Frontend: Mobile UI, Reader Mode, Offline Support`,
  imgUrl: '/images/novel-mobile.webp',
  detailUrl: `/projects/${WEB_NOVEL_PROJECT.id}`,
}

const ECOMMERCE = {
  title: ECOMMERCE_PROJECT.title,
  description: `Real-time E-commerce Analytics Dashboard
Next.js 16, PostgreSQL, Prisma, Trigger.dev
Hourly Background Jobs, Parallel Data Fetching`,
  imgUrl: '/images/real-time-dashboard.webp',
  detailUrl: `/projects/${ECOMMERCE_PROJECT.id}`,
}

const ANGULAR_EMS = {
  title: 'Angular EMS',
  description: `Modern Angular 19 Backoffice Application
Signal-based State Management, Custom Store
Strict TypeScript, Feature-Based Architecture`,
  imgUrl: '/images/angular-ems-dashboard.webp',
  detailUrl: `/projects/${ANGULAR_EMS_PROJECT.id}`,
}

const PROJECTS = [
  BULK_IMPORT,
  WEB_NOVEL,
  KANBAN_BOARD,
  ECOMMERCE,
  ANGULAR_EMS,
]

export { BULK_IMPORT, WEB_NOVEL, KANBAN_BOARD, ECOMMERCE, ANGULAR_EMS, PROJECTS }
