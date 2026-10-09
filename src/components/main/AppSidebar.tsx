// COMPONENTS
import { createPortal } from "react-dom"
import AppNav from "@/mainComponents/AppNav"
import { animate } from "animejs"
import { useEffect, useRef, useState } from "react"

interface AppSidebarProps {
	posY : number
	onClick? : () => void
	isToggled? : boolean
}

export default function AppSidebar({ posY, onClick, isToggled } : AppSidebarProps) {
	const sidebarRef = useRef<HTMLDivElement>(null)
	const [isHidden, setIsHidden] = useState<boolean>(true)

	useEffect(() => {
		if (!sidebarRef.current) return

		if (isToggled) {
			// setIsHidden(true)
			animate(sidebarRef.current, {
				x : ["100%", "0"],
				duration : 400,
				ease : "outExpo",
				onBegin : () => {
					setIsHidden(false)
				}
			})
		} else {
			animate(sidebarRef.current, {
				x : ["0", "100%"],
				duration : 400,
				ease : "outExpo",
				onComplete : () => {
					setIsHidden(true)
				}
			})
		}

		return
	}, [isToggled])

	return createPortal(
		<aside ref={sidebarRef} style={{ "--y" : (posY ?? "0") + "px", "opacity" : isHidden ? "0" : "1"} as React.CSSProperties} className="fixed top-(--y) right-0 w-full md:w-1/2 lg:w-fit lg:min-w-96 h-[calc(100%-var(--y))] z-100 bg-root-bg md:border-l-3 flex flex-col justify-between p-4 opacity-(--opacity)">
			<div />
			
			<AppNav onClick={onClick} />

			<div className="flex justify-between items-center border-t-2  py-2">
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