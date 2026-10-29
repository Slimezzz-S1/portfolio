import { animate, scrambleText, splitText, stagger } from "animejs"
import { useEffect, useRef } from "react"
import WIPPage from "./WIPPage"

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
        <WIPPage />
    )
}