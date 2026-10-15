// COMPONENTS
import { useRef, useEffect, useState } from "react"

export default function useCount(to : number, duration : number = 1750) {
    const [value, setValue] = useState<number>(0)
    const fromRef = useRef<number>(0)

    useEffect(() => {
        const from = fromRef.current
        
        const startTime = performance.now()
        let frame : number
        
        const tick = (now : number) => {
            const t = Math.min((now - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - t, 10)
            const current = from + (to - from) * eased

            fromRef.current = current
            
            setValue(Math.round(from + (to - from) * eased))

            if (t < 1) {
                frame = requestAnimationFrame(tick)
            }
        }

        frame = requestAnimationFrame(tick)

        return () => cancelAnimationFrame(frame)
    }, [to, duration])

    return value
}