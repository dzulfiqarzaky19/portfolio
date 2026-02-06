import type { ProjectData } from '@/lib/types/project'

export const LEGACY_SYSTEM_PROJECT: ProjectData = {
  id: 'legacy-system',
  tag: 'EXPERIENCE BACKEND',
  title: 'Scalable Backend Architecture',
  subtitle:
    'A deep dive into how we transformed a legacy monolith into a high-performance, distributed system capable of handling 10x traffic spikes.',
  description:
    'A deep dive into how we transformed a legacy monolith into a high-performance, distributed system capable of handling 10x traffic spikes.',
  links: [
    {
      url: 'https://github.com/dzulfiqarzaky/legacy-system',
      label: 'View Source Code',
      icon: 'github',
    },
    {
      url: 'https://legacy-system-demo.com',
      label: 'Live Demo',
      icon: 'live',
    },
  ],
  sections: [
    {
      id: 'challenge',
      type: 'challenge',
      number: '01',
      heading: 'The Challenge',
      description:
        'Our legacy system was suffering from tight coupling. A single failure in the notification service would cascade, bringing down the entire checkout flow. Technical debt had accumulated to a point where new feature deployment took days, not hours.',
      isTilted: true,
      content: {
        highlight: {
          title: 'CRITICAL BOTTLENECK',
          message:
            'Database connection pool exhaustion during peak hours led to widespread 504 errors.',
        },
      },
    },
    {
      id: 'folder-structure',
      type: 'folder-structure',
      number: '02',
      heading: 'Folder Structure',
      description:
        'We adopted Clean Architecture to decouple core business rules from external frameworks. By separating the web domain logic from the database and UI layers, we achieved:',
      isTilted: true,
      content: {
        bullets: [
          {
            title: 'Scalability',
            message:
              'Business logic can be tested without mocking database calls.',
          },
          {
            title: 'Flexibility',
            message:
              'Swapping the database from SQL to NoSQL became a configuration change, not a rewrite.',
          },
        ],
      },
    },
    {
      id: 'caching',
      type: 'caching',
      number: '03',
      heading: 'Caching Strategy',
      description:
        'We implemented the Cache-Aside pattern to ensure data consistency without over-engineering.',
      isTilted: false,
      content: {
        highlights: [
          {
            type: 'MODERNIZATION',
            message:
              'We implemented the Cache-Aside pattern to ensure data consistency without over-engineering.',
          },
          {
            type: 'TRADE-OFFS',
            message:
              'Cache invalidation becomes complex. We accepted a 1-hour stale data window for non-critical analytics.',
          },
          {
            type: 'BUSINESS INSIGHT',
            message: '40% reduction in average API response time.',
          },
        ],
      },
    },
    {
      id: 'metrics',
      type: 'metrics',
      heading: 'Refining the Dashboard Experience',
      description:
        'Scaling the backend allowed us to feed real-time data to the admin front-end.',
      content: {
        cards: [
          {
            title: 'Real-time Metrics',
            description:
              'Distributed telemetry across all microservices for real-time visibility.',
          },
          {
            title: 'Load Distribution',
            description:
              'Visualizing traffic patterns and autoscaling events in real-time.',
          },
          {
            title: 'Service Mesh',
            description:
              'Deep service communication topology for robust debugging.',
          },
        ],
      },
    },
    {
      id: 'lessons',
      type: 'lessons',
      heading: 'Lessons Learned & Future Outlook',
      content: {
        items: [
          {
            title: "Don't Optimize Prematurely",
            message:
              "Initially over-engineered the messaging queue for a load we weren't reaching yet. Simple SQST IFIs would have sufficed for phase 1.",
          },
          {
            title: 'Observability is Key',
            message:
              'Implementing OpenTelemetry early saved us hours of debugging during the transition phase.',
          },
          {
            title: "What's Next?",
            message:
              'We are currently exploring GraphQL Federation to unify the API graph across all microservices.',
          },
        ],
      },
    },
  ],
  theme: {
    primary: '#4F46E5',
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)',
  },
}
