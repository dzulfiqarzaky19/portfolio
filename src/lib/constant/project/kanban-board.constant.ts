import type { ProjectData } from '@/lib/types/project'

export const KANBAN_BOARD_PROJECT: ProjectData = {
  id: 'kanban-board',
  tag: 'FULL STACK PROJECT',
  title: 'Kanban Board',
  subtitle:
    'A collaborative Kanban-style project management platform with real-time updates and optimistic UI.',
  description:
    'Built with Next.js 16, React 19, and Supabase. Features type-safe APIs via Hono RPC, drag-and-drop task management, multi-workspace support, and 3-level comment threading.',
  links: [
    {
      url: 'https://github.com/dzulfiqarzaky19/trello_nextjs',
      label: 'View Code',
      icon: 'github',
    },
  ],
  sections: [
    {
      id: 'challenge',
      type: 'challenge',
      number: '01',
      heading: 'The Challenge',
      description:
        'Building a collaborative project management platform that solves team organization, visual task management, and real-time collaboration challenges while maintaining performance and scalability.',
      isTilted: true,
      image: '/images/trello-dashboard.webp',
      content: {
        highlight: {
          title: 'COLLABORATION AT SCALE',
          message:
            'Teams need to organize work across multiple workspaces, track deadlines, and collaborate in real-time without overwhelming complexity.',
        },
      },
    },
    {
      id: 'tech-stack',
      type: 'folder-structure',
      number: '02',
      heading: 'Tech Stack Rationale',
      description:
        'Modern full-stack TypeScript stack with carefully chosen technologies optimized for type safety, developer experience, and production performance.',
      isTilted: true,
      codeSnippet: `// Frontend
- Next.js 16 (React 19): SSR/SSG + App Router
- Hono > tRPC: Edge-optimized, lighter weight
- React Query: Industry standard caching
- Radix UI: Accessibility out-of-the-box
- Tailwind v4: Rapid prototyping
- @hello-pangea/dnd: React 19 compatible drag-drop

// Backend & Data  
- Supabase > Firebase: PostgreSQL + flexibility
- PostgreSQL: ACID compliance + RLS
- Zod: Runtime validation + type inference
- Vitest > Jest: 10x faster test execution`,
      codeLanguage: 'Plain Text',
      content: {
        bullets: [
          {
            title: 'Hono over tRPC',
            message:
              'Edge-optimized and lighter weight with faster runtime performance. Less magic means easier debugging.',
          },
          {
            title: 'Supabase over Firebase',
            message:
              'Open-source with PostgreSQL backing provides superior query flexibility compared to NoSQL constraints. Migration path via PostgreSQL export.',
          },
          {
            title: 'Radix UI Primitives',
            message:
              'Unstyled, WAI-ARIA compliant components provide accessibility out-of-the-box with 100% styling control.',
          },
          {
            title: 'Feature-Based Architecture',
            message:
              'Each feature module contains API routes, components, hooks, and schemas co-located for better maintainability and team parallelization.',
          },
        ],
      },
    },
    {
      id: 'architecture',
      type: 'folder-structure',
      number: '03',
      heading: 'Architecture & Folder Structure',
      description:
        'Feature-based modular organization with clear separation between client routes, API layer, and shared utilities.',
      isTilted: false,
      codeSnippet: `trello_nextjs/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Auth routes (login, signup)
│   ├── (dashboard)/        # Protected dashboard routes
│   │   ├── dashboard/      # Main dashboard
│   │   ├── workspaces/     # Workspace management
│   │   ├── projects/       # Project boards
│   │   ├── calendar/       # Calendar view
│   │   └── team/           # Team management
│   └── api/                # API routes
│       └── [[...route]]/   # Hono catch-all router
│
├── features/               # Feature-based modules
│   ├── auth/               # Authentication
│   ├── workspaces/         # Workspace management
│   ├── projects/           # Project boards
│   ├── tasks/              # Task CRUD
│   ├── comments/           # 3-level comment threading
│   └── dashboard/          # Dashboard analytics
│
└── lib/                    # Shared utilities
    ├── supabase/           # Supabase client setup
    ├── rpc.ts              # Hono RPC client
    └── session-middleware.ts`,
      codeLanguage: 'Directory',
      content: {
        bullets: [
          {
            title: 'Co-location Benefits',
            message:
              'All code for a feature lives together (API, UI, types, tests) making changes localized and refactoring safer.',
          },
          {
            title: 'Team Parallelization',
            message:
              'Multiple developers can work on different features simultaneously without merge conflicts.',
          },
          {
            title: 'Clear Boundaries',
            message:
              'Each feature owns its domain logic, preventing tight coupling and making features easy to add or remove.',
          },
        ],
      },
    },
    {
      id: 'service-layer',
      type: 'folder-structure',
      number: '04',
      heading: 'Service Layer Pattern',
      description:
        'Separation of concerns via service layer with type-safe Result pattern for explicit error handling without try-catch overhead.',
      isTilted: true,
      codeSnippet: `type ServiceResult<T> =
  | { ok: true; data: T; status: number }
  | { ok: false; error: string; status: number };

async function createProject(input): Promise<ServiceResult<Project>> {
  const { data, error } = await supabase
    .from('projects')
    .insert(input)
    .select()
    .single();
  
  if (error) {
    return { ok: false, error: error.message, status: 400 };
  }
  
  return { ok: true, data, status: 201 };
}

app.post('/', sessionMiddleware, async (c) => {
  const result = await ProjectService.create(input);
  
  if (!result.ok) {
    return c.json({ error: result.error }, result.status);
  }
  
  return c.json({ data: result.data });
});`,
      codeLanguage: 'TypeScript',
      content: {
        bullets: [
          {
            title: 'Testability',
            message:
              'Services can be unit tested independently without spinning up HTTP server or database.',
          },
          {
            title: 'Reusability',
            message:
              'Business logic is decoupled from HTTP transport, making it reusable across different routes.',
          },
          {
            title: 'Type-Safe Errors',
            message:
              'Result type forces explicit error handling with discriminated unions - no hidden exceptions.',
          },
        ],
      },
    },
    {
      id: 'hono-rpc',
      type: 'folder-structure',
      number: '05',
      heading: 'Type-Safe API with Hono RPC',
      description:
        'Ultra-lightweight, edge-optimized API framework providing type-safe RPC with automatic client generation and seamless Next.js integration.',
      isTilted: false,
      codeSnippet: `// Server: app/api/[[...route]]/route.ts

const app = new Hono().basePath('/api');
const routes = app
  .route('/auth', auth)
  .route('/workspaces', workspaces)
  .route('/projects', projects);

export type TAppRoutes = typeof routes;

import { hc } from 'hono/client';
export const client = hc<TAppRoutes>(url);

const response = await client.api.projects.$post({
  form: { name: 'New Project', workspaceId: '123' }
});`,
      codeLanguage: 'TypeScript',
      content: {
        bullets: [
          {
            title: 'End-to-End Type Safety',
            message:
              'TypeScript types flow from server to client automatically, eliminating the need for manual type definitions.',
          },
          {
            title: 'Superior Performance',
            message:
              'Edge-optimized and lighter weight than tRPC, with significantly faster runtime performance.',
          },
        ],
      },
    },
    {
      id: 'supabase-integration',
      type: 'flow',
      number: '06',
      heading: 'Full-Stack Flow with Supabase',
      description:
        'End-to-end request lifecycle from React client through Hono API to Supabase PostgreSQL database with built-in authentication and real-time capabilities.',
      isTilted: true,
      image: '/images/trello-diagram.webp',
      content: {
        steps: [
          {
            title: 'User Interaction',
            description:
              'React component triggers mutation/query via React Query.',
          },
          {
            title: 'React Query Cache',
            description:
              'Checks cache first, manages loading states, and provides optimistic updates.',
          },
          {
            title: 'Hono RPC Client',
            description:
              'Type-safe RPC call to API route with automatic request/response validation.',
          },
          {
            title: 'Session Middleware',
            description:
              'Validates Supabase session and injects authenticated user into Hono context.',
          },
          {
            title: 'Service Layer',
            description:
              'Business logic and database operations executed via Supabase client.',
          },
          {
            title: 'PostgreSQL',
            description:
              'Supabase executes queries with Row Level Security (RLS) policies.',
          },
        ],
      },
    },
    {
      id: 'key-features',
      type: 'caching',
      number: '07',
      heading: 'Key Features',
      description:
        'Comprehensive project management capabilities with drag-and-drop, real-time collaboration, and advanced organization.',
      isTilted: true,
      image: '/images/trello-project.webp',
      content: {
        highlights: [
          {
            type: 'Drag & Drop Kanban',
            message:
              'Intuitive drag-and-drop interface using @hello-pangea/dnd with touch device support and smooth animations.',
          },
          {
            type: 'Multi-Workspace Support',
            message:
              'Segregate different projects/clients into separate workspaces with role-based access control.',
          },
          {
            type: '3-Level Comment Threading',
            message:
              'YouTube-style comment nesting with automatic flattening after 3 levels for optimal readability.',
          },
        ],
      },
    },
    {
      id: 'comment-threading',
      type: 'folder-structure',
      number: '08',
      heading: '3-Level Comment Threading',
      description:
        'YouTube-style nested comment system with automatic flattening after 3 levels to maintain readability and prevent infinite nesting complexity.',
      isTilted: false,
      image: '/images/trello-task.webp',
      content: {
        bullets: [
          {
            title: 'Prevents UI Complexity',
            message:
              'Flattening after 3 levels prevents deeply nested threads that become difficult to read and navigate.',
          },
          {
            title: 'Familiar UX Pattern',
            message:
              'Matches user expectations from platforms like YouTube and Reddit, making the interface intuitive.',
          },
          {
            title: 'Efficient Data Structure',
            message:
              'Uses parent_id foreign key to create hierarchical relationships while maintaining simple database queries.',
          },
        ],
      },
    },
    {
      id: 'modal-provider',
      type: 'folder-structure',
      number: '09',
      heading: 'Global Modal Pattern',
      description:
        'Centralized modal state management via URL query params, enabling shareable modal states and natural browser navigation.',
      isTilted: true,
      codeSnippet: `
const openModal = useCallback((key: string, state: ModalState) => {
  setModalState(state);
  const params = new URLSearchParams(searchParams.toString());
  params.set('modal', key);
  router.push(\`\${pathname}?\${params.toString()}\`, { scroll: false });
}, []);

const { openModal } = useModal('create-workspace');

openModal({
  title: 'Create Workspace',
  children: <WorkspaceForm />,
  config: { className: 'sm:max-w-2xl' }
});`,
      codeLanguage: 'TypeScript',
      content: {
        bullets: [
          {
            title: 'Shareable Modal States',
            message:
              'Modal state persists in URL (e.g., ?modal=edit-task), allowing users to share specific modal views.',
          },
          {
            title: 'Natural Navigation',
            message:
              'Browser back button closes modals intuitively, matching user expectations.',
          },
        ],
      },
    },
    {
      id: 'optimistic-ui',
      type: 'folder-structure',
      number: '10',
      heading: 'Optimistic Updates & Caching',
      description:
        'Instant user feedback via React Query optimistic updates with automatic cache invalidation and error rollback.',
      isTilted: true,
      codeSnippet: `
const { mutate } = useMutation({
  mutationFn: async (newTask) => {
    const response = await client.api.tasks.$post({ json: newTask });
    return await response.json();
  },
  onMutate: async (newTask) => {
    await queryClient.cancelQueries({ queryKey: ['tasks', projectId] });
    
    const previousTasks = queryClient.getQueryData(['tasks', projectId]);
    
    queryClient.setQueryData(['tasks', projectId], (old) => {
      return [...(old || []), { ...newTask, id: 'temp-id' }];
    });
    
    return { previousTasks }; // Return context for rollback
  },
  onError: (err, newTask, context) => {
    queryClient.setQueryData(
      ['tasks', projectId], 
      context.previousTasks
    );
    toast.error('Failed to create task');
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
  },
});`,
      codeLanguage: 'TypeScript',
      content: {
        bullets: [
          {
            title: 'Instant Feedback',
            message:
              'UI updates immediately on user action, then syncs with server in the background for superior perceived performance.',
          },
          {
            title: 'Automatic Rollback',
            message:
              'Failed mutations automatically revert to previous state using the context snapshot, maintaining data consistency.',
          },
          {
            title: 'Smart Caching',
            message:
              'React Query caches data with configurable stale times, reducing unnecessary API calls and background revalidation.',
          },
        ],
      },
    },
    {
      id: 'testing',
      type: 'folder-structure',
      number: '11',
      heading: 'Testing Strategy',
      description:
        'Comprehensive testing approach using Vitest with focus on service layer, component logic, and schema validation for 80% coverage target.',
      isTilted: true,
      codeSnippet: `// Component Test (Vitest + Testing Library)
describe('LoginForm', () => {
  it('renders email and password fields', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
});

// Schema Validation Test
describe('loginSchema', () => {
  it('validates correct email and password', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(result.success).toBe(true);
  });
});

// Service Layer Test
it('creates project with valid input', async () => {
  const result = await ProjectService.create(validInput);
  expect(result.ok).toBe(true);
  expect(result.data).toHaveProperty('id');
});`,
      codeLanguage: 'TypeScript',
      content: {
        bullets: [
          {
            title: 'Vitest over Jest',
            message:
              'Vite-native test runner with 10x faster execution. jsdom environment for component testing.',
          },
          {
            title: 'Test Pyramid Approach',
            message:
              'Unit tests (Hooks, Schemas, Utils) → Integration tests (API routes, Services) → E2E (manual browser testing).',
          },
          {
            title: '80% Coverage Target',
            message:
              'Focus on service layer and business logic. Testing Library for component tests encourages accessibility-focused testing.',
          },
        ],
      },
    },
    {
      id: 'lessons',
      type: 'lessons',
      number: '12',
      heading: 'Lessons Learned',
      image: '/images/trello-project.webp',
      content: {
        items: [
          {
            title: 'Feature-Based Structure',
            message:
              'Co-locating related code by feature (not by layer) made parallel development smooth and refactoring safer.',
          },
          {
            title: 'Type Safety Saves Time',
            message:
              "Initial TypeScript overhead pays dividends. Hono RPC's end-to-end type safety prevented countless runtime bugs.",
          },
          {
            title: 'Start Simple',
            message:
              'Avoided premature optimization (e.g., no Redis caching yet). Supabase PostgreSQL + React Query caching is sufficient for current scale.',
          },
          {
            title: 'Testing From Day 1',
            message:
              'Should have written tests from the beginning. Adding tests later is significantly more painful.',
          },
        ],
      },
    },
  ],
  theme: {
    primary: '#0284C7', // Sky-600
    gradient: 'linear-gradient(90deg, #075985 0%, #0284C7 100%)', // Sky-900 to Sky-600
  },
}
