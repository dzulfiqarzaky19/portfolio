import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { FadeInUp } from './FadeInUp'

// Mock motion to avoid animation issues in tests
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => (
      <div className={className} data-testid="fade-in-up" {...props}>
        {children}
      </div>
    ),
  },
}))

describe('FadeInUp', () => {
  it('renders children correctly', () => {
    render(
      <FadeInUp>
        <span>Test Content</span>
      </FadeInUp>,
    )

    expect(screen.getByText('Test Content')).toBeTruthy()
  })

  it('passes className to the container', () => {
    render(
      <FadeInUp className="custom-class">
        <span>Test</span>
      </FadeInUp>,
    )

    const element = screen.getByTestId('fade-in-up')
    expect(element.className).toContain('custom-class')
  })

  it('accepts custom delay and distance props', () => {
    // Note: since we mock motion, we can't easily check the animation props being passed without checking the component implementation details
    // But we can check that it renders without error
    render(
      <FadeInUp delay={0.5} distance={50}>
        <span>Test</span>
      </FadeInUp>,
    )
    expect(screen.getByText('Test')).toBeTruthy()
  })
})
