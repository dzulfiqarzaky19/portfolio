import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import { NotFound } from './NotFound'

const rootRoute = createRootRoute({
  component: Outlet,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: NotFound,
})

const routeTree = rootRoute.addChildren([indexRoute])

const router = createRouter({
  routeTree,
  history: createMemoryHistory({
    initialEntries: ['/'],
  }),
})

describe('NotFound', () => {
  it('renders 404 message', async () => {
    render(<RouterProvider router={router} />)
    expect(await screen.findByText(/404 - Page Not Found/i)).toBeInTheDocument()
    expect(
      screen.getByText(/Oops! The page you are looking for does not exist./i),
    ).toBeInTheDocument()
  })

  it('renders link to home', async () => {
    render(<RouterProvider router={router} />)
    const link = await screen.findByRole('link', { name: /go back home/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })
})
