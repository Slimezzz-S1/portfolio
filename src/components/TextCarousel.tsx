import useClientVisibility from "@/hooks/useClientVisibility"
import type { BaseComponentProps } from "@/lib/BaseComponentProps"
import useTimers from "@/lib/useTimers"
import React, { useEffect, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"

interface TextCarouselProps extends Omit<BaseComponentProps, "overrideStyle"> {
    texts : string[]
}

export default function TextCarousel({ texts, className, style, overrideClassName, ...rest } : TextCarouselProps) {
    const rootRef = useRef<HTMLDivElement | null>(null)
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const isVisible = useClientVisibility(rootRef, {
        threshold : 0.6
    })
    const [addTimer, clearTimers] = useTimers()

    useEffect(() => {
        if (!isVisible) return () => {
            clearTimers()
        }

        const increment = () => {
            setCurrentIndex(index => index + 1)
        }

        const interval = setInterval(() => {
            increment()
        }, 900)

        addTimer(interval)

        return () => {
            clearTimers()
        }
    }, [isVisible])

    return (
        <div ref={rootRef} style={style} className={overrideClassName ? className : twMerge("relative border-y-2 py-8 border-dashed overflow-hidden", className)} {...rest}>
            <div className="relative text-4xl font-bold text-center">
                <div className="opacity-0"> {texts[0]} </div>
                <Texts texts={texts} currentIndex={currentIndex} />
            </div>

            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-root-bg via-transparent to-root-bg pointer-events-none" />
        </div>
    )
}

interface TextsProps extends BaseComponentProps {
    texts : string[]
    currentIndex : number
}

function Texts({ texts, currentIndex }: TextsProps) {
    const n = texts.length
    const prev = useRef<number[]>([])

    const PEEK = 1
    const mod = (x: number, m: number) => ((x % m) + m) % m

    const positions = [0, 1].map((k) => {
        const lo = -n - PEEK
        return mod(k * n - currentIndex - lo, 2 * n) + lo
    })

    useEffect(() => {
        prev.current = positions
    })

    return (
        <>
            {positions.map((pos, k) => (
                <div
                    key={k}
                    aria-hidden={k === 1}
                    style={{ "--y": `${pos * 100}%` } as React.CSSProperties}
                    className={twMerge(
                        "absolute top-0 left-0 w-full h-full translate-y-(--y) transition-transform",
                        Math.abs(pos - (prev.current[k] ?? pos)) > n && "transition-none"
                    )}
                >
                    {texts.map((text, index) => (
                        <div key={index}>{text}</div>
                    ))}
                </div>
            ))}
        </>
    )
}