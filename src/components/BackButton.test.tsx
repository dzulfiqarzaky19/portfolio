import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { BackButton } from './BackButton'

// Mock Link from @tanstack/react-router
vi.mock('@tanstack/react-router', () => ({
  Link: ({ to, children, className, ...props }: any) => (
    <a href={to} className={className} data-testid="back-button" {...props}>
      {children}
    </a>
  ),
}))

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  ArrowLeft: ({ className }: any) => (
    <span className={`icon-arrow-left ${className}`} />
  ),
}))

describe('BackButton', () => {
  it('renders correctly with default props', () => {
    render(<BackButton />)
    const link = screen.getByTestId('back-button')

    expect(link.getAttribute('href')).toBe('/')
    expect(screen.getByText('Back to Home')).toBeTruthy()
  })

  it('renders with custom to and label', () => {
    render(<BackButton to="/projects" label="Back to Projects" />)
    const link = screen.getByTestId('back-button')

    expect(link.getAttribute('href')).toBe('/projects')
    expect(screen.getByText('Back to Projects')).toBeTruthy()
  })

  it('applies light variant styles by default', () => {
    render(<BackButton />)
    const link = screen.getByTestId('back-button')
    expect(link.className).toContain('text-white/80')
  })

  it('applies dark variant styles', () => {
    render(<BackButton variant="dark" />)
    const link = screen.getByTestId('back-button')
    expect(link.className).toContain('text-[hsl(var(--muted))]')
  })
})
