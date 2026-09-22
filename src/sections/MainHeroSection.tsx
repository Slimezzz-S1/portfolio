// built-in components
import { useEffect, useState, useRef } from "react"

// components
import SocialLinks from "@/components/SocialLink"

// media
import profileImage from "@/assets/images/MainHero/MainHeroProfile.png"
import useClientVisibility from "@/hooks/useClientVisibility"

import { animate, stagger } from "animejs"

export default function MainHeroSection() {
	const sectRef = useRef<HTMLDivElement | null>(null)
	const imageRef = useRef<HTMLDivElement | null>(null)
	const textRef = useRef<HTMLDivElement | null>(null)

	const isVisible = useClientVisibility(sectRef, { threshold : 0.5 })
	const [isVisibleOnce, setIsVisibleOnce] = useState< boolean >( false )
	const [isFinishedTransition, setIsFinishedTransition] = useState< boolean >( false )
	const [isActive, setIsActive] = useState< boolean >( false )

	const [isTextTransitioning, setIsTextTransitioning] = useState< boolean >( false )

	const onBeginText = () => {
		setIsTextTransitioning(true)
	}

	const onCompleteText = () => {
		setIsTextTransitioning(false)
	}

	useEffect(() => {
		if (isVisible) setIsVisibleOnce(true)
		
		if (isFinishedTransition) {
			setIsActive(isVisible)
		}

		return
	}, [isVisible])

	useEffect(() => {
		if (!isVisibleOnce || !sectRef.current || !imageRef.current || !textRef.current) return

		// animate(imageRef.current, {
		// 	x : [
		// 		"-100vw",
		// 		"0"
		// 	],
		// 	duration : 1200,
		// 	ease : "outExpo",
		// })
		
		animate([textRef.current, imageRef.current], {
			x : (_, index) => {
				return [
					(index === 0 ? "-" : "") + "100vw",
					"0"
				]
			},
			duration : 1200,
			ease : "outExpo",
			onComplete : () => {
				setIsFinishedTransition(true)
			}
		})

		return
	}, [ isVisibleOnce ])

	useEffect(() => {
		setIsActive(isFinishedTransition)
	}, [isFinishedTransition])

	return (
		<section ref={sectRef} className="p-8 flex flex-col-reverse lg:flex-row justify-around gap-4 lg:items-center min-h-[calc(100dvh-90px)]">
			<div style={{"transform" : "translateX(-100vw)"} as React.CSSProperties} ref={textRef} className="flex flex-col gap-2 lg:flex-1 lg:w-1/2">
				<p className="text-xl">
					Hi, I'm
				</p>

				<h2 className="relative text-5xl lg:text-7xl font-bold min-h-[2em] whitespace-pre-wrap font-mono col-start-1">
					<Role isActive={isActive} onBegin={onBeginText} onComplete={onCompleteText} />

					<BlinkingCursor isActive={isActive} startBlank={true} isSwitchedManually={isTextTransitioning} isSwitchedValue={false} cursorType="_" />

					<span className="absolute top-0 left-0 w-full h-full opacity-25">
						<Underscores amount={11} endLineAt={5} isActive={isActive} />
					</span>
				</h2>

				<p className="col-start-1">
					Just a silly slime trying to enjoy life the human way.
				</p>

				<SocialLinks />
			</div>

			<div style={{"transform" : "translateX(100vw)"} as React.CSSProperties} ref={imageRef} className="relative flex-1 h-1/2 flex items-center justify-center lg:justify-end">
				<img src={profileImage} alt="" className="absolute lg:static top-0 left-0 w-full h-full object-cover rounded-2xl lg:max-w-lg" />
			</div>
		</section>
	)
}

interface underScoreProps {
	amount : number
	endLineAt : number
	isActive : boolean
}

