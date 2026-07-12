import { animate } from "animejs"
import { useEffect, useRef } from "react"

export interface twoPanelsProps {
    mainPart : React.ReactNode
    secondPart : React.ReactNode
    isFlipped? : boolean,
    isFlippedAlternate? : boolean
    sectionClassName? : string,
    isOverwriteClass? : boolean
}

export default function TwoPanels({ mainPart, secondPart, isFlipped, isFlippedAlternate, sectionClassName, isOverwriteClass} : twoPanelsProps) {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!sectionRef) {
            return
        }

        animate(sectionRef.current?.children!, {
            x : (_el, i) => [i == 0 ? "-100vw" : "100vw", 0],
            duration : 1200,
            ease : "outQuart"
        })
    }, [])

    return (
        <section ref={sectionRef} className={isOverwriteClass ? sectionClassName : ("flex " + (isFlipped ? "lg:flex-row-reverse " : "lg:flex-row ") + (isFlippedAlternate ? "flex-col-reverse " : "flex-col ") + (sectionClassName ?? ""))}>
            <div className="flex-1">
                {mainPart}
            </div>

            <div className="flex-1">
                {secondPart}
            </div>
        </section>
    )
}