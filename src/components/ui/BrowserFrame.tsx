import React from 'react'
import { cn } from '@/lib/cn'

interface BrowserFrameProps {
  children: React.ReactNode
  className?: string
  contentClassName?: string
}

export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  children,
  className,
  contentClassName,
}) => {
  return (
    <div
      className={cn(
        'rounded-xl bg-[hsl(var(--surface-0))] shadow-2xl border border-[hsl(var(--border))] overflow-hidden relative group',
        className,
      )}
    >
      <div className="absolute top-4 left-4 flex gap-2 z-10">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
      </div>
      <div className={cn('pt-10 pl-2 h-full', contentClassName)}>
        {children}
      </div>
    </div>
  )
}
