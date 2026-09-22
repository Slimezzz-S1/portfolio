import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import { animate, stagger } from "animejs"
import React, { useState, useRef, useEffect } from "react"

export default function SummarySection() {
	const sectRef = useRef<HTMLDivElement>(null)
	const cardRefs = useRef<HTMLDivElement[]>([])
	const isVisible = useIntersectionObserver(sectRef, { threshold : 0.4 })
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
						ref={(element) => { if (element) cardRefs.current[index] = element}}
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
		description : "I'm a 17 year old voca student from Indonesia, I do 3D animation, develop front-end website, and edit videos. I was a computer nerd back when I was a kid. I yearned for learning more about computers. Looking in the future, I want to be a successful SE graduate and get a loving job with appropriate income",
		simplifiedDescription : "I'm a 3D artist, front-end developer, video editor.",
		className : "col-span-2 row-span-2",
		color : "lime"
	},
	{
		name : "3D Artist",
		description : "I make 3D animations of my OC. I started learning 3D animation back in 2020 using nothing but MineImator to create silly Minecraft animations. after 4 years of disinterest, I tried Blender for more control and convenience and now we're here.",
		simplifiedDescription : "I make 3D animation in Blender 3.6.23",
		color : "cyan"
	},
	{
		name : "Programming",
		description : "I got into coding in 2024 after seeing blender scripts. Inspired by those, I started learning Python by creating small scripts. Later, I got good at it and learned other languages as well. As of now, I'm more interested in making front-end websites. My programming languages are Python, HTML, CSS, JavaScript, TypeScript, and Lua. My beloved frameworks are React.js, Next.js, Vue.js, and PySide6.",
		simplifiedDescription : "I code in Python, React, Vue.js, PySide6, and Next.js",
		color : "yellow"
	},
	{
		name : "Video editor",
		description : "I can do simple video editing, and color grading. I started learning video editing somewhere in 2018-2020 using nothing, but Alight Motion on my Snapdragon 625 phone. But in 2025, I started learning in Davinci Resolve in my laptop, with the goal of learning to use After Effects later",
		simplifiedDescription : "I use Davinci Resolve for simple video editing",
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