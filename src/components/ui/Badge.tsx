import React from 'react'
import { cn } from '@/lib/cn'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'white' | 'custom'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className,
}) => {
  const variants = {
    primary:
      'bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] border border-[hsl(var(--primary)/0.2)]',
    white: 'bg-white/10 text-white/90 border border-white/20 backdrop-blur-sm',
    custom: '',
  }

  return (
    <span
      className={cn(
        'inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-sm',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
