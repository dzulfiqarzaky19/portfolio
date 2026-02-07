import { ThemeToggle } from '@/components/ThemeToggle'
import { cn } from '@/lib/cn'

type Props = React.HTMLAttributes<HTMLElement>

export const HomeLayout = ({ className, children, ...rest }: Props) => (
  <main
    role="main"
    className={cn(
      'lg:px-8',
      className,
    )}
    {...rest}
  >
    <div className="flex justify-end mt-4">
      <ThemeToggle />
    </div>
    {children}
  </main>
)
