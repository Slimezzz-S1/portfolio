// DATA
import { aboutMeData } from "@/lib/data"
import image from "@/assets/images/about-me/linus.png"

// COMPONENTS
import type { BaseComponentProps } from "@/lib/BaseComponentProps"
import useClientVisibility from "@/hooks/useClientVisibility"
import { useEffect, useState, useRef } from "react"
import useTimers from "@/lib/useTimers"
import { twMerge } from "tailwind-merge"
import { animate } from "animejs"
import Button from "@/components/Button"
import { useNavigate } from "react-router"

const data = aboutMeData

const { roles } = data

interface ScrollingRoleProps extends BaseComponentProps {
    isActive? : boolean
}

export default function AboutMeSection() {
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const imageRef = useRef<HTMLImageElement | null>(null)
    const sectRef = useRef<HTMLDivElement | null>(null)
    const isVisible = useClientVisibility(sectRef, { threshold : 0.7 })
    const [isVisibleOnce, setIsVisibleOnce] = useState<boolean>(false)
    const navigate = useNavigate()
    
    useEffect(() => {
        if (isVisible) setIsVisibleOnce(true)
    }, [isVisible])

    useEffect(() => {
        if (!isVisibleOnce || !imageRef.current || !wrapperRef.current) return

        animate(wrapperRef.current!, {
            x : ["100vw", "0"],
            duration : 800,
            onComplete : () => {
                animate(imageRef.current!, {
                    x : ["100%", "0"],
                    duration : 800,
                    ease : "outQuint"
                })
            }
        })
    }, [isVisibleOnce])

    return (
        <section ref={sectRef} className="p-8">
            <div ref={wrapperRef} style={{"transform" : "translateX(100vw)"} as React.CSSProperties} className="flex flex-col md:flex-row justify-between gap-8">
                <div className="flex-1 relative overflow-hidden">
                    <img style={{"transform" : "translateX(100%)"} as React.CSSProperties} ref={imageRef} src={image} alt="" className="rounded-2xl w-full h-full object-cover" />

                    <div className="absolute top-0 left-0 w-full h-full bg-linear-0 md:-bg-linear-90 from-root-bg to-transparent z-10" />
                </div>

                <div className="flex-1 flex flex-col justify-center gap-4">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-center md:text-start">
                        What am I?
                    </h1>

                    <h3 className="text-3xl font-bold">
                        A <ScrollingRole className="font-black" isActive={isVisible && isVisibleOnce} />
                        <span className="whitespace-break-spaces">
                            {"\n"}from Indonesia
                        </span>
                    </h3>

                    <p className="indent-8">
                        A 17 year old self-taught voca student from Indonesia. I mainly focus on create a simple web designs using React, creating simple 3d animation for a hobby, and editing video for fun.
                    </p>

                    <Button text="Know more" className="self-center lg:self-start" onClick={() => navigate("/about")} />
                </div>
            </div>
        </section>
    )
}

function ScrollingRole({ className, overrideClassName, isActive = true, ...rest }: ScrollingRoleProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(2)
    const elementRef = useRef<HTMLDivElement | null>(null)
    const animationsRef = useRef<ReturnType<typeof animate>[]>([])
    const [addTimers, clearTimers] = useTimers()

    const clearAnimations = () => {
        animationsRef.current.forEach((anim) => anim.cancel())
        animationsRef.current = []
    }

    useEffect(() => {
        if (!isActive || !elementRef.current) return () => {
            clearTimers()
            clearAnimations()
        }

        const element = elementRef.current

        const second = () => {
            setCurrentIndex(prev => (prev + 1) % roles.length)

            const timeout = setTimeout(() => {
                const anim = animate(element, {
                    x: ["0", "101%"],
                    duration: data.transitionTime,
                    ease: "outQuint",
                    onComplete: () => {
                        element.style.setProperty("transform", "translateX(-101%)")
                    }
                })
                animationsRef.current.push(anim)
            }, data.delayMid)

            addTimers(timeout)
        }

        const animateTransition = () => {
            const first = animate(element, {
                x: ["-101%", "0"],
                duration: data.transitionTime,
                ease: "outQuint",
                onComplete: second
            })

            animationsRef.current.push(first)
        }

        animateTransition()

        const loop = setInterval(
            animateTransition,
            (data.transitionTime * 2) + data.delay + data.delayMid
        )

        addTimers(loop)

        return () => {
            clearTimers()
            clearAnimations()
            element.style.setProperty("transform", "translateX(-101%)")
        }
    }, [isActive])

    return (
        <span className={overrideClassName ? className : twMerge("relative overflow-hidden inline-block align-bottom rounded-sm", className)} {...rest}>
            <span className="opacity-0">
                {roles.reduce((a, b) => a.length >= b.length ? a : b)}
            </span>

            <span className="absolute top-0 left-0 w-full h-full">
                {roles[currentIndex]}
            </span>

            <div ref={elementRef} style={{"transform" : "translateX(-101%)"} as React.CSSProperties} className="absolute top-0 left-0 w-full h-full bg-accent border-r-16 border-r-light-accent" />
        </span>
    )
}