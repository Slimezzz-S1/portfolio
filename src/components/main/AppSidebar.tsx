import { createPortal } from "react-dom"
import AppNav from "@/mainComponents/AppNav"
import { animate } from "animejs"
import { useEffect, useRef } from "react"

interface appSidebarProps {
	posY : number
}

export default function AppSidebar({ posY } : appSidebarProps) {
	const sidebarRef = useRef<HTMLDivElement>(null)
	console.log((posY ?? "0") + "px")

	useEffect(() => {
		if (!sidebarRef.current) return

		animate(sidebarRef.current, {
			x : ["100%", "0"],
			duration : 400,
			ease : "outExpo"
		})
	}, [])

	return createPortal(
		<aside ref={sidebarRef} style={{ "--y" : (posY ?? "0") + "px"} as React.CSSProperties} className="fixed top-(--y) right-0 w-full md:w-1/2 lg:w-fit lg:min-w-96 h-[calc(100%-var(--y))] z-100 bg-root-bg border-l-3 flex flex-col justify-between p-4">

			<AppNav />

			<div className="flex justify-between items-center border-t-2 py-2">
				<h2 className="text-2xl font-bold">
					SlimeZZZ
				</h2>

				<h2 className="text-2xl font-bold">
					2026
				</h2>
			</div>
		</aside>,
		document.querySelector("#root")!
	)
}