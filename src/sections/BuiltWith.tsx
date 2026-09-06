import { useEffect, useRef, useState } from "react"

import zylHoldingImage from "@/assets/images/BuiltWith/ZylHolding.png"
import ReactIcon from "@/icons/Languages/React/griddy-icons--react.svg?react"

import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import { animate } from "animejs"

export default function BuiltWith() {
    const sectRef = useRef<HTMLDivElement | null>(null)
    const titleRef = useRef<HTMLDivElement | null>(null)
    const mainRef = useRef<HTMLDivElement | null>(null)
    const isOnScreen = useIntersectionObserver(sectRef, {threshold : 0.4})
    const [isShownOnce, setIsShownOnce] = useState<boolean>(false)

    useEffect(() => {
        if (isOnScreen) setIsShownOnce(true)

        return
    }, [isOnScreen])

    useEffect(() => {
        if (!isShownOnce || !titleRef.current || !mainRef.current) return

        animate([titleRef.current!, mainRef.current!], {
            x : (_, i) => [i == 0 ? "-100vw" : "100vw", "0"],
            duration : 1200,
            ease : "outExpo"
        })

        return
    }, [isShownOnce])

    return (
        <section ref={sectRef} className="p-8 relative flex flex-col lg:flex-row-reverse">
            <div style={{"transform" : "translateX(-100vw)"} as React.CSSProperties} ref={titleRef} className="flex flex-col gap-2 items-center justify-center w-full">
                <div className="w-fit mx-auto">
                    <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-8xl font-black text-center w-full lg:whitespace-nowrap">
                        Built With
                    </h1>

                    <div className="font-mono flex justify-between w-full">
                        {["React", "+", "Typescript", "+", "Tailwind", "+", "Anime.js"].map((item, index) => (
                            <p key={index}>
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{"transform" : "translateX(100vw)"} as React.CSSProperties} ref={mainRef} className="relative w-full">
                <div className="relative">
                    <img src={zylHoldingImage} alt="" className="w-full object-top object-cover h-160 lg:h-200" />

                    <ReactIcon className="text-[#00c8ff] drop-shadow-[0px_0px_15px_#7be2ff,0px_0px_35px_#00f] absolute top-30 left-[1%] w-[40%] aspect-square z-10 animate-spin-icon" />

                    <div className="absolute bottom-0 left-0 w-full h-[30%] bg-linear-to-t from-10% from-root-bg to-none z-20" />
                </div>
            </div>


        </section>
    )
}
