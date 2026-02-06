import React from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/cn'

interface BackButtonProps {
  to?: string
  label?: string
  variant?: 'light' | 'dark'
  className?: string
}

export const BackButton: React.FC<BackButtonProps> = ({
  to = '/',
  label = 'Back to Home',
  variant = 'light',
  className,
}) => {
  return (
    <Link
      to={to}
      className={cn(
        'absolute top-8 left-6 lg:left-8 z-10 flex items-center gap-2 text-sm font-medium transition-colors max-w-fit group',
        variant === 'light'
          ? 'text-white/80 hover:text-white'
          : 'text-[hsl(var(--muted))] hover:text-[hsl(var(--primary))]',
        className,
      )}
    >
      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
      {label}
    </Link>
  )
}
