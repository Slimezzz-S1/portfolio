// assets
import projectImage from "@/assets/images/Projects/52a886eb6420b076ba7441d05ac9c216.jpg"

// components
import { useEffect, useRef, useState } from "react"
import { animate, utils } from "animejs"

export interface projectProps {
	name : string
	summary : string
	url : string
	image : string
}

export const projectList : projectProps[] = [
	{
		name : "Meower",
		summary : "meow meow meow meow meow meow meow",
		url : "https://google.com",
		image : projectImage
	}
]

export default function ProjectSection() {
	return (
		<section className="p-8">
			<div>
				{projectList.map((item, index) => (
					<ProjectCard
						key={index}
						name={item.name}
						summary={item.summary}
						url={item.url}
						image={item.image}
					/>
				))}
			</div>
		</section>
	)
}

export function ProjectCard({ name, summary, url, image } : projectProps) {
	const rootRef = useRef<HTMLDivElement | null>(null)
	const cardRef = useRef<HTMLDivElement | null>(null)
	const imageRef = useRef<HTMLImageElement | null>(null)
	const [isHovering, setIsHovering] = useState<boolean>(false)

	useEffect(() => {
		if (!isHovering || !cardRef.current || !rootRef.current || !imageRef.current) return
		
		const card = cardRef.current
		const cardRoot = rootRef.current
		const image = imageRef.current

		const mouseEvent = (e : MouseEvent) => {
			const {left, top, width, height} = cardRoot.getBoundingClientRect()

			const mouseX = e.clientX - left - width / 2
			const mouseY = e.clientY - top - height / 2

			const mousePercentX = mouseX / ( width / 2 )
			const mousePercentY = mouseY / ( height / 2 )

			const maxTilt = 5

			animate(image, {
				x: mousePercentX * 20,
				y: mousePercentY * 20,
				scale : 1.1,
				duration : 200,
				ease : "out(3)",
				composition : "replace"
			})

			animate(card, {
				rotateX : mousePercentY * maxTilt * -1,
                rotateY : mousePercentX * maxTilt,
				duration : 200,
				ease : "out(3)",
				composition : "replace"
			})
		}

		cardRoot.addEventListener("mousemove", mouseEvent)

		return () => {
			cardRoot.removeEventListener("mousemove", mouseEvent)

			utils.remove(cardRoot)

			animate([image, card], {
				x: 0,
				y: 0,
				rotateX : 0,
				rotateY : 0,
				scale : 1,
				duration: 200,
				ease: 'out(3)',
			})

		}
	}, [isHovering])

	return (
		<div ref={rootRef} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="relative perspective-near max-w-md">
			<div ref={cardRef} className="relative w-full h-full aspect-3/4 rounded-2xl border-3 transform-3d">
				<div className="w-full h-full rounded-2xl pointer-events-none [clip-path:inset(0_round_1rem)] transform-flat">
					<img ref={imageRef} src={image} alt="" className="w-full h-full object-cover" />
				</div>
	
				<div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-0 from-black to-none z-0" />
	
				<div className="absolute bottom-0 left-0 w-full h-1/3 flex flex-col justify-end gap-4 p-4">
					<p className="text-5xl font-bold">
						{name}
					</p>
	
					<p className="flex-1">
						{summary}
					</p>
	
					<a href={url} className="transition-all border-2 px-3 py-2 rounded-2xl hover:bg-root-fg hover:text-root-bg hover:border-root-bg active:scale-95">
						Check it out
					</a>
				</div>

				<div style={{"--z" : isHovering ? "20px" : "0", "--opacity" : isHovering ? "0.5" : "0"} as React.CSSProperties} className="absolute top-0 left-0 w-full h-full border-3 rounded-2xl transition-all translate-z-(--z) pointer-events-none opacity-(--opacity)" />

				<div style={{"--z" : isHovering ? "10px" : "0", "--opacity" : isHovering ? "0.25" : "0"} as React.CSSProperties} className="absolute top-0 left-0 w-full h-full border-3 rounded-2xl transition-all translate-z-(--z) pointer-events-none opacity-(--opacity)" />
			</div>
		</div>
	)
}