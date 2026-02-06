import type { ProjectData } from '@/lib/types/project'

export const ECOMMERCE_DASHBOARD_PROJECT: ProjectData = {
  id: 'ecommerce-dashboard',
  tag: 'FULL STACK ANALYTICS PLATFORM',
  title: 'Magpie: E-commerce Analytics Dashboard',
  subtitle:
    'Real-time e-commerce analytics dashboard with time-series analysis and automated data synchronization.',
  description:
    'Built with Next.js 16, PostgreSQL, and Prisma. Features hourly background jobs, service-layer architecture, and parallel data fetching for sub-second dashboard loads.',
  links: [
    {
      url: 'https://github.com/dzulfiqarzaky19/magpie',
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
        'Store owners need immediate, actionable insights into their business performance. While many dashboards provide static snapshots, real-time revenue velocity and trend analysis require sophisticated time-series handling.',
      isTilted: true,
      image: '/images/real-time-dashboard.webp',
      content: {
        highlight: {
          title: 'REAL-TIME BUSINESS INSIGHTS',
          message:
            "Store owners need hourly tracking to answer 'How much did we make this hour?' with automated sync and month-over-month comparisons for revenue, orders, and ratings.",
        },
      },
    },
    {
      id: 'tech-stack',
      type: 'folder-structure',
      number: '02',
      heading: 'Tech Stack Rationale',
      description:
        'Modern full-stack TypeScript with carefully chosen technologies optimized for type safety, performance, and maintainability.',
      isTilted: true,
      codeSnippet: `// Core Stack
- Next.js 16.1.6: Full-stack framework with App Router
- PostgreSQL: Relational database for structured data
- Prisma ^6.19.2: Type-safe ORM and migrations
- TypeScript ^5: Static typing across the stack
- Trigger.dev ^4.3.3: Background job orchestration

// Key Libraries
- date-fns ^4.1.0: Immutable, tree-shakeable date utilities
- shadcn/ui + Tailwind CSS: Accessible, customizable components
- recharts ^2.15.4: Declarative charting library
- tsx ^4.21.0: Zero-config TypeScript execution`,
      content: {
        bullets: [
          {
            title: 'date-fns over Moment.js',
            message:
              'Immutable, tree-shakeable date utilities without bloat. Powers complex time-series logic without size and mutability issues.',
          },
          {
            title: 'shadcn/ui Components',
            message:
              'Accessible, customizable components we own (not a package dependency) - more setup but faster customization.',
          },
          {
            title: 'Prisma ORM',
            message:
              'Type-safe database access with automatic migrations and singleton pattern to prevent connection exhaustion.',
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
        'Service-Repository pattern adaptation with clear separation between database access, business logic, and presentation layers.',
      isTilted: false,
      codeSnippet: `magpie/
├── prisma/
│   └── schema.prisma          # Database schema 
├── scripts/
│   └── force-ipv4.js          # WSL2 networking fix 
├── src/
│   ├── app/                   # Next.js App Router
│   │   └── page.tsx           # Server Component
│   ├── components/            # Feature-specific 
│   │   ├── dashboard/         # Dashboard-specific 
│   │   │   ├── Insights/      # Sales chart 
│   │   │   ├── Metric.tsx     # KPI card component
│   │   │   ├── OrderStatus.tsx
│   │   │   ├── RecentOrders.tsx
│   │   │   └── TopProducts.tsx
│   │   ├── ui/                # shadcn/ui components
│   │   └── utils/             # AutoRefresh component
│   ├── const/                 # Typed constants
│   │   ├── chartConfig.ts     # Recharts color schema
│   │   ├── color.ts           # Status color mappings
│   │   ├── order.ts           # Order status constant
│   │   └── product.ts         # Product category
│   ├── lib/                   # Core utils & Prisma
│   │   ├── prisma/
│   │   │   ├── index.ts       # Prisma client
│   │   │   └── seed.ts        # Database seeder
│   │   ├── types.ts           # Shared TypeScript
│   │   └── utils/
│   │       ├── calculateTrends.ts
│   │       ├── dummyGenerator.ts
│   │       └── processSalesHistory.ts
│   ├── services/              # Business Logic Layer
│   │   ├── insights.ts        # Sales history queries
│   │   ├── metrics.ts         # KPI aggregations
│   │   ├── order.ts           # Order CRUD + sync
│   │   └── product.ts         # Product CRUD + sync
│   └── trigger/
│       └── ecommerceSync.ts   # Hourly background job`,
      content: {
        bullets: [
          {
            title: 'Service-Repository Pattern',
            message:
              "4 domain services (product, order, metrics, insights) prevent 'Fat Controllers' and enable independent testing.",
          },
          {
            title: 'Mental Model Clarity',
            message:
              "Developers instantly locate logic (e.g., 'Revenue calculation?' → metrics.ts) with clear separation of concerns.",
          },
          {
            title: 'Utilities vs Services',
            message:
              'Pure functions like processSalesHistory.ts live in utils/ for decoupled, testable transformations.',
          },
        ],
      },
    },
    {
      id: 'architectural-flow',
      type: 'flow',
      number: '04',
      heading: 'High-Level Architecture Flow',
      description:
        'End-to-end request lifecycle showing data flow from browser client through Next.js Server Components to PostgreSQL database with background job orchestration.',
      isTilted: true,
      image: '/images/real-time-dashboard-flow.webp',
      content: {
        steps: [
          {
            title: 'Browser Client',
            description:
              'User visits dashboard - Next.js serves Server Component rendering HTML with data.',
          },
          {
            title: 'Server Component',
            description:
              'page.tsx executes parallel Promise.all() to fetch data from service layer.',
          },
          {
            title: 'Service Layer',
            description:
              '4 domain services (product, order, metrics, insights) execute business logic and query database.',
          },
          {
            title: 'Prisma ORM',
            description:
              'Type-safe database queries with automatic connection pooling and singleton pattern.',
          },
          {
            title: 'PostgreSQL',
            description:
              'Normalized 3NF schema returns aggregated data for dashboard metrics and charts.',
          },
          {
            title: 'Trigger.dev Background Job',
            description:
              'Hourly sync fetches mock API data, generates synthetic orders, and updates database.',
          },
          {
            title: 'AutoRefresh Component',
            description:
              'Client-side timer triggers router.refresh() every hour for seamless data updates.',
          },
        ],
      },
    },
    {
      id: 'database-schema',
      type: 'folder-structure',
      number: '05',
      heading: 'Database Schema Design (3NF)',
      description:
        'Strictly normalized schema using a pivot table instead of JSON arrays for proper relational integrity and SQL-level analytics.',
      isTilted: true,
      codeSnippet: `model Order {
  id         Int         @id @default(autoincrement())
  userId     Int
  status     String
  totalPrice Decimal
  items      OrderItem[] // Relation, not JSON array
}

model OrderItem {
  id        Int     @id @default(autoincrement())
  orderId   Int
  productId Int
  quantity  Int
  order     Order   @relation(fields: [orderId], references: [id])
  product   Product @relation(fields: [productId], references: [id])
  
  @@unique([orderId, productId])
}`,
      content: {
        bullets: [
          {
            title: 'Referential Integrity',
            message:
              'Foreign key constraints prevent orphaned order items - no JSON array parsing needed.',
          },
          {
            title: 'SQL-Level Analytics',
            message:
              "Complex queries like 'Total units sold for Product X' use native joins without JSON extraction.",
          },
          {
            title: '3NF Compliance',
            message:
              'Normalized structure eliminates data redundancy and ensures data integrity across the application.',
          },
        ],
      },
    },
    {
      id: 'parallel-fetching',
      type: 'folder-structure',
      number: '06',
      heading: 'Parallel Data Fetching',
      description:
        'Server Component optimization using Promise.all to prevent request waterfalls and reduce TTFB from ~3.5s to ~500ms.',
      isTilted: false,
      codeSnippet: `const [
  productsCategory,
  topProducts,
  ordersByStatus,
  recentOrders,
  metrics,
  salesHistory,
  lastSyncedTime
] = await Promise.all([
  getProductsByCategory(),
  getTopProducts(),
  getOrdersByStatus(),
  getRecentOrders(),
  getDashboardMetrics(),
  getSalesHistory(),
  getLastSyncedTime()
])`,
      content: {
        bullets: [
          {
            title: 'Performance Win',
            message:
              '7 requests in parallel vs sequential execution - prevents request waterfalls for massive speed improvement.',
          },
          {
            title: 'TTFB Optimization',
            message:
              'Reduces Time To First Byte from ~3.5s to ~500ms by fetching all dashboard data simultaneously.',
          },
          {
            title: 'Server Component Pattern',
            message:
              'Leverages Next.js Server Components to fetch data on the server before streaming HTML to client.',
          },
        ],
      },
    },
    {
      id: 'time-series',
      type: 'folder-structure',
      number: '07',
      heading: 'Smart Time-Series Data Initialization',
      description:
        "Zero-fill missing data points for complete charts with dynamic endpoints that only show hours up to 'now' instead of future hours.",
      isTilted: true,
      codeSnippet: `const initializeTimeMaps = (now: Date) => {
  const hourly = new Map<string, number>();
  
  const days = eachDayOfInterval({
    start: subDays(now, 30),
    end: now
  });
  
  days.forEach(day => {
    const isToday = format(day, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd');
    const endHour = isToday ? now : endOfDay(day);
    
    const hoursInDay = eachHourOfInterval({
      start: startOfDay(day),
      end: endHour
    });
    
    hoursInDay.forEach(hour => {
      hourly.set(format(hour, "yyyy-MM-dd'T'HH:00"), 0);
    });
  });
  
  return { hourly };
}`,
      content: {
        bullets: [
          {
            title: 'Zero-Fill Missing Data',
            message:
              "Charts show '0' for hours without sales instead of gaps - provides complete visual clarity.",
          },
          {
            title: 'Dynamic End Point',
            message:
              "Today's chart only shows hours up to 'now' (not future hours) for accurate time representation.",
          },
          {
            title: 'Immutable Map Pattern',
            message:
              'Type-safe aggregation without array mutations using Map data structure.',
          },
        ],
      },
    },
    {
      id: 'metrics-trends',
      type: 'caching',
      number: '08',
      heading: 'Parallel Metrics with Trend Calculation',
      description:
        'Elegant DRY approach to fetching current and previous period metrics simultaneously for percentage change calculations.',
      isTilted: true,
      image: '/images/magpie-metrics.webp',
      codeSnippet: `// src/services/metrics.ts
export const getDashboardMetrics = async () => {
  const now = new Date();
  const thirtyDaysAgo = subDays(now, 30);
  const sixtyDaysAgo = subDays(now, 60);
  
  const last30DaysFilter = { gte: thirtyDaysAgo };
  const previous30DaysFilter = { gte: sixtyDaysAgo, lt: thirtyDaysAgo };
  
  const [revenue, orders, averageOrder, rating] = await Promise.all([
    getRevenue({ current: last30DaysFilter, previous: previous30DaysFilter }),
    getOrderCount({ current: last30DaysFilter, previous: previous30DaysFilter }),
    getAverageOrder({ current: last30DaysFilter, previous: previous30DaysFilter }),
    getRating({ current: last30DaysFilter, previous: previous30DaysFilter })
  ]);
  
  return { revenue, orders, averageOrder, rating };
}`,
      content: {
        highlights: [
          {
            type: 'Parallel Queries',
            message:
              'Fetches current + previous periods simultaneously for 4 metrics (revenue, orders, AOV, rating) using Promise.all.',
          },
          {
            type: 'DRY Principle',
            message:
              'Reuses DateRangeProps interface across all metrics - centralizes date range logic in one place.',
          },
          {
            type: 'Reusable Trend Logic',
            message:
              'calculateTrend() utility centralizes percentage change math for consistent trend calculations.',
          },
        ],
      },
    },
    {
      id: 'synthetic-data',
      type: 'folder-structure',
      number: '09',
      heading: 'Synthetic Data Generation',
      description:
        'Pragmatic approach to demonstrate time-series charts with movement by generating 2-3 new orders and occasional reviews on every sync.',
      isTilted: false,
      codeSnippet: `export const generateNewOrders = async (products: Product[]) => {
  const totalNewOrders = Math.floor(Math.random() * 3) + 1;
  
  const orders = Array.from({ length: totalNewOrders }, () => ({
    userId: Math.floor(Math.random() * 100),
    status: randomStatus(),
    totalPrice: calculatePrice(randomProducts),
    createdAt: new Date()
  }));
  
  return orders;
}`,
      content: {
        bullets: [
          {
            title: 'Pragmatic Demonstration',
            message:
              'Mock API returns static data - synthetic generation creates realistic time-series movement.',
          },
          {
            title: 'Isolated Implementation',
            message:
              'Not an anti-pattern - isolated to seed/simulation, not core business logic.',
          },
          {
            title: 'Realistic Behavior',
            message:
              'Random generation creates natural-looking dashboard activity for portfolio demonstration.',
          },
        ],
      },
    },
    {
      id: 'background-jobs',
      type: 'flow',
      number: '10',
      heading: 'Hourly Background Jobs with Trigger.dev',
      description:
        'Automated data synchronization using Trigger.dev to fetch from mock API, generate synthetic data, and update the database every hour.',
      isTilted: true,
      image: '/images/magpie-trigger.webp',
      codeSnippet: `// src/trigger/ecommerceSync.ts
import { task } from "@trigger.dev/sdk/v3";

export const ecommerceSync = task({
  id: "ecommerce-sync",
  run: async () => {
    // 1. Fetch from mock API
    const products = await fetch('https://api.mock/products').then(r => r.json());
    
    // 2. Sync products to database
    await syncProducts(products);
    
    // 3. Generate synthetic orders
    const newOrders = await generateNewOrders(products);
    await syncOrders(newOrders);
    
    // 4. Update metrics
    return { synced: new Date() };
  }
});

// Schedule: Every hour
export const scheduledSync = schedules.create({
  task: "ecommerce-sync",
  cron: "0 * * * *" // Every hour
});`,
      content: {
        steps: [
          {
            title: 'Trigger Job Start',
            description:
              'Trigger.dev executes ecommerceSync job on hourly schedule.',
          },
          {
            title: 'Fetch Mock API',
            description:
              'Job fetches static product and order data from mock API endpoints.',
          },
          {
            title: 'Generate Synthetic Data',
            description:
              'Creates 2-3 new orders with random products and occasional reviews.',
          },
          {
            title: 'Database Sync',
            description:
              'Service layer updates PostgreSQL via Prisma with new data.',
          },
          {
            title: 'Auto Refresh',
            description:
              'Dashboard auto-refreshes at the top of each hour to display updated data.',
          },
        ],
      },
    },
    {
      id: 'performance',
      type: 'caching',
      number: '11',
      heading: 'Performance Optimizations',
      description:
        'Multiple optimization strategies including parallel fetching, potential caching, database indexing, and bundle size management.',
      codeSnippet: `// Server Component Data Fetching
// Strategy: Promise.all() for parallel execution
// Result: ~500ms TTFB for 7 database queries

// Caching Strategy (Future)
export const revalidate = 300; // 5 minutes

// Database Query Optimization
// - Prisma auto-creates indexes on foreign keys
// - Built-in .aggregate() for optimal SQL generation

// Bundle Size
// - date-fns: Tree-shakeable (only imports used functions)
// - shadcn/ui: Components copied to src/, no runtime dependency`,
      content: {
        highlights: [
          {
            type: 'Server Component Fetching',
            message:
              'All dashboard data fetched in parallel via Promise.all() - ~500ms TTFB for 7 queries.',
          },
          {
            type: 'Database Optimization',
            message:
              'Prisma auto-indexes foreign keys and uses efficient .aggregate() for SQL generation.',
          },
          {
            type: 'Bundle Size',
            message:
              'Tree-shakeable date-fns and copied shadcn/ui components minimize runtime dependencies.',
          },
        ],
      },
    },
    {
      id: 'testing',
      type: 'folder-structure',
      number: '13',
      heading: 'Testing Philosophy',
      description:
        'Recommended test pyramid approach with focus on unit tests for utilities and services, integration tests for service layer, and E2E for critical flows.',
      isTilted: false,
      codeSnippet: `// Recommended Test Pyramid

// Unit Tests (70%)
// - processSalesHistory.ts: Test with mock data
// - calculateTrend.ts: Test edge cases (0%, negative trends)

// Integration Tests (20%)
// - Service layer with test database
// - Example: getDashboardMetrics() returns correct structure

// E2E Tests (10%)
// - Playwright: Verify charts render and auto-refresh works

// Coverage Goals
// - Critical: services/, lib/utils/ (>80% coverage)
// - Nice-to-have: Components (>60% coverage)`,
      content: {
        bullets: [
          {
            title: 'Unit Tests Priority',
            message:
              '70% focus on testing pure functions in services/ and lib/utils/ for reliable business logic.',
          },
          {
            title: 'Integration Testing',
            message:
              '20% coverage for service layer with test database to verify correct orchestration.',
          },
          {
            title: 'E2E Validation',
            message:
              '10% Playwright tests for critical flows - chart rendering and auto-refresh functionality.',
          },
        ],
      },
    },
    {
      id: 'lessons',
      type: 'lessons',
      number: '12',
      heading: 'Lessons Learned',
      image: '/images/real-time-dashboard.webp',
      content: {
        items: [
          {
            title: 'Service Layer Early',
            message:
              'Prevented technical debt before it happened - investing 30 minutes in architecture saved 5+ hours of refactoring later.',
          },
          {
            title: 'TypeScript Strict Mode',
            message:
              'Caught 15+ bugs at compile time instead of runtime - strict mode pays dividends.',
          },
          {
            title: 'Parallel Fetching',
            message:
              'Massive performance win with minimal code change - should be default pattern for dashboard pages.',
          },
          {
            title: 'Testing Strategy',
            message:
              'Should have written tests alongside features (not after) - retroactive testing is significantly harder.',
          },
          {
            title: 'Documentation Matters',
            message:
              'Maintaining documentation from day 1 is easier than retroactive writing - saves hours of context switching.',
          },
        ],
      },
    },
  ],
  theme: {
    primary: '#3B82F6', // Blue-500
    gradient: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)', // Blue-900 to Blue-500
  },
}
