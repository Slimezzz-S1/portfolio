import { useRef } from "react"

export default function useTimers() {
    const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

    const addTimer = (id : number) => {
        timersRef.current.push(id)
    }

    const clearAll = () => {
        timersRef.current.forEach((id) => {
            clearInterval(id)
            clearTimeout(id)
        })

        timersRef.current = []
    }

    return [addTimer, clearAll] as const
}