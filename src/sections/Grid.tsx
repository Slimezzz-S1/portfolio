import { animate, stagger } from "animejs"
import React, { useEffect, useRef, useState } from "react"

export default function Grid() {
	const [isVisibleFirstTime, setIsVisibleFirstTime] = useState(false)
	const [isVisible, setIsVisible] = useState(false)
	const sectRef = useRef<HTMLDivElement>(null)
	const GRID_WIDTH = 18
	const GRID_HEIGHT = 18

	const handleDotClick = (index : number) => {
			animate(document.querySelectorAll(".grid-point"), {
				scale: [
					{
						to : 2,
						duration : 300
					},
					{
						to : 1,
						duration : 300
					}
				],
				opacity : [
					{
						to : 1,
						duration : 300
					},
					{
						to : 0.5,
						duration : 300
					},
				],
				y: [
					{
						to : "0.5rem",
						duration : 500
					},
					{
						to : "0",
						duration : 500
					}
				],
				ease : "outQuint",
				delay : stagger(70, {
					grid: [GRID_WIDTH, GRID_HEIGHT],
					from : index
				}),
				composition : "blend",
				
			})
		}


	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					if (!isVisibleFirstTime) setIsVisibleFirstTime(true)
					setIsVisible(true)
				} else {
					setIsVisible(false)
				}
			})
		})

		observer.observe(sectRef.current!)

		return () => {
			
			observer.disconnect()
		}
	}, [])

	useEffect(() => {
		// console.log(isVisible ? "is visible" : "not visible")

		const interval = setInterval(() => {
			const selection = Math.floor(Math.random() * (GRID_WIDTH * GRID_HEIGHT))

			handleDotClick(selection)
		}, 1000)

		if (!isVisible) clearInterval(interval)

		return () => clearInterval(interval)
	}, [isVisible])

	useEffect(() => {
		if (!isVisibleFirstTime) return
		if (!sectRef) return

		animate(sectRef.current!, {
			opacity : [
				"0",
				"1"
			],
			duration : 600
		})

	}, [isVisibleFirstTime])

	return (
		<section ref={sectRef}>
			<div className="relative max-h-130 h-full aspect-square mx-auto">
				<div style={{"gridTemplateColumns" : `repeat(${GRID_WIDTH}, 1fr)`} as React.CSSProperties} className=" grid gap-4 w-full h-full mx-auto">
					{Array.from({ length : GRID_WIDTH * GRID_HEIGHT }).map((_, index) => (
						<div key={index} className="bg-white grid-point w-1 aspect-square rounded-2xl opacity-50" />
					))}
				</div>

				<div className='absolute top-0 left-0 w-full h-full flex items-center justify-center z-10'>
					<div>
						{["React", "Tailwind", "TypeScript"].map((text, index) => (
							<p key={index} className='w-full font-black text-7xl lg:text-8xl even:font-outline-2 last:text-white'>
								{text}
							</p>
						))}
					</div>
				</div>

				{/* <div className="pointer-events-none absolute top-0 left-0 w-full h-full bg-radial from-[none] to-black" /> */}
			</div>
		</section>
	)
}