import type { BaseComponentProps } from "@/lib/BaseComponentProps";
import { animate } from "animejs";
import { useEffect, useRef, useState, type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ComponentProps<"button">, Pick<BaseComponentProps, "overrideClassName"> {
    text? : string
}

export default function Button({ text, overrideClassName, className, onClick, onMouseEnter, onMouseLeave, ...rest } : ButtonProps) {
    const [isHovering, setIsHovering] = useState<boolean>(false)
    const bgRef = useRef<HTMLDivElement | null>(null)

    const onButtonClicked = (e : React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e)
    }

    const onButtonEntered = (e : React.MouseEvent<HTMLButtonElement>) => {
        onMouseEnter?.(e)

        setIsHovering(true)
    }

    const onButtonLeaved = (e : React.MouseEvent<HTMLButtonElement>) => {
        onMouseLeave?.(e)

        setIsHovering(false)
    }

    useEffect(() => {
        if (!bgRef.current) return

        if (isHovering) {
            animate(bgRef.current, {
                x : ["-100%", "0"],
                duration : 800,
                ease : "outExpo"
            })
        } else {
            animate(bgRef.current, {
                x : "100%",
                duration : 800,
                ease : "outExpo",
                onComplete : () => {
                    bgRef.current?.style.setProperty("transform", "translateX(-100%)")
                }
            })
        }
    }, [isHovering])

    return (
        <button className={overrideClassName ? className : twMerge("relative py-2 px-8 border-3 font-bold rounded-full group overflow-hidden max-w-sm cursor-pointer", className)} onClick={onButtonClicked} onMouseEnter={onButtonEntered} onMouseLeave={onButtonLeaved} {...rest}>
            <span>
                {text}
            </span>

            {/* <div ref={bgRef} className="absolute top-0 left-0 w-[calc(100%+16px)] h-full bg-accent border-r-16 border-r-light-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-500 -z-1" /> */}
            <div ref={bgRef} className="absolute top-0 left-0 w-[calc(100%+16px)] rounded-full h-full bg-accent border-r-16 border-r-light-accent -z-1" />
        </button>
    )
}