function Underscores({ amount, endLineAt, isActive } : underScoreProps) {
	const underscoreRefs = useRef<HTMLSpanElement[]>([])
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | false>(false)

	const clearTimeoutRef = () => {
		if (!timeoutRef.current) return

		clearTimeout(timeoutRef.current)

		return
	}
	
	useEffect(() => {
		if (!isActive || !underscoreRefs.current) {
			clearTimeoutRef()
			return
		}
		
		const duration = 100
		const staggerDelay = 75
		const hold = 250
		
		const underScores = underscoreRefs.current
		
		const getDurationTotal = ( twice : boolean = true, amountChar : number = underScores.length) => {
			return ( duration + ( amountChar * staggerDelay ) ) * (twice ? 2 : 1) + hold
		}

		const fadeIn = ( onComplete? : () => any ) => {
			animate(underScores, {
				opacity : [
					"1",
					"0"
				],
				delay : stagger(staggerDelay),
				duration : duration,
				onComplete : onComplete?.()
			})
		}

		const fadeOut = ( onComplete? : () => any ) => {
			animate(underScores, {
				opacity : [
					"0",
					"1"
				],
				delay : stagger(staggerDelay),
				duration : duration,
				onComplete : onComplete?.()
			})
		}
		
		const onActive = () => {
			fadeIn()

			const timeout = setTimeout(fadeOut, getDurationTotal(false))

			timeoutRef.current = timeout
		}
		
		onActive()
		
		const interval = setInterval(() => {
			onActive()
		}, getDurationTotal(true))
		
		return () => {
			clearInterval(interval)
		}
	}, [ isActive ])

	// console.log(underscoreRefs.current)

	return (
		<span>
			{Array.from({ length : amount }).map(( _, index ) => (
				<span key={index} ref={( element ) => { if (element) { underscoreRefs.current[index] = element } }}>
					{index == endLineAt ? "\n" : "_ "}
				</span>
			))}
		</span>
	)
}

interface blinkingCursorProps {
	isActive : boolean
	startBlank? : boolean
	isSwitchedManually? : boolean
	isSwitchedValue? : boolean
	cursorType? : string
}

function BlinkingCursor({ isActive, startBlank = false, isSwitchedManually = false, isSwitchedValue = true, cursorType = "_" } : blinkingCursorProps) {
	const [isSwitched, setIsSwitched] = useState<boolean>(startBlank ? true : false)

	useEffect(() => {
		if (isSwitchedManually) {
			setIsSwitched(isSwitchedValue)

			return
		}

		if (!isActive) return

		const switchState = () => {
			setIsSwitched(( previous ) => {
				return !previous
			})
		}

		switchState()

		const interval = setInterval(() => {
			switchState()
		}, 700)

		return () => {
			clearInterval(interval)
		}
	}, [ isActive, isSwitchedManually ])

	return (
		<span style={{"--color" : isSwitched ? "transparent" : "var(--root-foreground)"} as React.CSSProperties} className="text-(--color)">
			{cursorType}
		</span>
	)
}

interface roleProps {
	isActive : boolean
	onBegin? : () => void
	onComplete? : () => void
}

function Role({ isActive, onBegin, onComplete } : roleProps) {
	const roles : string[] = [
		"Front-End\nDeveloper",
		"3D Artist",
		"Left\nHanded",
	]
	const indexRef = useRef<number>(0)
	const delayEachLetter : number = 25
	const textHold : number = 2000
	const [displayText, setDisplayText] = useState<string>(roles[0])

	const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

	const clearAllTimeouts = () => {
		timeoutsRef.current.forEach(( id ) => {
			clearTimeout(id)

			return
		})
		timeoutsRef.current = []
	}

	const removeText = (text: string, startDelay: number = 0): number => {
		for (let i = text.length; i >= 0; i--) {
			const t = setTimeout(() => {

				setDisplayText(text.slice(0, i))

			}, startDelay + delayEachLetter * (text.length - i))

			timeoutsRef.current.push(t)
		}

		return delayEachLetter * text.length
	}

  const addText = (text: string, startDelay: number = 0): number => {
		for (let i = 0; i <= text.length; i++) {
			const t = setTimeout(() => {

				setDisplayText(text.slice(0, i))

			}, startDelay + delayEachLetter * i)

			timeoutsRef.current.push(t)
		}

		return delayEachLetter * text.length
	}

	useEffect(() => {
		if (!isActive) {
			clearAllTimeouts()

			return
		}

		const runCycle = () => {
			const current = roles[indexRef.current]
			const nextIndex = (indexRef.current + 1) % roles.length
			const next = roles[nextIndex]

			// START =====

			// REMOVE TEXT
			const removeDuration = removeText(current)

			// HOLD
			const gap = delayEachLetter

			// ADD TEXT
			const addDuration = addText(next, removeDuration + gap)

			const totalCycleDuration = removeDuration + gap + addDuration + textHold

			onBegin?.()

			// COMPLETE =====
			const onCompleteTimeout = setTimeout(() => {
				onComplete?.()

			}, totalCycleDuration - textHold)

			timeoutsRef.current.push(onCompleteTimeout)

			// LOOP =====
			const nextTimeout = setTimeout(() => {
				indexRef.current = nextIndex

				runCycle()
			}, totalCycleDuration)

			timeoutsRef.current.push(nextTimeout)
		}

		runCycle()

		return () => {
			clearAllTimeouts()

			return
		}
	}, [ isActive ])

	return (
		<span className="notranslate" translate="no">
			{displayText}
		</span>
	)
}

