import Logo from "@/icons/favicon.svg?react"
import React, { useEffect, useState } from "react"

import AppBurger from "@/mainComponents/AppBurger"

export default function AppHeader() {
    const [isHidden, setIsHidden] = useState<boolean>(false)

    useEffect(() => {
        let lastScroll : number = 0

        document.addEventListener("scroll", () => {
            if (window.scrollY > lastScroll) {
                setIsHidden(true)
            } else {
                setIsHidden(false)
            }

            lastScroll = window.scrollY
        })

    }, [])

    // useEffect(() => {
    //     console.log(isHidden)
    // }, [isHidden])

    return (
        <div style={{"--y" : isHidden ? "-100%" : "0%"} as React.CSSProperties} className="sticky top-0 left-0 z-100 transition-transform translate-y-(--y)">
            <header className="bg-root-bg border-b-2 px-6 py-4 flex justify-between">
                <div className="flex items-center text-root-fg gap-2">
                    <Logo className="w-12 h-12 aspect-square" />

                    <h1 className="font-black text-4xl">
                        Portfolio
                    </h1>
                </div>

                <AppBurger />
            </header>
        </div>
    )
}