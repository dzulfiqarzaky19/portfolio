import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Text } from '../ui/Text'
import type { TextProps } from '../ui/Text'
import { cn } from '@/lib/cn'

interface ITextIntroProps extends TextProps {
  origin?: 'left' | 'right'
  introColor?: string
}

export const TextWithIntro = ({
  children,
  origin = 'left',
  introColor = 'var(--color--slider)',
  asChild,
  className,
  ...rest
}: ITextIntroProps) => {
  const [lineCount, setLineCount] = useState(1)
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const el = textRef.current
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 28
    const height = el.offsetHeight
    const lines = Math.max(1, Math.round(height / lineHeight))

    setLineCount(lines)
  }, [children])

  const originX = useMemo(
    () => ({
      initial: origin === 'left' ? 0 : 1,
      whileInView: origin === 'left' ? [0, 0, 1, 1] : [1, 1, 0, 0],
    }),
    [origin],
  )

  const lines = Array.isArray(children)
    ? children
    : typeof children === 'string'
      ? children.split('\n').filter(Boolean)
      : ['']

  console.log(introColor, 999)

  return (
    <span className="relative w-fit inline-block leading-none">
      <Text
        asChild={asChild}
        ref={textRef}
        className={`relative z-10 block whitespace-pre-line ${className}`}
        {...rest}
      >
        {asChild
          ? children
          : lines.map((line, i) => (
              <motion.span
                key={i}
                className="block"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.2 + 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true }}
              >
                {line || '\u00A0'}
              </motion.span>
            ))}
      </Text>

      {Array.from({ length: lineCount }, (_, i) => (
        <motion.div
          key={`${children}-${i}`}
          className={cn(
            `absolute inset-0 z-10 bg-[hsl(${introColor})] pointer-events-none will-change-transform`,
          )}
          initial={{ scaleX: 0, originX: originX.initial }}
          whileInView={{ scaleX: [0, 1, 1, 0], originX: originX.whileInView }}
          transition={{
            duration: 0.6,
            times: [0, 0.5, 0.5001, 1],
            ease: [
              [0.22, 1, 0.36, 1],
              [0.22, 1, 0.36, 1],
              [0.22, 1, 0.36, 1],
            ],
            delay: i * 0.2,
          }}
          viewport={{ amount: 0.6, once: true }}
          style={{
            top: `calc(${i} * (100% / ${lineCount}))`,
            height: `${100 / lineCount}%`,
          }}
        />
      ))}
    </span>
  )
}
