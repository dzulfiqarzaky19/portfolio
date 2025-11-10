import { DeviceFrame } from '@/components/DeviceFrame'
import { InViewTransition } from '@/components/motion/InViewAnimation'
import { TextWithIntro } from '@/components/motion/TextWithIntro'
import { Section } from '@/components/Section'
import { cn } from '@/lib/cn'
import { PROJECTS } from '@/lib/constant/project.constant'

const Project = () => {
  return (
    <Section>
      <TextWithIntro variant="hero" color="primary">
        Featured Projects.
      </TextWithIntro>

      <div
        className="grid w-full grid-cols-1 lg:grid-cols-2 
            [&>*:nth-child(3n)]:lg:col-span-2"
      >
        {PROJECTS.map((p, i) => (
          <article
            key={i}
            className={cn(
              'relative isolate overflow-hidden',
              'flex items-center justify-center',
              'px-6 sm:px-10 lg:px-14 py-14 lg:py-20',
              i % 2 === 0
                ? 'bg-[hsl(var(--primary))]'
                : 'bg-[hsl(var(--accent))]',
            )}
          >
            <div
              className="pointer-events-none absolute inset-0 -z-10 opacity-30"
              style={{
                background:
                  'radial-gradient(1200px 600px at 20% 10%, rgba(255,255,255,.2), transparent 60%)',
              }}
            />

            <div className="mx-auto w-full max-w-4xl grid gap-8">
              <InViewTransition>
                <TextWithIntro
                  variant="h2"
                  color="surface"
                  className="text-center"
                >
                  {p.title}
                </TextWithIntro>

                <DeviceFrame aspectRatio={(i + 1) % 3 === 0 ? '16/9' : '9/16'}>
                  <img
                    src={p.imgUrl}
                    alt={`${p.title} mobile app`}
                    className="h-full w-full object-top object-cover"
                    loading="lazy"
                  />
                </DeviceFrame>

                <TextWithIntro variant="lead" color="surface">
                  {p.description}
                </TextWithIntro>

                <div className="text-center">
                  <a className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-white ring-1 ring-white/20 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus))]">
                    View Case Study
                    <span aria-hidden>↗</span>
                  </a>
                </div>
              </InViewTransition>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

export default Project
