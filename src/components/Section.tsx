import { cn } from '@/lib/cn'

type Props = React.HTMLAttributes<HTMLElement>

export const Section = ({ children, className }: Props) => (
  <section
    className={cn(
      'py-16 sm:py-20 lg:py-24 flex min-h-dvh flex-col items-center justify-center text-center 2xl:px-5',
      className,
    )}
  >
    {children}
  </section>
)
