import { useState, useEffect, useRef } from "react"
import { animate, utils } from "animejs"

export default function InteractiveCard() {
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
        <div ref={cardRootRef} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="perspective-midrange w-full max-w-2xl">
            <div
                style={{"--z" : isHovering ? "-30px" : "-1px"} as React.CSSProperties}
                ref={cardRef}
                className="relative w-full min-h-120 bg-linear-30 from-blue-600 to-green-300 rounded-2xl [transform-style:preserve-3d] transition-transform duration-100 ease-out flex
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