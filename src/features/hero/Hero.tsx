import { ArrowDownCircleIcon } from 'lucide-react'
import { Section } from '@/components/Section'
import { HERO } from '@/lib/constant/hero.constant'
import { InViewTransition } from '@/components/motion/InViewAnimation'
import { TextWithIntro } from '@/components/motion/TextWithIntro'

const Hero = () => {
  return (
    <Section className="gap-5">
      <InViewTransition>
        <div className="flex justify-center items-center gap-5">
          <TextWithIntro variant="hero" color="primary">
            {HERO.title}
          </TextWithIntro>
        </div>

        <TextWithIntro variant="h1" color="accent">
          {HERO.subTitle}
        </TextWithIntro>

        <TextWithIntro
          variant="lead"
          color="muted"
          className="mx-auto max-w-2xl mb-12"
        >
          {HERO.description}
        </TextWithIntro>

        <TextWithIntro
          asChild
          intent="link"
          color="primary"
          className="inline-flex items-center gap-2 text-lg font-medium"
        >
          <a href="#projects" className="group">
            View My Work
            <ArrowDownCircleIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </TextWithIntro>
      </InViewTransition>
    </Section>
  )
}

export default Hero
