// COMPONENTS
import { animate, scrambleText } from "animejs"
import { useEffect, useRef } from "react"
import HeroSection from "@/sections/about/HeroSections"

export default function About() {
    const titleRef = useRef<HTMLHeadingElement | null>(null)

    useEffect(() => {
        if (!titleRef.current) return

        animate(titleRef.current, {
            innerHTML: scrambleText({
                duration : 1200
            }),
            loop : true,
            loopDelay : 1200,
        })
    }, [])

    return (
        <>
        <HeroSection />
        </>
    )
}