// export function MainHeroTmp() {
// 	const roles : string[] = [
// 		"Front-End\nDeveloper",
// 		"3D Artist",
// 		"Normies"
// 	]
// 	const [currentIndex, setCurrentIndex] = useState<number>(0)
// 	const [roleDisplay, setRoleDisplay] = useState<string>("")
	
// 	const sectRef = useRef<HTMLDivElement>(null)
// 	const imageRef = useRef<HTMLDivElement>(null)
// 	const titleRef = useRef<HTMLDivElement>(null)
	
// 	const isOnScreen = useIntersectionObserver(sectRef, {threshold : 0.5})
// 	const [isShownOnce, setIsShownOnce] = useState<boolean>(false)
// 	const [isActive, setIsActive] = useState<boolean>(true)
// 	const [isCursorActive, setIsCursorActive] = useState<boolean>(false)
	
// 	useEffect(() => {
// 		setRoleDisplay(roles[currentIndex])

// 		console.log("efwioejf")
// 	}, [])

// 	useEffect(() => {
// 		if (!isActive) return

// 		const emptyDisplay = (currentRole : string = roleDisplay) => {
// 			console.log(currentRole)
// 		}

// 		emptyDisplay()

// 		return () => {

// 		}
// 	}, [isActive])

// 	useEffect(() => {
// 		if (isOnScreen) setIsShownOnce(true)
// 	}, [isOnScreen])

// 	useEffect(() => {
// 		if (!isShownOnce || !imageRef.current || !titleRef.current) return

// 		animate(imageRef.current, {
// 			x : ["-100vw", "0"],
// 			duration : 1200,
// 			ease : "outExpo"
// 		})

// 		animate(titleRef.current, {
// 			x : ["100vw", "0"],
// 			duration : 1200,
// 			ease : "outExpo"
// 		})
		
// 	}, [isShownOnce])

// 	useEffect(() => {
// 		if (!isActive) return 
// 	}, [isActive])
	
// 	return (
// 		<section ref={sectRef} className="overflow-hidden relative p-8 flex flex-col-reverse lg:flex-row gap-4 h-[calc(100dvh-90px)] lg:h-full">
// 			<div style={{"transform" : "translateX(100vw)"} as React.CSSProperties} ref={titleRef} className="lg:w-1/2 flex flex-col justify-center gap-3">
// 				<p className="text-xl">
// 					Hi, I'm
// 				</p>

// 				<h2 className="font-black text-6xl lg:text-7xl min-h-[2em] lg:min-h-[2em]">
// 					{roleDisplay}<span>_</span>
// 				</h2>

// 				<p>
// 					Just a silly slime trying to enjoy life the human way
// 				</p>

// 				<SocialLinks />
// 			</div>

// 			<div style={{"transform" : "translateX(-100vw)"} as React.CSSProperties} ref={imageRef} className="h-1/2 lg:h-full flex-1 lg:w-1/2 flex items-center justify-center lg:justify-end">
// 				<img src={profileImage} alt="loading..." className="w-full h-full object-cover rounded-2xl" />
// 			</div>
// 		</section>
// 	)
// }