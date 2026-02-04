import { ThemeToggle } from '@/components/ThemeToggle'
import { cn } from '@/lib/cn'

type Props = React.HTMLAttributes<HTMLElement>

export const HomeLayout = ({ className, children, ...rest }: Props) => (
  <main
    role="main"
    className={cn(
      'mx-auto 2xl:max-w-8/10',
      'lg:px-8',
      'py-10 lg:py-20',
      className,
    )}
    {...rest}
  >
    <div className="flex justify-end mb-4">
      <ThemeToggle />
    </div>
    {children}
  </main>
)
