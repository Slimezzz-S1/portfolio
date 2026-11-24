import { useState, useEffect, useRef, type ReactNode, type ReactElement } from "react"
import { animate, utils } from "animejs"
import type { BaseComponentProps } from "@/lib/BaseComponentProps"
import useMergedRefs from "@/lib/useMergedRefs"
import { twMerge } from "tailwind-merge"

interface InteractiveCardProps extends BaseComponentProps {
    children : ReactElement
}

export function InteractiveCard({ children, className, overrideClassName, ref, onMouseEnter, onMouseLeave, ...rest } : InteractiveCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const cardRootRef = useRef<HTMLDivElement>(null)
    const [isHovering, setIsHovering] = useState<boolean>(false)

    useEffect(() => {
        if (!isHovering || !cardRef.current || !cardRootRef.current) return
        
        const card = cardRef.current
        const cardRoot = cardRootRef.current

        const mouseEvent = (e : MouseEvent) => {
            const {left, top, width, height} = cardRoot.getBoundingClientRect()

            const mouseX = e.clientX - left - width / 2
            const mouseY = e.clientY - top - height / 2

            const mousePercentX = mouseX / ( width / 2 )
            const mousePercentY = mouseY / ( height / 2 )

            const maxTilt = 60

            animate(card, {
                rotateX : mousePercentY * maxTilt * -1,
                rotateY : mousePercentX * maxTilt,
                rotateZ : mousePercentX * mousePercentY * 45,
                x: mousePercentX * 50,
                y: mousePercentY * 50,
                z: (Math.abs(mousePercentX) * 30) + (Math.abs(mousePercentY) * 30),
                duration : 200,
                ease : "out(3)",
                composition : "replace"
            })
        }

        cardRoot.addEventListener("mousemove", mouseEvent)

        return () => {
            cardRoot.removeEventListener("mousemove", mouseEvent)

            utils.remove(cardRoot)

            animate(card, {
                rotateX: 0,
                rotateY: 0,
                rotateZ : 0,
                x: 0,
                y: 0,
                z: 0,
                duration: 200,
                ease: 'out(3)',
            })

        }
    }, [isHovering])

    return (
        <div
            ref={useMergedRefs([cardRootRef, ref])}
            onMouseEnter={(e) => {
                setIsHovering(true)
                onMouseEnter?.(e)
            }}
            onMouseLeave={(e) => {
                setIsHovering(false)
                onMouseLeave?.(e)
            }}
            className={overrideClassName ? className : twMerge("perspective-midrange w-full max-w-2xl", className)}
            {...rest}
        >
            <div
                style={{"--z" : isHovering ? "-30px" : "-1px"} as React.CSSProperties}
                ref={cardRef}
                className="relative w-full bg-linear-30 rounded-2xl transform-3d transition-transform duration-100 ease-out flex"
            >
                <div style={{"--z" : isHovering ? "0px" : "0"} as React.CSSProperties} className="rounded-[inherit] w-full border-4 overflow-hidden translate-z-(--z) transition-transform flex flex-col items-center justify-center">
                    {children}
                </div>

                <div style={{"--z" : isHovering ? "30px" : "-1px"} as React.CSSProperties} className="absolute top-0 left-0 w-full h-full rounded-[inherit] border-4 transition-transform translate-z-(--z)" />

                <div style={{"--z" : isHovering ? "60px" : "-1px"} as React.CSSProperties} className="absolute top-0 left-0 w-full h-full rounded-[inherit] border-4 transition-transform translate-z-(--z)" />
            </div>
        </div>
    )
}

interface InteractiveCardStaticProps extends BaseComponentProps {}

export default function InteractiveCardStatic({ className, overrideClassName, ref, onMouseEnter, onMouseLeave } : InteractiveCardStaticProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const cardRootRef = useRef<HTMLDivElement>(null)
    const [cardText, setCardText] = useState<string>("0.00 0.00")
    const [isHovering, setIsHovering] = useState<boolean>(false)

    useEffect(() => {
        if (!isHovering || !cardRef.current || !cardRootRef.current) return
        
        const card = cardRef.current
        const cardRoot = cardRootRef.current

        const mouseEvent = (e : MouseEvent) => {
            const {left, top, width, height} = cardRoot.getBoundingClientRect()

            const mouseX = e.clientX - left - width / 2
            const mouseY = e.clientY - top - height / 2

            const mousePercentX = mouseX / ( width / 2 )
            const mousePercentY = mouseY / ( height / 2 )

            const maxTilt = 60

            animate(card, {
                rotateX : mousePercentY * maxTilt * -1,
                rotateY : mousePercentX * maxTilt,
                rotateZ : mousePercentX * mousePercentY * 45,
                x: mousePercentX * 50,
                y: mousePercentY * 50,
                z: (Math.abs(mousePercentX) * 30) + (Math.abs(mousePercentY) * 30),
                duration : 200,
                ease : "out(3)",
                composition : "replace"
            })

            setCardText(`${mousePercentX.toFixed(2)} ${mousePercentY.toFixed(2)}`)
        }

        cardRoot.addEventListener("mousemove", mouseEvent)

        return () => {
            cardRoot.removeEventListener("mousemove", mouseEvent)

            utils.remove(cardRoot)

            animate(card, {
                rotateX: 0,
                rotateY: 0,
                rotateZ : 0,
                x: 0,
                y: 0,
                z: 0,
                duration: 200,
                ease: 'out(3)',
            })
            

            setCardText("0.00 0.00")
        }
    }, [isHovering])

    return (
        <div
            ref={useMergedRefs([cardRootRef, ref])}
            onMouseEnter={(e) => {
                setIsHovering(true)
                onMouseEnter?.(e)
            }}
            onMouseLeave={(e) => {
                setIsHovering(false)
                onMouseLeave?.(e)
            }}
            className={overrideClassName ? className : twMerge("perspective-midrange w-full max-w-2xl", className)}
        >
            <div
                style={{"--z" : isHovering ? "-30px" : "-1px"} as React.CSSProperties}
                ref={cardRef}
                className="relative w-full h-full bg-linear-30 from-blue-600 to-green-300 rounded-2xl transform-3d transition-transform duration-100 ease-out flex
                "
            >
                <div style={{"--z" : isHovering ? "-30px" : "-1px"} as React.CSSProperties} className="absolute top-0 left-0 w-full h-full rounded-[inherit] bg-green-300 transition-transform translate-z-(--z)" />

                <div style={{"--z" : isHovering ? "-60px" : "-1px"} as React.CSSProperties} className="absolute top-0 left-0 w-full h-full rounded-[inherit] bg-blue-300 transition-transform translate-z-(--z)" />


                <div style={{"--z" : isHovering ? "30px" : "0"} as React.CSSProperties} className="rounded-[inherit] w-full border-4 translate-z-(--z) transition-transform flex flex-col items-center justify-center">
                    <p className="text-2xl">
                        Hover over this card
                    </p>
                    <p className="font-bold text-3xl">
                        {cardText}
                    </p>
                </div>

                <div style={{"--z" : isHovering ? "60px" : "-1px"} as React.CSSProperties} className="absolute top-0 left-0 w-full h-full rounded-[inherit] border-4 transition-transform translate-z-(--z)" />

                <div style={{"--z" : isHovering ? "60px" : "-1px"} as React.CSSProperties} className="absolute top-0 left-0 w-full h-full rounded-[inherit] border-4 transition-transform translate-z-(--z)" />
            </div>
        </div>
    )
}