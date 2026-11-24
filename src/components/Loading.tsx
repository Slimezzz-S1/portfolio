// COMPONENTS
import useTimers from "@/lib/useTimers"
import type { BaseComponentProps } from "@/lib/BaseComponentProps"
import { useState, useEffect } from "react"
import { twMerge } from "tailwind-merge"

interface LoadingProps extends BaseComponentProps {
    isActivated : boolean
}

export default function Loading({ overrideClassName, className, isActivated, ...rest } : LoadingProps) {
    const [addTimer, clearTimers] = useTimers()
    const [amountDots, setAmountDots] = useState<number>(1)

    useEffect(() => {
        if (!isActivated) return () => {
            clearTimers()
        }

        const interval = setInterval(() => {
            setAmountDots(prev => (prev % 3) + 1)
        }, 1000)

        addTimer(interval)


        return () => {
            clearTimers()
        }
    }, [isActivated])

    return (
        <div className={overrideClassName ? className : twMerge("flex flex-col items-center gap-4", className)} {...rest}>
            <p className="text-2xl font-bold">
                Loading{".".repeat(amountDots)}
            </p>

            <LoadingIcon />
        </div>   
    )
}

export function LoadingIcon() {
    return (
        <div className="w-16 h-16 rounded-full bg-conic-0 from-white to-transparent animate-spin-icon [mask:radial-gradient(farthest-side,transparent_calc(100%-12px),#000_calc(100%-12px))]"/>
    )
}