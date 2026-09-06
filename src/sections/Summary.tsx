import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import { animate, stagger } from "animejs"
import React, { useState, useRef, useEffect } from "react"

export default function Summary() {
	const sectRef = useRef<HTMLDivElement>(null)
	const cardRefs = useRef<HTMLDivElement[]>([])
	const isVisible = useIntersectionObserver(sectRef, { threshold : 0.8 })
	const [isVisibleOnce, setIsVisibleOnce] = useState<boolean>(false)

	useEffect(() => {
		if (isVisible) setIsVisibleOnce(true)

	}, [isVisible])

	useEffect(() => {
		if (!isVisibleOnce) return

		animate(cardRefs.current, {
			opacity : ["0", "1"],
			x : (_, index) => [index! % 2 == 0 ? "-100%" : "100%", "0"],
			duration : 1100,
			ease : "outExpo",
			delay : stagger(150)
		})
	}, [isVisibleOnce])

	return (
		<section ref={sectRef} className="p-8">
			<div className="flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-3 gap-4 min-h-140">
				{summaryItems.map((item, index) => (
					<SummaryItem
						ref={(element) => { if (element) cardRefs.current[index] = element }}
						key={index}
						name={item.name}
						description={item.description}
						className={item.className}
						style={{"opacity" : "0", "transform" : `translateX(${index % 2 == 0 ? "-100%" : "100%"})`} as React.CSSProperties}
						color={item.color}
						simplifiedDescription={item.simplifiedDescription}
					/>
				))}
			</div>
		</section>
	)
}

const summaryItems : summaryItemProps[] = [
	{
		name : "Summary",
		description : "I'm a 17 year old high school student from Indonesia, I'm a 3D artist, front-end developer, and video editor. I have no achievements as of now as I tend to be a lazybone. Almost all of my skills were broad, but mediocre. My first OS was Windows XP, I use CachyOS btw.",
		simplifiedDescription : "I'm a slime",
		className : "col-span-2 row-span-2",
		color : "lime"
	},
	{
		name : "3D Artist",
		description : "I started learning 3D animation back in 2020 using nothing but MineImator to create a silly Minecraft animations. after 4 years, I tried Blender for more control and convenience and now we're here.",
		simplifiedDescription : "I use Blender 3.6.23",
		color : "cyan"
	},
	{
		name : "Programming",
		description : "I got into programming in 2024 after seeing rigify scripts that you would see in Blender if you were rigging. My first language was Python.",
		simplifiedDescription : "I code in Python, React, and Next.js",
		color : "yellow"
	},
	{
		name : "Video editor",
		description : "I did a bit of editing somewhere in 2018-2020 in Alight Motion, yes I learned editing on my phone. But this year, I started using Davinci Resolve for more professional Editing, I might even try After Effects.",
		simplifiedDescription : "I use Davinci Resolve",
		className : "col-span-3",
		color : "red"
	},
]

interface summaryItemProps {
	name : string
	description : string
	simplifiedDescription : string
	className? : string
	color : string
}

const SummaryItem = React.forwardRef<HTMLDivElement, summaryItemProps & { style? : React.CSSProperties }>(({ name, description, simplifiedDescription, className, color, style }, ref) => {
		const [isSimplified, setIsSimplified] = useState<boolean>(false)

		return (
			<div ref={ref} style={{...{"--color" : color}, ...style} as React.CSSProperties} className={"min-h-48 lg:h-full border-2 border-(--color) rounded-xl bg-(--color)/25 flex flex-col" + " " + className}>
				<h2 className="p-3 text-3xl lg:text-4xl font-bold">
					{name}
				</h2>

				<div className="w-full h-0.5 bg-(--color)" />

				<div className="relative p-3 flex flex-col gap-4 justify-between h-full">
					<p style={{"--opacity" : isSimplified ? "0" : "1"} as React.CSSProperties} className={"flex-1 opacity-(--opacity) transition-opacity"  + " " + (isSimplified ? "pointer-events-none" : "")}>
						{/* {isSimplified ? simplifiedDescription : description} */}
						{description}
					</p>

					<p style={{"--opacity" : isSimplified ? "1" : "0"} as React.CSSProperties} className={"absolute top-0 left-0 p-[inherit] opacity-(--opacity) transition-opacity" + " " + (isSimplified ? "" : "pointer-events-none")}>
						{simplifiedDescription}
					</p>

					<button className={"w-3/4 self-center lg:self-auto lg:max-w-40 border-2 border-(--color) p-2 rounded-2xl transition-all hover:bg-(--color)/65 active:bg-(--color)/90 hover:scale-105 active:scale-95" + " " + (isSimplified ? "bg-(--color)/50" : "")} onClick={() => setIsSimplified(!isSimplified)}>
						{isSimplified ? "Unsimplify" : "Simplify"}
					</button>
				</div>
			</div>
		)
	}
)