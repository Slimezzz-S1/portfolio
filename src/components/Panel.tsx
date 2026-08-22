import { animate } from "animejs"
import { useEffect, useRef, useState } from "react"

interface panelProps {
    children : React.ReactNode
    isManualVisible? : boolean
    isCustomAnimation? : boolean
    useOwnObserver? : boolean
    threshold? : number | number[]
    className? : string
    style? : React.CSSProperties
    onVisible? : () => void
}

export default function Panel({ children, isManualVisible, isCustomAnimation, useOwnObserver, threshold, style, className, onVisible } : panelProps) {
    const sectRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(isManualVisible ?? false)
    
    useEffect(() => {
        if (!sectRef) return
        if (useOwnObserver) return

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)

                    onVisible?.()

                    observer.unobserve(sectRef.current!)
                }
            })
        }, {
            rootMargin : "0px",
            threshold : threshold ?? 0.5
        })

        observer.observe(sectRef.current!)

        return () => observer.disconnect()

    }, [sectRef])

    useEffect(() => {
        if (!isVisible) return
        if (isCustomAnimation) return

        animate(sectRef.current!, {
            opacity : [
                "0",
                "1"
            ],
            y : [
                "-50%",
                "0"
            ],
            duration : 600
        })

    }, [isVisible])

    return (
        <section style={{...(isCustomAnimation ? {} : {"opacity" : 0}), ...style} as React.CSSProperties} ref={sectRef} className={className ?? ""} children={children} /> 
    )
}