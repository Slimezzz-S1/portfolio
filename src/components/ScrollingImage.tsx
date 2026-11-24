// COMPONENTS
import useTimers from "@/lib/useTimers"
import type { BaseComponentProps } from "@/lib/BaseComponentProps"
import { useState, useEffect } from "react"
import { twMerge } from "tailwind-merge"

interface ScrollingImageProps extends BaseComponentProps {
    images : string[]
    isActivated : boolean
}

export default function ScrollingImage({ images, isActivated, className, overrideClassName, ...rest } : ScrollingImageProps) {
    const [addTimer, clearTimers] = useTimers()
    const [currentIndex, setcurrentIndex] = useState<number>(0)

    useEffect(() => {
        if (!isActivated) {
            clearTimers()
            return
        }

        addTimer(setInterval(() => {
            setcurrentIndex(prev => (prev + 1) % images.length)
        }, 1000))

        return () => {
            clearTimers()
        }
    }, [isActivated])

    return (
        <div className={overrideClassName ? className : twMerge("relative aspect-square", className)} {...rest}>
            {images.map((image, index) => (
                <img key={index} src={image} alt="" style={{"--x" : `${(index * 100) - (currentIndex * 100)}%`, "--deg" : `${currentIndex == index ? "-" : ""}90deg`} as React.CSSProperties} className={"absolute top-0 left-0 w-full h-full translate-x-(--x) object-cover transition-all" + " " + (index == currentIndex ? "duration-250" : "duration-500 rotate-(--deg)")} />
            ))}
        </div>
    )
}