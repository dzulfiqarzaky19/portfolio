import { motion } from 'motion/react'
import { cn } from '@/lib/cn'

type Props = {
  children: React.ReactNode
  aspectRatio?: '16/9' | '9/16'
  className?: string
  ref?: React.Ref<HTMLDivElement> | undefined
}

export function DeviceFrame({
  children,
  aspectRatio = '16/9',
  className,
  ref,
}: Props) {
  return (
    <>
      <div ref={ref} className="block sm:hidden">
        <div className="perspective-distant">
          <div className="relative mx-auto w-full max-w-52 preserve-3d transition-transform duration-500 group-hover:rotate-y-6 group-hover:scale-105">
            <div className="relative rounded-3xl bg-black p-2 shadow-2xl ring-1 ring-white/10">
              <div className="overflow-hidden rounded-3xl bg-white">
                <div
                  className="relative w-full"
                  style={{ aspectRatio: '8/16' }}
                >
                  {children}
                </div>
              </div>
              <div className="absolute left-1/2 top-0 h-7 w-20 -translate-x-1/2 translate-y-1 rounded-b-xl bg-black" />
            </div>
          </div>
        </div>
      </div>

      {aspectRatio === '16/9' && (
        <div ref={ref} className="hidden sm:block">
          <div className={cn('perspective-distant', className)}>
            <div className="relative mx-auto w-full max-w-3xl preserve-3d transition-transform duration-500 group-hover:rotate-y-6 group-hover:scale-105">
              <div className="relative rounded-2xl bg-linear-to-b from-gray-800 to-gray-900 p-3 shadow-2xl ring-1 ring-white/10">
                <div className="overflow-hidden rounded-xl bg-black">
                  <div
                    className="relative w-full"
                    style={{ aspectRatio: '16/9' }}
                  >
                    {children}
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-8 rounded-b-2xl bg-linear-to-t from-gray-900 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      )}

      {aspectRatio === '9/16' && (
        <div ref={ref} className="hidden sm:block">
          <div className="perspective-distant">
            <div className="mx-auto w-full max-w-72 relative rounded-3xl bg-black p-2 shadow-2xl ring-1 ring-white/10">
              <div className="overflow-hidden rounded-3xl bg-white">
                <div
                  className="relative w-full"
                  style={{ aspectRatio: '8/16' }}
                >
                  {children}
                </div>
              </div>
              <div className="absolute left-1/2 top-0 h-7 w-20 -translate-x-1/2 translate-y-1 rounded-b-xl bg-black" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export const MotionDeviceFrame = motion(DeviceFrame)
