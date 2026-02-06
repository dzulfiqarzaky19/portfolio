import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders children correctly', () => {
    render(<Badge>Test Badge</Badge>)
    expect(screen.getByText('Test Badge')).toBeTruthy()
  })

  it('applies primary variant by default', () => {
    render(<Badge>Primary</Badge>)
    const badge = screen.getByText('Primary')
    expect(badge.className).toContain('bg-[hsl(var(--primary)/0.1)]')
    expect(badge.className).toContain('text-[hsl(var(--primary))]')
  })

  it('applies white variant correctly', () => {
    render(<Badge variant="white">White</Badge>)
    const badge = screen.getByText('White')
    expect(badge.className).toContain('bg-white/10')
    expect(badge.className).toContain('text-white/90')
  })

  it('merges custom className', () => {
    render(<Badge className="custom-class">Custom</Badge>)
    const badge = screen.getByText('Custom')
    expect(badge.className).toContain('custom-class')
  })
})
