import { useEffect, useRef, useState, type RefObject } from "react"

export default function useIntersectionObserver(ref : RefObject<Element | null>, options : IntersectionObserverInit  = {threshold : 0}) {
    const observerRef = useRef<IntersectionObserver>(null)
    const [isOnScreen, setIsOnScreen] = useState<boolean>(false)

    useEffect(() => {
        observerRef.current = new IntersectionObserver(([entry]) => {
            setIsOnScreen(entry.isIntersecting)
        }, options)
    }, [])

    useEffect(() => {
        if (!ref.current) return

        observerRef.current?.observe(ref.current)

        return () => {
            observerRef.current?.disconnect()
        }
    }, [ref])

    return isOnScreen
}