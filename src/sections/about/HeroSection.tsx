// ASSETS
import profileImage from "@/assets/about-me/linus.png"
import profileImage2 from "@/assets/gallery/zyl/uwu.png"
import profileImage3 from "@/assets/gallery/zyl/ak mw dua.png"
import profileImage4 from "@/assets/gallery/zyl/skyscrapper.png"

// COMPONENT
import useClientVisibility from "@/hooks/useClientVisibility"
import InteractiveCardStatic, { InteractiveCard } from "@/components/InteractiveCard"
import type { BaseComponentProps } from "@/lib/BaseComponentProps"
import { Fragment, useLayoutEffect, useRef, useState, type ReactNode } from "react"
import { twMerge } from "tailwind-merge"
import { useWindowWidth } from "@/lib/useWIndowWitdh"
import Loading from "@/components/Loading"
import ScrollingImage from "@/components/ScrollingImage"

export default function HeroSection() {
    const rootRef = useRef<HTMLDivElement | null>(null)
    const isVisible = useClientVisibility(rootRef)

    return (
        <section ref={rootRef} className="p-8 w-full">
            <div className="grid grid-cols-2 gap-2 lg:max-w-4xl mx-auto">
                <div className="relative border-rainbow-radial border-4 rounded-lg overflow-hidden flex items-center justify-center p-4">
                    <AnimatedText text="About Me" className="text-4xl sm:text-7xl lg:text-8xl font-black" />
                </div>
                
                <div className="overflow-hidden rounded-lg">
                    <ScrollingImage isActivated={isVisible} images={[profileImage, profileImage2, profileImage3, profileImage4]} />
                </div>

                <div className="relative col-span-2 border-4 border-dashed rounded-lg py-4 overflow-hidden">
                    <CarouselText amount={6}>
                        <div className="text-2xl font-black">
                            ZYL
                        </div>
                    </CarouselText>
                </div>

                <div>
                    <InteractiveCardStatic className="h-full" />
                </div>

                <div>
                    <InteractiveCard className="h-full">
                        <div className="p-8 flex flex-col items-center gap-4">
                            <Loading isActivated />
                        </div>
                    </InteractiveCard>
                </div>
            </div>
        </section>
    )
}

interface AnimatedTextProps extends BaseComponentProps {
    text : string
}

function AnimatedText({ text, className, overrideClassName, ...rest } : AnimatedTextProps) {
    return (
        <span className={overrideClassName ? className : twMerge("bg-rainbow-radial bg-clip-text text-transparent", className)} {...rest}>
            {text}
        </span>
    )
}

function getDuration(width: number) {
  const [minW, maxW] = [480, 1920];
  const [minD, maxD] = [6, 15];

  const t = Math.min(1, Math.max(0, (width - minW) / (maxW - minW)));
  return minD + t * (maxD - minD);
}
interface CarouselTextProps extends BaseComponentProps {
    amount : number
    children : ReactNode
}

function CarouselText({ amount, className, overrideClassName, children, ...rest }: CarouselTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const setRef = useRef<HTMLDivElement>(null)
  const [repeat, setRepeat] = useState(1)
  const width = useWindowWidth()
  const duration = getDuration(width)

  useLayoutEffect(() => {
    const container = containerRef.current
    const set = setRef.current
    if (!container || !set) return

    const update = () =>
      setRepeat(Math.max(1, Math.ceil(container.clientWidth / set.offsetWidth)))

    update()
    const ro = new ResizeObserver(update)
    ro.observe(container)
    ro.observe(set)

    return () => ro.disconnect()
  }, [amount, children]);

  return (
    <div
      ref={containerRef}
      className={overrideClassName ? className : twMerge("flex overflow-hidden w-screen", className)}
      {...rest}
    >
      {Array.from({ length: 2 }).map((_, i) => (
        <div
            style={{"--duration" : `${duration}s`} as React.CSSProperties}
            key={i}
            aria-hidden={i === 1}
            className="flex shrink-0 animate-[infinite-carousel_var(--duration)_linear_infinite]"
        >
          {Array.from({ length: repeat }).map((_, r) => (
            <div
              key={r}
              ref={i === 0 && r === 0 ? setRef : undefined}
              className="flex shrink-0 items-center gap-8 pr-8"
            >
              {Array.from({ length: amount }).map((_, j) => (
                <Fragment key={j}>{children}</Fragment>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}