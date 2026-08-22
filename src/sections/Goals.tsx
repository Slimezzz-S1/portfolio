import Panel from "@/components/Panel"
import { animate, stagger } from "animejs"
import { useEffect, useRef, useState, type RefObject } from "react"

interface goalProps {
	name : string
	isChecklisted : boolean
	description? : string
}

interface goalPropsExtras extends goalProps {
	ref? : React.Ref<HTMLDivElement>
	style? : React.CSSProperties
}

const goalsData : goalProps[] = [
	{
		name : "create 3D animation",
		isChecklisted : true,
	},
	{
		name : "make money",
		isChecklisted : false,
		description : "hire me pls"
	},
	{
		name : "Create a game",
		isChecklisted : false,
	},
	{
		name : "Reach Faceit level 10",
		isChecklisted : false,
	},
	{
		name : "learn fstab flags",
		isChecklisted : false,
		description : "wtf are those?"
	}
]

export function Goal({ name, isChecklisted, description, ref, style} : goalPropsExtras) {
	return (
		<div ref={ref} style={{...{"gridTemplateRows" : "repeat(1, 1fr)"}, ...style}} className="grid grid-cols-[2.5rem_1fr] items-stretch gap-x-4 border-y border-dashed border-gray-500 py-4">
			<div style={{"--color" : isChecklisted ? "var(--color-foreground)" : "var(--color-background)"} as React.CSSProperties} className="border aspect-square w-full rounded-lg bg-(--color)" />

			<h2 className="text-3xl font-bold">
				{name}
			</h2>

			{description && (
				<div className="col-start-2 flex items-center gap-[inherit]">
					<div className="border-l-3 border-b-3 rounded-bl-2xl h-5 aspect-square" />

					<p className="pt-3">
						{description}
					</p>
				</div>
			)}
		</div>
	)
}

export function Goals({ goalList = goalsData } : {goalList? : goalProps[]}) {
	return (
		<ul className="flex flex-col gap-4">
			{goalList.map((goal, index) => (
				<Goal key={index} name={goal.name} isChecklisted={goal.isChecklisted} description={goal.description} />
			))}
		</ul>
	)
}

export default function GoalSection() {
	const [isVisible, setIsVisible] = useState(false)
	const goalRef = useRef<HTMLDivElement[]>([])
	const goalList = goalsData

	useEffect(() => {
		if (!goalRef) return
		if (!isVisible) return

		animate(goalRef.current, {
			y : (_, i) => [(((i! + 1) * -100) + "%"), "0"],
			opacity : [
				"0",
				"1"
			],
			duration : 600,
			delay : stagger(50)
		})

	}, [isVisible])

	return (
		<Panel isCustomAnimation={true} onVisible={() => {setIsVisible(true)}}>
			<h1 className="text-8xl font-black mb-4">
				Todos
			</h1>

			<div className="relative">
				<div className="px-4 before:absolute before:-inset-1 before:block before:w-1 before:rounded-lg before:bg-foreground">
					<ul className="flex flex-col gap-4">
						{goalList.map((goal, index) => (
							<Goal style={{"opacity" : 0}} ref={(el : HTMLDivElement) => {goalRef.current[index] = el}} key={index} name={goal.name} isChecklisted={goal.isChecklisted} description={goal.description} />
						))}
					</ul>
				</div>
			</div>
		</Panel>
	)
}