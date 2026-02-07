import type { ProjectSection as IProjectSection } from '@/lib/types/project'
import { cn } from "@/lib/cn";
import { Text } from "@/components/ui/Text";

export const ContentInner = ({ section }: { section: IProjectSection }) => (
  <div
    className={cn(
      'w-full h-full',
      section.codeSnippet
        ? ''
        : 'flex items-center justify-center',
    )}
  >
    {section.codeSnippet ? (
      <div className="w-full bg-[#1e1e1e] p-6 text-left">
        <pre className="font-mono text-xs sm:text-sm text-teal-500 whitespace-pre-wrap break-all">
          <code>{section.codeSnippet}</code>
        </pre>
      </div>
    ) : section.image ? (
      <img
        src={section.image}
        alt={section.imageAlt || section.heading}
        className="w-full h-full object-cover object-top"
      />
    ) : (
      <div className="w-full h-full bg-linear-to-br from-[hsl(var(--primary)/0.2)] to-[hsl(var(--accent)/0.2)] flex items-center justify-center">
        
        <Text color="muted" className="text-center px-4">
          Visualizing: {section.heading}
        </Text>
      </div>
    )}
  </div>
)
