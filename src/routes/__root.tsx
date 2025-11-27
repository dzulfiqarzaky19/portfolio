import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import ReactLenis from 'lenis/react'
import { NotFound } from '@/components/NotFound'

export const Route = createRootRoute({
  component: () => (
    <>
      <ReactLenis
        root
        options={{
          allowNestedScroll: true,
          orientation: 'vertical',
        }}
      />
      <Outlet />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
  notFoundComponent: NotFound,
})
