import { cva } from 'class-variance-authority'
import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { motion } from 'motion/react'
import type { ElementType } from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const scale = {
  hero: 'text-[clamp(3rem,8vw,6rem)] leading-[1.1]',
  display: 'text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.1]',
  h1: 'text-[clamp(2rem,5vw,3rem)] leading-[1.15]',
  h2: 'text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.2]',
  h3: 'text-[clamp(1.5rem,3.5vw,2rem)] leading-[1.25]',
  h4: 'text-[clamp(1.25rem,3vw,1.75rem)] leading-[1.3]',
  lead: 'text-[clamp(1.125rem,2.5vw,1.375rem)] leading-[1.55]',
  body: 'text-[1rem] leading-[1.6]',
  bodyL: 'text-[1.125rem] leading-[1.65]',
  label:
    'text-[0.75rem] leading-[1.4] tracking-[0.08em] uppercase font-semibold',
  caption: 'text-[0.6875rem] leading-[1.35] tracking-[0.04em]',
} as const

const fonts = {
  display: '[font-family:var(--font-display)]',
  sans: '[font-family:var(--font-sans)]',
  mono: '[font-family:var(--font-mono)]',
} as const

const typography = cva('', {
  variants: {
    variant: {
      hero: cn(scale.hero, 'font-bold tracking-tight'),
      display: cn(scale.display, 'font-bold'),
      h1: cn(scale.h1, 'font-bold'),
      h2: cn(scale.h2, 'font-bold'),
      h3: cn(scale.h3, 'font-semibold'),
      h4: cn(scale.h4, 'font-semibold'),
      lead: cn(scale.lead, 'text-[hsl(var(--muted))]'),
      body: cn(scale.body, 'text-[hsl(var(--ink))]'),
      bodyL: cn(scale.bodyL, 'text-[hsl(var(--ink))]'),
      label: cn(scale.label, 'text-[hsl(var(--muted))]'),
      caption: cn(scale.caption, 'text-[hsl(var(--muted))]'),
    },

    weight: {
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },

    color: {
      default: 'text-[hsl(var(--ink))]',
      muted: 'text-[hsl(var(--muted))]',
      primary: 'text-[hsl(var(--primary))]',
      accent: 'text-[hsl(var(--accent))]',
      success: 'text-[hsl(var(--success))]',
      danger: 'text-[hsl(var(--danger))]',
      surface: 'text-[hsl(var(--surface-2))]',
    },

    intent: {
      link: 'underline underline-offset-4 [text-decoration-color:hsl(var(--muted)/0.35)] hover:[text-decoration-color:hsl(var(--primary))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus))] focus-visible:ring-offset-2 transition-colors hover:text-[hsl(var(--primary))] cursor-pointer',
      button:
        'inline-flex items-center gap-2 font-medium hover:text-[hsl(var(--primary))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus))] focus-visible:ring-offset-2',
    },

    align: { left: 'text-left', center: 'text-center', right: 'text-right' },
    truncate: { true: 'truncate' },
    family: fonts,
  },
  compoundVariants: [
    { intent: 'link', color: 'primary', class: 'text-[hsl(var(--primary))]' },
    {
      intent: 'link',
      color: ['default', 'muted'],
      class: 'text-[hsl(var(--muted))]',
    },
  ],
  defaultVariants: {
    variant: 'body',
    color: 'default',
  },
})

type TypographyVariants = VariantProps<typeof typography>

type AsProp<T extends ElementType> = {
  as?: T
  asChild?: boolean
}

export type TextProps<T extends ElementType = 'p'> = TypographyVariants &
  AsProp<T> &
  React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode
    className?: string
  }

const defaultTag = {
  hero: 'h1',
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  lead: 'p',
  body: 'p',
  bodyL: 'p',
  label: 'span',
  caption: 'small',
} as const

export const Text = forwardRef(
  <T extends ElementType = 'p'>(
    {
      asChild = false,
      variant = 'body',
      intent,
      color,
      align,
      family,
      truncate,
      className,
      children,
      ...rest
    }: TextProps<T>,
    ref?: React.Ref<any>,
  ) => {
    const defaultVariant = variant ?? 'body'

    const Comp = asChild ? Slot : defaultTag[defaultVariant]

    return (
      <Comp
        ref={ref}
        className={cn(
          typography({
            variant,
            intent,
            color,
            align,
            family,
            truncate,
          }),
          className,
        )}
        {...rest}
      >
        {children}
      </Comp>
    )
  },
)

Text.displayName = 'Text'

export const MotionText = motion(Text)
