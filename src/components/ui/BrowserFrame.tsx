import React from 'react'
import { Text } from './Text'
import { cn } from '@/lib/cn'

interface BrowserFrameProps {
  children?: React.ReactNode
  className?: string
  contentClassName?: string
  searchText?: string
  codeLanguage?: string
  note?: string
}

export const BrowserFrame = ({
  children,
  className,
  contentClassName,
  searchText,
  codeLanguage,
  note,
}: BrowserFrameProps) => (
  <div
    className={cn(
      'rounded-xl bg-[hsl(var(--surface-0))] shadow-2xl border border-[hsl(var(--border))] overflow-hidden relative group flex flex-col',
      className,
    )}
  >
    <div className="flex items-center gap-1.5 px-4 py-3 shrink-0">
      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
      <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
      {searchText && (
        <div className="ml-3 h-5 px-3 bg-gray-100 rounded flex items-center justify-center">
          <span className="text-[10px] text-gray-400 font-medium truncate max-w-[150px]">
            {searchText}
          </span>
        </div>
      )}

        {codeLanguage && (
        <div className="ml-auto px-4">
          <span className={cn(
            'text-xs px-2 py-0.5 rounded',
            codeLanguage === 'JavaScript' 
              ? 'bg-yellow-100 text-yellow-700' 
              : 'bg-blue-100 text-blue-700',
          )}>
            {codeLanguage}
          </span>
        </div>
      )}
    </div>
    <div className={cn('flex-1', contentClassName)}>
    
      {children}

      {note && (
        <div className="pt-2 pb-4 text-center">
          <Text variant='caption'>{note}</Text>
        </div>
      )}
    </div>
  </div>
)

