import { EMPLOYEES_20K_PROJECT } from '@/lib/constant/project/employees-20k.constant';
import { WEB_NOVEL_PROJECT } from '@/lib/constant/project/web-novel.constant';
import { TRELLO_CLONE_PROJECT } from '@/lib/constant/project/trello-clone.constant';

const EMPLOYEES_20K = {
  title: EMPLOYEES_20K_PROJECT.title,
  description: `High-Performance HR Dashboard
React 19, Virtualization (20k+ Rows)
Node.js, BullMQ, Redis, Real-time Socket.IO`,
  imgUrl: '/images/ems-mobile.webp',
  detailUrl: `/projects/${EMPLOYEES_20K_PROJECT.id}`,
}

const CHAT_SNAP = {
  title: TRELLO_CLONE_PROJECT.title,
  description: `Trello-Clone: Kanban-style Project Management
React 19, Next.js 16, Hono RPC
Supabase: Auth, Real-time, PostgreSQL
Drag & Drop, Optimistic UI, Type-Safe API`,
  imgUrl: '/images/trello-project.webp',
  detailUrl: `/projects/${TRELLO_CLONE_PROJECT.id}`,
}

const WEB_NOVEL = {
  title: WEB_NOVEL_PROJECT.title,
  description: `Full-Stack Web App with Puppeteer Core
Backend: Rate Limiting, Redis Caching, Optimized Docker
Frontend: Mobile UI, Reader Mode, Offline Support`,
  imgUrl: '/images/novel-mobile.webp',
  detailUrl: `/projects/${WEB_NOVEL_PROJECT.id}`,
}

const PRADA_CLONE = {
  title: 'Prada Clone',
  description: `Prada-Clone: Microservices E-Commerce Site
Built with React for Web/Mobile
Tech: Apollo Server, GraphQL, Redis, MongoDB + PostgreSQL
First Microservices Project`,
  imgUrl: '/images/store.png',
  detailUrl: '/projects/prada-clone',
}

const OTHER_PROJECTS = {
  title: 'Other Projects',
  description: `See More Projects on my Github Page`,
  imgUrl: '/images/github.png',
  detailUrl: '/projects/other',
}

const PROJECTS = [EMPLOYEES_20K, WEB_NOVEL, CHAT_SNAP, PRADA_CLONE, OTHER_PROJECTS]

export { EMPLOYEES_20K, WEB_NOVEL, CHAT_SNAP, PRADA_CLONE, PROJECTS }
