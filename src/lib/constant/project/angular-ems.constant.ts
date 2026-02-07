import type { ProjectData } from '@/lib/types/project'

export const ANGULAR_EMS_PROJECT: ProjectData = {
  id: 'angular-ems',
  tag: 'ANGULAR 19 BACKOFFICE',
  title: 'Employee Management System',
  subtitle:
    'A modern Angular 19 backoffice application featuring signal-based state management and reusable form components.',
  description:
    'Built with Angular 19 Signals, TypeScript strict mode, and a custom store pattern. Features comprehensive employee CRUD operations, advanced filtering, and a clean architecture separating core services, feature modules, and shared components.',
  links: [
    {
      url: 'https://github.com/dzulfiqarzaky19/backoffice_angular',
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
        'Organizations need efficient tools to manage employee records with features like searching, filtering, sorting, and CRUD operations. Traditional approaches often lack modularity and real-time reactivity.',
      isTilted: true,
      image: '/images/angular-ems-dashboard.webp',
      content: {
        highlight: {
          title: 'MODERN HR MANAGEMENT',
          message:
            'HR administrators need real-time filtering across multiple criteria, instant search without server delays, and role-based access with modular, reusable components for rapid development.',
        },
      },
    },
    {
      id: 'tech-stack',
      type: 'folder-structure',
      number: '02',
      heading: 'Tech Stack & Architecture',
      description:
        'Modern Angular 19 with Signals API, standalone components, and strict TypeScript. Features feature-based organization for scalability and maintainability.',
      isTilted: true,
      codeSnippet: `src/app/
├── core/                      # Singleton services, guards
│   ├── guards/
│   │   └── auth.guard.ts      # Route protection
│   └── services/
│       ├── auth.service.ts    # Authentication logic
│       └── employee.service.ts # CRUD operations
│
├── features/                  # Feature modules (lazy-loaded)
│   ├── auth/
│   │   └── pages/login/       # Login page
│   └── employee/
│       ├── components/        # Feature-specific components
│       ├── pages/             # List, Form, Detail pages
│       └── store/
│           └── employee.store.ts # State management
│
├── layout/
│   └── dashboard/             # Dashboard wrapper with header
│
└── shared/                    # Reusable across features
    ├── components/
    │   ├── button/            # Custom button component
    │   ├── forms/             # 7 form controls (CVA pattern)
    │   ├── header/            # App header with logout
    │   ├── table/             # Data table component
    │   └── typography/        # Text variants (h1-h6)
    └── models/
        └── employee.model.ts  # Type definitions`,
      codeLanguage: 'Directory',
      content: {
        bullets: [
          {
            title: 'Feature-Based Organization',
            message:
              'Scalable architecture with clear ownership boundaries, making features easy to extract into libraries.',
          },
          {
            title: 'Standalone Components',
            message:
              "No NgModules required - Angular 19's standalone components enable better tree-shaking and simpler mental model.",
          },
        ],
      },
    },
    {
      id: 'signals-over-rxjs',
      type: 'folder-structure',
      number: '03',
      heading: 'Signals Over RxJS',
      description:
        'Angular Signals provide fine-grained reactivity with better performance and less boilerplate than traditional RxJS BehaviorSubjects.',
      isTilted: false,
      codeSnippet: `// ❌ Before (RxJS)
private employees$ = new BehaviorSubject<Employee[]>([]);
readonly allEmployees$ = this.employees$.asObservable();

// Consumers need async pipe
employees$ | async

// ✅ After (Signals)
private employees = signal<Employee[]>([]);
readonly allEmployees = this.employees.asReadonly();

// Direct access, auto-tracked
employees()`,
      codeLanguage: 'TypeScript',
      content: {
        bullets: [
          {
            title: 'Less Boilerplate',
            message:
              'No async pipe needed in templates, direct access to signal values with automatic change detection.',
          },
          {
            title: 'Better Performance',
            message:
              'Fine-grained reactivity - only recalculates dependencies that actually changed, unlike RxJS which emits on every change.',
          },
          {
            title: 'Type-Safe',
            message:
              'No null checks required - signals are always initialized and type-safe throughout.',
          },
        ],
      },
    },
    {
      id: 'custom-store-pattern',
      type: 'folder-structure',
      number: '04',
      heading: 'Custom Store Pattern',
      description:
        'Declarative state management using computed signals for filtering, sorting, and pagination with automatic reactivity and zero memory leaks.',
      isTilted: true,
      codeSnippet: `export class EmployeeStore {
  private state = signal<EmployeeState>({ /* filters, pagination */ });
  
  // Computed chain: raw → filtered → sorted → paged
  private filteredList = computed(() => {
    const s = this.state();
    return this.employees().filter(e => {
      const matchesName = /* multi-field search */;
      const matchesGroup = !s.searchTermGroup || e.group === s.searchTermGroup;
      const matchesStatus = !s.searchTermStatus || e.status === s.searchTermStatus;
      return matchesName && matchesGroup && matchesStatus;
    });
  });
  
  private sortedList = computed(() => 
    [...this.filteredList()].sort(/* custom sort */)
  );
  
  readonly pagedEmployees = computed(() => {
    const { currentPage, pageSize } = this.state();
    const start = (currentPage - 1) * pageSize;
    return this.sortedList().slice(start, start + pageSize);
  });
}`,
      codeLanguage: 'TypeScript',
      content: {
        bullets: [
          {
            title: 'Automatic Updates',
            message:
              'Change state.searchTerm, and pagination auto-recalculates. Memoized, only recomputes when dependencies change.',
          },
          {
            title: 'No Memory Leaks',
            message:
              "No manual unsubscribe needed - computed signals are managed by Angular's reactivity system.",
          },
          {
            title: 'Performance Gain',
            message:
              'Reduces code by ~40% compared to manual subscription management with instant filtering/sorting (<5ms for 105 employees).',
          },
        ],
      },
    },
    {
      id: 'data-flow',
      type: 'flow',
      number: '05',
      heading: 'Data Flow Architecture',
      description:
        'Reactive data flow from user actions through signals to automatic UI updates without manual subscriptions.',
      isTilted: true,
      image: '/images/angular-ems-detail.webp',
      content: {
        steps: [
          {
            title: 'User Action',
            description: 'Search/filter/sort action triggered in component.',
          },
          {
            title: 'State Update',
            description:
              'EmployeeStore.updateState() modifies the state signal.',
          },
          {
            title: 'Computed Recalculation',
            description:
              'Computed signals automatically recalculate: filteredList → sortedList → pagedEmployees.',
          },
          {
            title: 'Auto UI Update',
            description:
              'Angular detects signal changes and updates the view automatically.',
          },
        ],
      },
    },
    {
      id: 'control-value-accessor',
      type: 'folder-structure',
      number: '06',
      heading: 'ControlValueAccessor Pattern',
      description:
        "All 7 form inputs implement Angular's ControlValueAccessor interface for seamless FormGroup integration and consistent API.",
      isTilted: true,
      codeSnippet: `export class SelectComponent implements ControlValueAccessor {
  writeValue(value: string): void { /* ... */ }
  registerOnChange(fn: any): void { /* ... */ }
  registerOnTouched(fn: any): void { /* ... */ }
  setDisabledState(isDisabled: boolean): void { /* ... */ }
  
  getErrorMessage(): string {
    if (this.ngControl?.errors?.['required']) {
      return \`\${this.label() || 'Field'} is required\`;
    }
    return 'Invalid selection';
  }
}

// Usage
<app-select-input formControlName="group" [options]="groups" />`,
      codeLanguage: 'TypeScript',
      content: {
        bullets: [
          {
            title: 'Seamless Integration',
            message:
              'Works perfectly with FormGroup/FormControl, automatic validation integration, and consistent API across all inputs.',
          },
          {
            title: 'Dynamic Error Messages',
            message:
              "Uses label input to generate contextual errors: 'Group is required' instead of generic 'Field is required'.",
          },
          {
            title: 'Reusable Components',
            message:
              '7 custom form controls: Text, Email, Password, Number, Date, Search, and Select - all reusable across projects.',
          },
        ],
      },
    },
    {
      id: 'multi-field-search',
      type: 'folder-structure',
      number: '07',
      heading: 'Multi-Field Search Logic',
      description:
        "Users can search by username, full name, or email in one field - no 'search by' dropdown needed for superior UX.",
      isTilted: false,
      codeSnippet: `const matchesName =
  e.username.toLowerCase().includes(s.searchTermName.toLowerCase()) ||
  \`\${e.firstName} \${e.lastName}\`.toLowerCase().includes(s.searchTermName.toLowerCase()) ||
  e.email.toLowerCase().includes(s.searchTermName.toLowerCase());`,
      codeLanguage: 'TypeScript',
      content: {
        bullets: [
          {
            title: 'Unified Search',
            message:
              'One search field queries username, full name, and email simultaneously for intuitive user experience.',
          },
          {
            title: 'Client-Side Performance',
            message:
              'Instant results with no server round-trip, filtering 105 employees in under 5ms.',
          },
        ],
      },
    },
    {
      id: 'functional-guards',
      type: 'folder-structure',
      number: '08',
      heading: 'Functional Route Guards',
      description:
        'Modern functional guards instead of class-based guards for less boilerplate, better tree-shaking, and Angular 15+ best practices.',
      isTilted: true,
      codeSnippet: `export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.isLoggedIn() 
    ? true 
    : inject(Router).createUrlTree(['/login']);
};`,
      codeLanguage: 'TypeScript',
      content: {
        bullets: [
          {
            title: 'Less Boilerplate',
            message:
              'No class declaration, constructor, or implement statements required.',
          },
          {
            title: 'Tree-Shakeable',
            message:
              'Better bundle size optimization compared to class-based guards.',
          },
        ],
      },
    },
    {
      id: 'design-system',
      type: 'caching',
      number: '09',
      heading: 'CSS Design System',
      description:
        'Custom CSS variables design system enabling runtime theme switching, dark mode support, and zero build overhead for styling changes.',
      isTilted: true,
      image: '/images/angular-ems-dashboard.webp',
      content: {
        highlights: [
          {
            type: 'CSS Custom Properties',
            message:
              'Runtime theme switching capability (future dark mode) with no build step for color changes.',
          },
          {
            type: 'Design Tokens',
            message:
              'Consistent spacing (4px grid), color palette, typography scale (12px-36px), border radius, and shadows.',
          },
          {
            type: 'No Component Library',
            message:
              'Full design control, smaller bundle size, and learning opportunity with custom CVA components.',
          },
        ],
      },
    },
    {
      id: 'typescript-strict',
      type: 'folder-structure',
      number: '10',
      heading: 'TypeScript Strict Mode',
      description:
        'Comprehensive strict TypeScript configuration catching errors at compile-time and improving IDE autocomplete.',
      isTilted: false,
      codeSnippet: `{
  "strict": true,
  "noImplicitOverride": true,
  "noPropertyAccessFromIndexSignature": true,
  "noImplicitReturns": true,
  "noFallthroughCasesInSwitch": true,
  "strictTemplates": true
}`,
      codeLanguage: 'JSON',
      content: {
        bullets: [
          {
            title: 'Compile-Time Safety',
            message:
              'Catch type errors, null/undefined issues, and implicit any types before runtime.',
          },
          {
            title: 'Better DX',
            message:
              'Improved IDE autocomplete, inline documentation, and refactoring confidence.',
          },
        ],
      },
    },
    {
      id: 'performance',
      type: 'metrics',
      number: '11',
      heading: 'Performance Optimizations',
      description:
        'Lazy loading, standalone components, computed signals, and client-side state for optimal performance.',
      codeSnippet: `// Lazy Loading Routes
{
  path: 'employee',
  loadComponent: () => import('./features/employee/...')
}

// Client-Side Performance
// 105 mock employees in-memory
// - Search: < 5ms
// - Filter + Sort: < 10ms
// - Pagination: < 1ms`,
      codeLanguage: 'TypeScript',
      content: {
        cards: [
          {
            title: 'Lazy Loading',
            description:
              'Initial bundle ~150kB, each route ~30kB with loadComponent() for optimal loading.',
            image: '/images/angular-ems-dashboard.webp',
          },
          {
            title: 'Tree-Shakeable',
            description:
              'Standalone components enable Angular to tree-shake unused code for smaller bundles.',
            image: '/images/angular-ems-detail.webp',
          },
          {
            title: 'Computed Signals',
            description:
              'Only recalculate when dependencies change vs RxJS which emits on every change.',
            image: '/images/angular-ems-dashboard.webp',
          },
        ],
      },
    },
    {
      id: 'testing-strategy',
      type: 'folder-structure',
      number: '12',
      heading: 'Testing Philosophy',
      description:
        'Comprehensive unit tests for services, guards, and shared components using Jasmine and Karma.',
      isTilted: true,
      codeSnippet: `Testing Pyramid:
        /\\
       /E2E\\       ← Not yet implemented
      /------\\
     /  INT   \\    ← RouterTestingHarness
    /----------\\
   /   UNIT     \\  ← Service logic, components
  /--------------\\

Coverage Goals:
- Statements: > 80%
- Branches: > 75%
- Functions: > 80%`,
      codeLanguage: 'Plain Text',
      content: {
        bullets: [
          {
            title: 'Unit Tests',
            message:
              '80% of tests - covering service methods, component rendering, and form validation logic.',
          },
          {
            title: 'Integration Tests',
            message:
              '15% of tests - route navigation with guards, form submission flows, component interactions.',
          },
          {
            title: 'E2E Future',
            message:
              '5% planned - complete user journeys with Playwright or Cypress for end-to-end validation.',
          },
        ],
      },
    },
    {
      id: 'accessibility',
      type: 'folder-structure',
      number: '13',
      heading: 'Accessibility Considerations',
      description:
        'Semantic HTML, proper label associations, and screen reader support with future WCAG 2.1 AA compliance planned.',
      isTilted: false,
      codeSnippet: `// Error States
get hasError(): boolean | null {
  return this.ngControl?.invalid && 
    (this.ngControl?.dirty || this.ngControl?.touched);
}

// Why dirty || touched?
// - Don't show errors immediately (scary)
// - Show after interaction (helpful)`,
      codeLanguage: 'TypeScript',
      content: {
        bullets: [
          {
            title: 'Semantic HTML',
            message:
              'Proper use of <label>, <input>, <button> elements with unique id attributes for label-input association.',
          },
          {
            title: 'Error Messages',
            message:
              'Error messages linked to inputs and visible to screen readers for better accessibility.',
          },
          {
            title: 'Future Enhancements',
            message:
              'ARIA live regions, keyboard navigation in tables, focus management, and WCAG 2.1 AA compliance audit.',
          },
        ],
      },
    },
    {
      id: 'developer-experience',
      type: 'folder-structure',
      number: '14',
      heading: 'Developer Experience',
      description:
        'Fast onboarding (<15 minutes), auto-formatting with Prettier, hot reload, and helpful error messages.',
      isTilted: true,
      codeSnippet: `# Quick Start
git clone <repo-url>
npm install        # ~2 min
npm start          # ~10 sec, opens localhost:4200

# Login Credentials (demo)
Username: admin
Password: admin

# Development Workflow
npm run format     # Prettier auto-format
npm test           # Jasmine + Karma tests`,
      codeLanguage: 'Bash',
      content: {
        bullets: [
          {
            title: 'Fast Setup',
            message:
              'From clone to running app in under 15 minutes with clear documentation and sensible defaults.',
          },
          {
            title: 'Hot Reload',
            message:
              'Save any file → browser auto-refreshes in <1 second with TypeScript errors in terminal + VS Code.',
          },
          {
            title: 'Common Gotchas',
            message:
              'Documentation includes solutions for Chrome not found on Linux, form control issues, and signal update patterns.',
          },
        ],
      },
    },
    {
      id: 'lessons',
      type: 'lessons',
      number: '15',
      heading: 'Lessons Learned: React to Angular',
      image: '/images/angular-ems-dashboard.webp',
      content: {
        items: [
          {
            title: 'Signals > RxJS for State',
            message:
              'Coming from React useState/Redux, Angular Signals feel more intuitive than RxJS for simple state. Save RxJS for async streams.',
          },
          {
            title: 'Two-Way Binding is Powerful',
            message:
              "Angular's [(ngModel)] and FormControl reduce boilerplate compared to React's onChange handlers. CVA pattern is effort upfront but saves time.",
          },
          {
            title: 'Dependency Injection ≠ Props Drilling',
            message:
              "Angular's DI system eliminates React's context/props drilling. Services injected anywhere avoid prop-passing through component trees.",
          },
          {
            title: 'TypeScript Strictness Matters More',
            message:
              "Angular's template type-checking catches errors React misses. strictTemplates found bugs that would've been runtime errors in JSX.",
          },
          {
            title: 'Feature Structure Scales Better',
            message:
              "Feature-based organization (vs React's component-based) makes parallel development smoother and refactoring safer as the app grows.",
          },
          {
            title: 'Testing Philosophy Differs',
            message:
              "Angular's default Jasmine/Karma feels heavier than React Testing Library. Would prefer Vitest for faster feedback loops in future projects.",
          },
        ],
      },
    },
  ],
  theme: {
    primary: '#DC2626', // Red-600
    gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)', // Red-900 to Red-600
  },
}
