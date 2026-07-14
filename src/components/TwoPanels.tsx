import { animate } from "animejs"
import React, { useEffect, useRef } from "react"

interface basicPanelProps {
    className? : string
    id? : string
    style? : React.CSSProperties
    isCustomAnimation? : boolean
    onVisibleHandle? : () => void
    isOverwriteClass? : boolean
}

export interface twoPanelsProps extends basicPanelProps {
    mainPart : React.ReactNode
    secondPart : React.ReactNode
    isFlipped? : boolean
    isFlippedAlternate? : boolean    
}

export interface onePanelProps extends basicPanelProps {
    children : React.ReactNode
}

export default function TwoPanels({ mainPart, secondPart, isFlipped, isFlippedAlternate, className, isOverwriteClass, style, id, isCustomAnimation} : twoPanelsProps) {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (isCustomAnimation) return

                    animate(sectionRef.current?.children!, {
                        x : (_el, i) => [i == 0 ? "-100vw" : "100vw", 0],
                        duration : 1200,
                        ease : "outQuart"
                    })

                    observer.unobserve(sectionRef.current!)
                }
            })
        })

        observer.observe(sectionRef.current!)

        return () => observer.disconnect()
    }, [])

    return (
        <section ref={sectionRef} className={isOverwriteClass ? className : ("flex " + (isFlipped ? "lg:flex-row-reverse " : "lg:flex-row ") + (isFlippedAlternate ? "flex-col-reverse " : "flex-col ") + (className ?? ""))} style={style ?? {}} id={id}>
            <div className="flex-1">
                {mainPart}
            </div>

            <div className="flex-1">
                {secondPart}
            </div>
        </section>
    )
}

export function Panel({ children, className, id, style, onVisibleHandle, isOverwriteClass, isCustomAnimation} : onePanelProps) {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {

                        onVisibleHandle?.()

                        if (!isCustomAnimation) {
                            animate(sectionRef.current!, {
                                opacity : [0, 1],
                                y: ["10%", "0"],
                                duration : 700
                            })
                        }
                        

                        observer.unobserve(sectionRef.current!)
                    }
                })
            },
            {
                threshold : 0.5
            }
        )

        observer.observe(sectionRef.current!)

        return () => observer.disconnect()
    }, [])

    return (
        <section ref={sectionRef} className={(isCustomAnimation ? "" : "opacity-0 ") + (className ?? "")} style={style ?? {}} id={id}>
            {children}
        </section>
    )
}