import { animate, stagger } from "animejs"
import type React from "react"
import { useEffect } from "react"

export default function WaterDotGrid({ className } : { className? : string}) {
    const GRID_WIDTH = 24
    const GRID_HEIGHT = 14
    
    const handleDotClick = (index : number) => {

        animate(document.querySelectorAll(".dot-point"), {
            scale: [
                {
                    to : 2,
                    duration : 300
                },
                {
                    to : 1,
                    duration : 300
                }
            ],
            opacity : [
                {
                    to : 1,
                    duration : 300
                },
                {
                    to : 0.5,
                    duration : 300
                }
            ],
            
            ease : "outQuint",
            delay : stagger(70, {
                grid: [GRID_WIDTH, GRID_HEIGHT],
                from : index
            }),
            composition : "blend"
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const selection = Math.floor(Math.random() * (GRID_WIDTH * GRID_HEIGHT))

            handleDotClick(selection)
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div
            style={{"gridTemplateColumns" : `repeat(${GRID_WIDTH}, 1fr)`} as React.CSSProperties}
            className={"grid gap-4 " + (className ?? "")}
        >
            {Array.from({ length : GRID_WIDTH * GRID_HEIGHT}).map((_item, index) => (
                <div
                key={index}
                className="dot-point w-1.25 aspect-square bg-indigo-500 opacity-50 rounded-full" />
            ))}
        </div>
    )
}