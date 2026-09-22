import useClientVisibility from "@/hooks/useClientVisibility"
import { animate, stagger } from "animejs"
import { useEffect, useRef, useState } from "react"

export default function TodosSection() {
	const sectRef = useRef< HTMLDivElement | null >( null )
	const itemsRef = useRef< HTMLDivElement | null >( null )
	const isVisible = useClientVisibility(sectRef, { threshold : 0.3 })
	const [ isVisibleOnce, setIsVisibleOnce ] = useState< boolean >( false )

	useEffect(() => {
		if (isVisible) {
			setIsVisibleOnce(true)
		}

	}, [ isVisible ])

	useEffect(() => {
		if ( !isVisibleOnce || !itemsRef.current ) return

		animate(itemsRef.current.children, {
			opacity : [ "0", "1" ],
			y : ( _, index ) =>  [`-${100 * index!}%`, "0"],
			duration : 700,
			delay : stagger(100)
		})
		return
	}, [ isVisibleOnce ])

	return (
		<section ref={sectRef} className="p-8 flex flex-col gap-4">
			<h1 className="font-black text-7xl">
				Goals
			</h1>

			<div className="border border-dashed" />

			<div>
				<div ref={itemsRef} className="flex flex-col gap-4">
					{todoItemList.map((item, index) => (
						<TodoItem
							key={index}
							name={item.name}
							description={item.description}
							isChecked={item.isChecked}
							style={{ "opacity" : "0" } as React.CSSProperties}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

const todoItemList : todoItemProps[] = [
	{
		name : "Create 3D Animation",
		isChecked : true
	},
	{
		name : "Finish this portfolio",
		isChecked : "halfway",
		description : "Almost finished"
	},
	{
		name : "React 100K Subscriber",
		description : "",
		isChecked : false
	},
	{
		name : "Get a job",
		isChecked : false
	},
	{
		name : "Make a short movie",
		description : "Coming soon",
		isChecked : "halfway"
	}
]

interface todoItemProps {
	name : string
	description? : string
	isChecked : boolean | "halfway"
}

interface todoItemComponentProps extends todoItemProps {
	className? : string
	style? : React.CSSProperties
}

export function TodoItem({ name, description, isChecked, className, style } : todoItemComponentProps) {
	return (
		<div style={style} className={"grid grid-cols-[3rem_1fr] gap-x-4" + " " + className}>
			<div className={"w-12 h-12 aspect-square border-2 rounded-lg" + " " + (
				typeof isChecked === "boolean" && isChecked ? "bg-root-fg" :
				isChecked === "halfway" ? "bg-hatch" :
				"bg-none"
			)} />

			<h2 className="text-2xl font-bold self-center">
				{name}
			</h2>

			{description && (
				<div className="flex items-center gap-2 col-start-2">
					<div className="min-w-4 aspect-square border-b-2 border-l-2 rounded-bl-xl mb-3 mt-1 self-start" />

					<p>
						{description}
					</p>
				</div>
			)}
		</div>
	)
}