import Logo from "@/icons/favicon.svg?react"
import React, { useEffect, useState, useRef } from "react"

import AppBurger from "@/mainComponents/AppBurger"
import AppSidebar from "@/mainComponents/AppSidebar"
import { createPortal } from "react-dom"

export default function AppHeader() {
	const [isHidden, setIsHidden] = useState<boolean>(false)
	const [isSidebarToggled, setIsSidebarToggled] = useState<boolean>(false)
	const rootRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (isSidebarToggled) {
			setIsHidden(false)

			return
		}

		let lastScroll : number = 0

		const onScroll = () => {
			
			if (window.scrollY > lastScroll) {
				setIsHidden(true)
			} else {
				setIsHidden(false)
			}

			lastScroll = window.scrollY
			
			return
		}

		document.addEventListener("scroll", onScroll)

		return () => {
			document.removeEventListener("scroll", onScroll)
		}
	}, [isSidebarToggled])

	return (
		<>
			<div ref={rootRef} style={{"--y" : isHidden ? "-100%" : "0%"} as React.CSSProperties} className="sticky top-0 left-0 z-100 transition-transform translate-y-(--y)">
				{/* <div className="bg-gray-600 p-4 flex items-center">
					Cute puppy!
				</div> */}

				<header className="bg-root-bg border-b-2 px-6 py-4 flex justify-between">
					<div className="flex items-center text-root-fg gap-2">
						<Logo className="w-12 h-12 aspect-square" />

						<h1 className="font-black text-4xl">
							Portfolio
						</h1>
					</div>

					<AppBurger onClick={() => setIsSidebarToggled(!isSidebarToggled)} />
				</header>
			</div>
			{isSidebarToggled && (
				<AppSidebar posY={rootRef.current?.getBoundingClientRect().height ?? 0} />
			)}
		</>		
	)
}