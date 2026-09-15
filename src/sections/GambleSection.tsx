import { useEffect, useRef, useState } from "react"

export default function GambleSection() {
	const amount : number = 10
	const [currentIndex, setCurrentIndex] = useState<number>(0)
	const cardsRef = useRef<HTMLDivElement | null>(null)
	const [cardWidth, setCardWidth] = useState<number>(0)
	const gap : number = 15
	const [isActivated, setIsActivated] = useState<boolean>(false)

	useEffect(() => {
		if (!cardsRef.current) return

		const card = cardsRef.current.children[0]
		const { width } = card.getBoundingClientRect()

		setCardWidth(width)
	}, [])

	useEffect(() => {
		if (!isActivated) return
		const decayAmount : number = 100
		let delay : number = 100

		const inActive = () => {
			setCurrentIndex((previous) => previous + 1)
		}

		inActive()

		const interval = setInterval(() => {
			inActive()

			delay = delay + decayAmount
		}, delay)

		return () => {
			clearInterval(interval)
		}
	}, [ isActivated ])

	useEffect(() => {
		setCurrentIndex(currentIndex % amount)
	}, [ currentIndex ])

	

	return (
		<section className="p-8">
			<div className="flex flex-col items-center gap-4">
				<div className="relative max-w-full h-full aspect-3/4 border-2 rounded-2xl p-2">
					<Card className="opacity-0" />

					<div ref={cardsRef} style={{ "--x" : `${( cardWidth + gap ) * -currentIndex}px`, "--gap" : `${gap}px`} as React.CSSProperties} className="absolute top-0 left-0 min-w-full h-full flex gap-(--gap) p-2 translate-x-(--x) transition-transform">
						{Array.from({ length : amount }).map(( _, index ) => (
							<Card key={index} index={index} />
						))}
					</div>
				</div>

				<button className="border-2 px-14 py-3 rounded-lg hover:bg-root-fg hover:text-root-bg active:scale-95 transition-all" onClick={() => setIsActivated(!isActivated)}>
					Spin   
				</button>
			</div>
		</section>
	)
}

interface cardProps {
	key? : string | number
	index? : number
	className? : string
	style? : React.CSSProperties
}

function Card({ key, index, className, style } : cardProps) {
	return (
		<div key={key ?? ""} className={"w-96 h-full border-3 rounded-2xl flex items-center justify-center bg-root-fg/20" + " " + className} style={style}>
			Card {index}
		</div>
	)
}