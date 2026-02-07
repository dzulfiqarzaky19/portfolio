import { motion } from 'motion/react'
import { Text } from './Text'
import { cn } from '@/lib/cn'
import { getLanguageColor } from '@/lib/language-colors'

interface BrowserFrameProps {
  children?: React.ReactNode
  className?: string
  contentClassName?: string
  searchText?: string
  codeLanguage?: string
  note?: string
  variant?: 'desktop' | 'mobile'
  isHome?: boolean
}

export const BrowserFrame = ({
  children,
  className,
  contentClassName,
  searchText,
  codeLanguage,
  note,
  variant = 'desktop',
  isHome = false,
}: BrowserFrameProps) => {
  const Component = isHome ? 'div' : motion.div
  const motionProps = isHome ? {} : {
    whileHover: { scale: codeLanguage ? 1.5 : 2.0, y: -100, zIndex: 100 },
    transition: { duration: 0.3 }
  }

  return (
    // @ts-ignore - Dynamic component props typing is tricky
    <Component
      {...motionProps}
      className={cn(
        'shadow-2xl overflow-hidden relative group flex flex-col',
        !isHome && 'cursor-zoom-in',
        variant === 'mobile' && 'max-w-xs mx-auto aspect-9/16 rounded-4xl md:rounded-[2.5rem] bg-[hsl(var(--ink))] p-1 md:p-2 ring-1 ring-[hsl(var(--border))]',
        variant === 'desktop' && `w-full ${!codeLanguage ? 'aspect-video' : ''} rounded-xl bg-[hsl(var(--surface-0))] border border-[hsl(var(--border))]`,
        className,
      )}
    >
      {variant === 'desktop' && (
        <div className="flex items-center gap-1.5 px-4 py-3 shrink-0 border-b border-[hsl(var(--border))]">
          <div className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--danger))]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--warning))]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--success))]" />
          
          {searchText && (
            <div className="ml-3 h-5 px-3 bg-[hsl(var(--surface-2))] rounded flex items-center justify-center">
              <span className="text-[10px] text-[hsl(var(--ink-subtle))] font-medium truncate max-w-[150px]">
                {searchText}
              </span>
            </div>
          )}

          {codeLanguage && (
            <div className="ml-auto px-4">
              <span className={cn(
                'text-xs px-2 py-0.5 rounded',
                getLanguageColor(codeLanguage)
              )}>
                {codeLanguage}
              </span>
            </div>
          )}
        </div>
      )}

      <div className={cn(
        'flex-1 overflow-hidden',
        variant === 'mobile' && 'rounded-4xl bg-[hsl(var(--surface-0))]',
        contentClassName,
      )}>
        {children}

        {note && (
          <div className="pt-2 pb-4 text-center">
            <Text variant='caption'>{note}</Text>
          </div>
        )}
      </div>
    </Component>
  )
}
