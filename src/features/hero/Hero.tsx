import { ArrowDownCircleIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Section } from '@/components/Section'
import { Text } from '@/components/ui/Text'
import { HERO } from '@/lib/constant/hero.constant'

const container = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { delayChildren: delay, staggerChildren: 0.08 },
  }),
}

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
}

const Hero = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.section
      variants={container}
      initial={prefersReducedMotion ? undefined : 'hidden'}
      animate={prefersReducedMotion ? undefined : 'visible'}
      custom={0.1}
    >
      <Section className="gap-5">
        <motion.div variants={item}>
          <Text variant="hero" color="primary">
            {HERO.title}
          </Text>
        </motion.div>

        <motion.div variants={item}>
          <Text variant="h1" color="accent">
            {HERO.subTitle}
          </Text>
        </motion.div>

        <motion.div variants={item}>
          <Text
            variant="lead"
            color="muted"
            className="mx-auto max-w-2xl mb-12"
          >
            {HERO.description}
          </Text>
        </motion.div>

        <motion.div variants={item}>
          <Text
            asChild
            intent="link"
            color="primary"
            className="inline-flex items-center gap-2 text-lg font-medium"
          >
            <motion.a
              href="#projects"
              className="group"
              whileHover={{ x: 1 }}
              whileTap={{ scale: 0.98 }}
            >
              View My Work
              <ArrowDownCircleIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </Text>
        </motion.div>
      </Section>
    </motion.section>
  )
}

export default Hero
