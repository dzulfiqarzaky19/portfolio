import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import {
  RouterProvider,
  createRouter,
  createMemoryHistory,
} from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree,
  history: createMemoryHistory({
    initialEntries: ['/'],
  }),
})

describe('App Integration', () => {
  it('renders home page correctly', async () => {
    render(<RouterProvider router={router} />)

    expect(await screen.findByText(/Featured Projects/i)).toBeInTheDocument()
    expect(await screen.findByText(/Work Experience/i)).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /toggle theme/i }),
    ).toBeInTheDocument()
  })
})
