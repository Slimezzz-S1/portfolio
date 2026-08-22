import type React from "react"
import { useEffect, useRef } from "react"


function Marquee() {
    const firstItemRef = useRef<HTMLUListElement>(null)
    const secondItemRef = useRef<HTMLUListElement>(null)
    const itemRefs = useRef<HTMLUListElement[]>([])

    useEffect(() => {
        if (!itemRefs) return

        itemRefs.current.forEach((el, i) => {
            console.log(el)
        })

    }, [itemRefs])

    return (
        <div>
            <ul ref={(element: HTMLUListElement, index: number) => {itemRefs.current[index] = element; return;}}>
                {Array.from({ length : 5 }).map((_, index) => (
                    <li key={index}>
                        meow
                    </li>
                ))}
            </ul>

            <ul ref={second}>
                {Array.from({ length : 5 }).map((_, index) => (
                    <li key={index}>
                        meow
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default function Danger() {
    return (
        <div>
            <Marquee />
        </div>
    )
}