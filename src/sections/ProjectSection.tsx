// assets
import projectImage1 from "@/assets/hybrid/projects/posterzzz/image.png"
import projectVideo1 from "@/assets/hybrid/projects/posterzzz/video.mp4"

import projectImage2 from "@/assets/hybrid/projects/s11me/image.png"
import projectVideo2 from "@/assets/hybrid/Projects/S11ME/video.mp4"

import projectImage3 from "@/assets/hybrid/projects/grits/image.png"
import projectVideo3 from "@/assets/hybrid/projects/grits/video.mp4"

import projectImage4 from "@/assets/images/Projects/1728482881444.jpg"

import PauseIcon from "@/icons/projects/at-icons--pause.svg?react"
import PlayIcon from "@/icons/projects/basil--play-solid.svg?react"

// components
import { useEffect, useRef, useState } from "react"
import { animate } from "animejs"
import useClientVisibility from "@/hooks/useClientVisibility"

type projectCardMode = "image-only" | "video-only" | "hybrid"
export interface projectProps {
	name : string
	summary : string
	url : string
	image? : string
	video? : string
	mode? : projectCardMode
}

interface projectCardProps extends projectProps {
	isActivatedManually? : boolean
	isActivatedManuallyValue? : boolean
	ref? : React.Ref< HTMLDivElement >
	onComplete? : () => void
	onBegin? : () => void
	className? : string
	style? : React.CSSProperties
}

export const projectList : projectProps[] = [
	{
		name : "PosterZZZ",
		summary : "A 4chan knockoff made using Next.js",
		url : "https://posterzzz.vercel.app/",
		image : projectImage1,
		video : projectVideo1
	},
	{
		name : "S11ME",
		summary : "a 3d animation series about random things",
		url : "",
		image : projectImage2,
		video : projectVideo2,
	},
	{
		name : "Grits",
		summary : "X knockoff",
		url : "",
		image : projectImage3,
		video : projectVideo3
	},
	{
		name : "Lorem Ipsum",
		summary : "lorem ipsum",
		url : "",
		image : projectImage4
	},
]

interface projectSectionProps {
	projectData? : projectProps[]
}

const resolveCardType : (image? : string, video? : string, mode? : projectCardMode) => projectCardMode | null = (image?, video?, mode?) => {
	return mode ? mode :
	image && video ? "hybrid" :
	!video ? "image-only" :
	!image ? "video-only" : 
	null
}

export default function ProjectSection({ projectData = projectList } : projectSectionProps) {
	const sectRef = useRef< HTMLDivElement | null >( null )
	const isVisible = useClientVisibility(sectRef, { threshold : 0.1 })
	const [ currentIndex, setCurrentIndex ] = useState< number >( 0 )
	const cardRefs = useRef< HTMLDivElement[]>( [] )
	const cardModeRefs = useRef< (projectCardMode | null)[] >( [] )

	console.log(cardModeRefs)

	const onComplete = () => {
		if (!cardModeRefs.current) return

		setCurrentIndex((prev) => nextIndex(cardModeRefs.current, prev))
		// setCurrentIndex((prev) => ( prev + 1 ) % cardRefs.current.length)
	}

	const nextIndex : (modes : (projectCardMode | null)[], current : number) => number  = (modes, current) => {
		for (let i = 1; i <= modes.length; i++) {
			const next = (current + i) % modes.length
			const mode = modes[next]

			if (mode !== "image-only" && mode !== null) return next
		}
    	return current
	}

	const onClickReset = () => {
		
		setCurrentIndex(0)
	}

	return (
		<section ref={sectRef} className="p-8">
			<h1 className="text-7xl font-black mb-8 pb-6 border-b-3 border-dashed text-right">
				Projects
			</h1>

			<button onClick={onClickReset} className="border-3 px-8 py-2 rounded-3xl mb-4 transition-all hover:bg-root-fg hover:text-root-bg active:scale-95">
				Reset
			</button>

			<div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 flex-col gap-4">
				{projectData.map((item, index) => {
					return (
						<ProjectCard
							key={index}
							ref={(element) => {
								if (element) {
									cardRefs.current[index] = element
									cardModeRefs.current[index] = resolveCardType(item.image, item.video, item.mode)
								}
							}}
							name={item.name}
							summary={item.summary}
							className={"transition-transform duration-500" + " " + (currentIndex === index && isVisible && "scale-105")}
							url={item.url}
							image={item.image}
							video={item.video}
							mode={item.mode}
							onComplete={onComplete}
							isActivatedManually={true}
							isActivatedManuallyValue={currentIndex === index && isVisible}
						/>
					)
				})}
			</div>
		</section>
	)
}

export function ProjectCard({ name, summary, url, image, video, mode, isActivatedManually, isActivatedManuallyValue = false, ref, onComplete, onBegin, className, style } : projectCardProps) {
	const currentMode = resolveCardType(image, video, mode)!
	const rootRef = useRef< HTMLDivElement | null >( null )
	const imageRef = useRef< HTMLImageElement | null >( null )
	const videoRef = useRef< HTMLVideoElement | null >( null )
	const titleRef = useRef< HTMLHeadingElement | null>( null )

	const isVisible = useClientVisibility(rootRef, { threshold : 0.5 })
	const [ isActivated, setIsActivated ] = useState< boolean >( false )
	const [ isActivatedButtonState, setIsActivatedButtonState ] = useState< boolean >( false )

	const timersRef = useRef<ReturnType<typeof setTimeout | typeof setInterval>[]>( [] )

	const clearTimers = () => {
		timersRef.current.forEach(( id ) => clearTimeout( id ))
		timersRef.current = []
	}

	const setRootRef = ( node : HTMLDivElement | null ) => {
		rootRef.current = node

		if (!ref) return

		if ( typeof ref === "function") {
			ref(node)
		} else {
			ref.current = node
		}

		return 
	}

	useEffect(() => {
		setIsActivated(isActivatedManually ? isActivatedManuallyValue : isVisible)
		console.log(isActivated, isVisible)
	}, [ isActivatedManually, isActivatedManuallyValue, isVisible ])

	useEffect(() => {
		if (currentMode !== "hybrid") return
		
		if (!videoRef.current) return
		
		const video : HTMLVideoElement = videoRef.current

		const resetState = () => {
			video.pause()

			animate(video, {
				opacity : ["0", "1"],
				duration : 400,
			})
		}

		if (!isActivated) return () => {
			clearTimers()
			resetState()

			return
		}

		video.play().catch(() => {})


		const fadeToImage = () => {
			animate(video, {
				opacity : ["1", "0"],
				duration : 400,
				onComplete : () => {
					video.pause()
				}
			})
		}
		

		const fadeToVideo = () => {
			animate(video, {
				opacity : ["0", "1"],
				duration : 400,
				onBegin : () => {
					video.play().catch(() => {})
				}
			})
		}

		const runCycle = () => {
			onBegin?.()

			const timeout1 = setTimeout(() => {
				fadeToImage()
			}, 2000)
			timersRef.current.push(timeout1)

			const timeout2 = setTimeout(() => {
				fadeToVideo()
				onComplete?.()
			}, 4000)
			timersRef.current.push(timeout2)
		}

		runCycle()

		const interval = setInterval(() => {
			runCycle()
		}, 6000)
		timersRef.current.push(interval)


		

		return () => {
			clearTimers()
			resetState()
		}
	}, [ isActivated ])

	const onClickPlayButton = () => {
		setIsActivatedButtonState(!isActivatedButtonState)	
	}

	return (
		<div ref={setRootRef} className="group">
			<div style={style as React.CSSProperties} className={"relative w-full h-full max-h-160 aspect-3/4 border-3 rounded-2xl overflow-hidden" + " " + className}>
				<div className="w-full h-full overflow-hidden">
					<div className="relative w-full h-full group-hover:scale-110 transition-transform duration-600">
						<img ref={imageRef} src={image} alt="" className="w-full h-full object-cover" />

						<video ref={videoRef} src={video} muted={true} loop={true} preload="auto" playsInline={true} className="absolute top-0 left-0 w-full h-full object-cover" />
					</div>
				</div>

				<div className="absolute top-0 left-0 w-full h-full bg-linear-0 from-black to-none group-hover:translate-y-12 transition-transform duration-400" />

				<div className="absolute bottom-0 left-0 w-full h-1/2 flex flex-col justify-end p-4 gap-4">
					<h1 ref={titleRef} className="text-5xl font-bold">
						{name}
					</h1>

					<p>
						{summary}
					</p>

					<div className="flex gap-3">
						<a href={url} className="px-3 py-2 border-3 rounded-3xl flex-1 transition-all active:scale-95 hover:bg-root-fg hover:text-root-bg hover:border-root-bg active:bg-root-fg/80">
							Check it out
						</a>

						{currentMode !== "image-only" && (
							<button className="group relative h-full aspect-square border-3 rounded-full hover:bg-root-fg transition-colors hover:text-root-bg hover:border-root-bg">
								<PlayIcon style={{ "--opacity" : isActivated ? "1" :"0"} as React.CSSProperties} className="p-1 transition-opacity opacity-(--opacity)" />

								<PauseIcon style={{ "--opacity" : isActivated ? "0" :"1"} as React.CSSProperties} className="p-2 absolute top-0 left-0 w-full h-full transition-opacity opacity-(--opacity)" />
							</button>
						)}

					</div>

				</div>
			</div>
		</div>
	)
}

// interface playButtonProps {
// 	onClick? : () => void
// 	isToggledManually? : boolean
// 	isToggledManuallyValue? : boolean
// }

// function PlayButton({ onClick, isToggledManually, isToggledManuallyValue = false } : playButtonProps) {
// 	const [ isToggled, setIsToggled ] = useState< boolean >( false )

// 	useEffect(() => {
// 		setIsToggled(isToggledManually ? isToggledManuallyValue : isToggled)
// 	}, [ isToggledManually, isToggledManuallyValue ])

// 	const onClickButton = () => {
// 		setIsToggled(!isToggled)

// 		onClick?.()
// 	}
	
// 	return (
// 		<button className="relative h-full aspect-square border-3 rounded-full" onClick={onClick}>
// 			<PlayIcon style={{ "--opacity" : isToggled ? "1" :"0"} as React.CSSProperties} className="p-1 transition-opacity opacity-(--opacity)" />

// 			<PauseIcon style={{ "--opacity" : isToggled ? "0" :"1"} as React.CSSProperties} className="p-2 absolute top-0 left-0 w-full h-full transition-opacity opacity-(--opacity)" />
// 		</button>
// 	)
// }

// export function ProjectCard({ name, summary, url, image, video, mode, isActivatedManually, isActivatedManuallyValue = false, ref, onComplete, onBegin } : projectCardProps) {
// 	const rootRef = useRef<HTMLDivElement | null>( null )

// 	const imageRef = useRef< HTMLImageElement | null >( null )
// 	const videoRef = useRef< HTMLVideoElement | null >( null )
// 	const titleRef = useRef< HTMLHeadingElement | null >( null )

// 	const currentMode : projectCardMode = mode ?? (
// 		image && video ? "hybrid" :
// 		!image ? "video-only" :
// 		"image-only"
// 	)

// 	const isVisibleAuto = useClientVisibility(rootRef, { threshold : 0.5 })

// 	const [ isVisible, setIsVisible ] = useState< boolean>( false )
// 	const [ isVisibleOnce, setIsVisibleOnce ] = useState< boolean >( false )

// 	const [ isActivated, setIsActivated ] = useState< boolean >( false )

// 	const setRootRef = ( node : HTMLDivElement | null) => {
// 		rootRef.current = node

// 		if (!ref) return

// 		if ( typeof ref === "function") {
// 			ref(node)
// 		} else {
// 			ref.current = node
// 		}
// 	}

// 	useEffect(() => {
// 		if (!imageRef.current || !videoRef.current) return
// 		const video = videoRef.current

// 		if (!isActivated) {
// 			if (!video.paused) video.pause()
// 			video.style.opacity = "0"
// 			return
// 		}

// 		setIsVisibleOnce(true)

// 		if (currentMode === "video-only" || currentMode === "image-only") {
// 			return
// 		}

// 		onBegin?.()

// 		// image showing first (video stays hidden, paused)
// 		video.style.opacity = "0"

// 		// after 2000ms, fade video in and start playing
// 		const toVideoTimeout = setTimeout(() => {
// 			if (video.preload !== "auto") video.preload = "auto"

// 			animate(video, {
// 				opacity: ["0", "1"],
// 				duration: 400,
// 				onBegin: () => {
// 					video.play().catch(() => {})
// 				}
// 			})
// 		}, 2000)

// 		// at 4000ms, this card's turn ends — video just pauses, stays visible
// 		const completeTimeout = setTimeout(() => {
// 			video.pause()
// 			onComplete?.()
// 		}, 4000)

// 		return () => {
// 			clearTimeout(toVideoTimeout)
// 			clearTimeout(completeTimeout)
// 			video.pause()
// 		}
// 	}, [isActivated])

// 	useEffect(() => {
// 		setIsActivated(isActivatedManually ? isActivatedManuallyValue : isVisibleAuto)
// 	}, [isActivatedManually, isActivatedManuallyValue, isVisibleAuto])


// 	useEffect(() => {
// 		if ( !isVisibleOnce || !titleRef.current ) return

// 		const { chars } = splitText(titleRef.current, { chars : true})

// 		animate( chars, {
// 			x : ["-1em", "0"],
// 			opacity : ["0", "1"],
// 			duration : 500,
// 			delay : stagger(150),
// 			ease : "outBack"
// 		})
// 	}, [ isVisibleOnce ])

// 	useEffect(() => {
// 		setIsActivated(isVisible)
// 	}, [ isVisible ])

// 	return (
// 		<div ref={setRootRef} className="group">
// 			<div className="relative w-full h-full max-h-160 aspect-3/4 border-2 rounded-2xl overflow-hidden">
// 				<div className="w-full h-full overflow-hidden">
// 					<div className="relative w-full h-full group-hover:scale-110 transition-transform duration-600">
// 						<img ref={imageRef} src={image} alt="" className="w-full h-full object-cover" />

// 						<video ref={videoRef} src={video} muted={true} loop={true} preload="auto" playsInline={true} className="absolute top-0 left-0 w-full h-full object-cover" ></video>
// 					</div>
// 				</div>

// 				<div className="absolute top-0 left-0 w-full h-full bg-linear-0 from-black to-none group-hover:translate-y-12 transition-transform duration-400" />

// 				<div className="absolute bottom-0 left-0 w-full h-1/2 flex flex-col justify-end p-4 gap-4">
// 					<h1 ref={titleRef} className="text-5xl font-bold">
// 						{name}
// 					</h1>

// 					<p>
// 						{summary}
// 					</p>

// 					<a href={url} className="px-3 py-2 border rounded-2xl transition-all active:scale-95 hover:bg-root-fg hover:text-root-bg hover:border-root-bg active:bg-root-fg/80">
// 						Check it out
// 					</a>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }


// export default function ProjectSection({ projectData = projectList } : projectSectionProps) {
// 	const sectRef = useRef< HTMLDivElement | null >( null )
// 	const isVisible = useClientVisibility(sectRef, { threshold : 0.1 })
// 	const cardRefs = useRef<Map<number, Element>>(new Map())
// 	const [ currentIndex, setCurrentIndex ] = useState< number >( 0 )

// 	const qualifyingIndices = useMemo(() => {
// 		return projectData.reduce< number[] >((acc, item, index) => {
// 			const cardType = resolveCardType(item.image, item.video, item.mode)
// 			if (cardType !== "image-only") {
// 				acc.push(index)
// 			}
// 			return acc
// 		}, [])
// 	}, [])

// 	console.log(currentIndex)
	
// 	return (
// 		<section ref={sectRef} className="p-8">
// 			<h1 className="text-7xl font-black mb-8 pb-6 border-b-3 border-dashed text-right">
// 				Projects
// 			</h1>

// 			<div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 flex-col gap-4">
// 				{projectData.map((item, index) => (
// 					<ProjectCard
// 						ref={(element) => {
// 							if (element && resolveCardType(item.image, item.video, item.mode)) {
// 								cardRefs.current.set(index, element)
// 							} else {
// 								cardRefs.current.delete(index)
// 							}
// 						}}
// 						key={index}
// 						name={item.name}
// 						summary={item.summary}
// 						url={item.url}
// 						image={item.image}
// 						video={item.video}
// 						mode={item.mode}
// 						isActivatedManually={true}
// 						isActivatedManuallyValue={isVisible && qualifyingIndices[currentIndex] === index}
// 						onComplete={() => setCurrentIndex(previous => ( previous + 1 ) % qualifyingIndices.length)}
// 					/>
// 				))}
// 			</div>
// 		</section>
// 	)
// }


// export function ProjectCard({ name, summary, url, image, video, mode } : projectProps) {
// 	const rootRef = useRef<HTMLDivElement | null>(null)
// 	const cardRef = useRef<HTMLDivElement | null>(null)

// 	const imageRef = useRef<HTMLImageElement | null>(null)
// 	const videoRef = useRef<HTMLVideoElement | null>(null)
// 	const mediaRef = useRef<HTMLDivElement | null>(null)

// 	const currentMode = mode ?? ( !image ? "video-only" : "image-only" )

// 	const [isHovering, setIsHovering] = useState<boolean>(false)
// 	const isVisible = useIntersectionObserver(rootRef, { threshold : 0.5 })

// 	useEffect(() => {
// 		if (!isHovering || !rootRef.current || !cardRef.current || !imageRef.current || !videoRef.current || !mediaRef.current) return

// 		const root = rootRef.current
// 		const card = cardRef.current
// 		const media = mediaRef.current
// 			// currentMode === "image-only" ? imageRef.current :
// 			// currentMode === "video-only" ? videoRef.current :
// 			// [ imageRef.current, videoRef.current ]

// 		const onHovered = () => {
// 			animate(media, {
// 				scale : 1.1,
// 				duration : 1200,
// 				ease : "outExpo"
// 			})
// 		}

// 		onHovered()

// 		return () => {
// 			animate(media, {
// 				scale : 1,
// 				duration : 1200,
// 				ease : "outExpo"
// 			})
// 		}
// 	}, [ isHovering ])

// 	useEffect(() => {

// 	}, [ isVisible ])

// 	const onMouseEnter = () => {
// 		setIsHovering(true)
// 	}

// 	const onMouseLeave = () => {
// 		setIsHovering(false)
// 	}

// 	return (
// 		<div ref={rootRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
// 			<div ref={cardRef} className="relative w-full h-full max-h-160 aspect-3/4 border-2 rounded-2xl overflow-hidden">
// 				<div className="w-full h-full overflow-hidden">
// 					<div ref={mediaRef}>
// 						{/* <img ref={imageRef} src={image} alt="" className="w-full h-full object-cover" /> */}

// 						<video ref={videoRef} src={video} autoPlay muted={true} loop={true} ></video>
// 					</div>
// 				</div>

// 				<div style={{"--y" : isHovering ? "0" : "30%"} as React.CSSProperties} className="absolute top-0 left-0 w-full h-full bg-linear-0 from-black to-none translate-y-(--y) transition-transform" />

// 				<div className="absolute bottom-0 left-0 w-full h-1/2 flex flex-col justify-end p-4 gap-4">
// 					<h1 className="text-4xl font-bold">
// 						{name}
// 					</h1>

// 					<p>
// 						{summary}
// 					</p>

// 					<a href={url} className="px-3 py-2 border rounded-2xl transition-all active:scale-95 hover:bg-root-fg hover:text-root-bg hover:border-root-bg active:bg-root-fg/80">
// 						Check it out
// 					</a>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// UNUSED
// export function ProjectCardTmp({ name, summary, url, image } : projectProps) {
// 	const rootRef = useRef<HTMLDivElement | null>(null)
// 	const cardRef = useRef<HTMLDivElement | null>(null)
// 	const imageRef = useRef<HTMLImageElement | null>(null)
// 	const [isHovering, setIsHovering] = useState<boolean>(false)

// 	useEffect(() => {
// 		if (!isHovering || !cardRef.current || !rootRef.current || !imageRef.current) return
		
// 		const card = cardRef.current
// 		const cardRoot = rootRef.current
// 		const image = imageRef.current

// 		const mouseEvent = (e : MouseEvent) => {
// 			const {left, top, width, height} = cardRoot.getBoundingClientRect()

// 			const mouseX = e.clientX - left - width / 2
// 			const mouseY = e.clientY - top - height / 2

// 			const mousePercentX = mouseX / ( width / 2 )
// 			const mousePercentY = mouseY / ( height / 2 )

// 			const maxTilt = 5

// 			animate(image, {
// 				x: mousePercentX * 20,
// 				y: mousePercentY * 20,
// 				scale : 1.1,
// 				duration : 200,
// 				ease : "out(3)",
// 				composition : "replace"
// 			})

// 			animate(card, {
// 				rotateX : mousePercentY * maxTilt * -1,
//                 rotateY : mousePercentX * maxTilt,
// 				duration : 200,
// 				ease : "out(3)",
// 				composition : "replace"
// 			})
// 		}

// 		cardRoot.addEventListener("mousemove", mouseEvent)

// 		return () => {
// 			cardRoot.removeEventListener("mousemove", mouseEvent)

// 			utils.remove(cardRoot)

// 			animate([image, card], {
// 				x: 0,
// 				y: 0,
// 				rotateX : 0,
// 				rotateY : 0,
// 				scale : 1,
// 				duration: 200,
// 				ease: 'out(3)',
// 			})

// 		}
// 	}, [ isHovering ])

// 	return (
// 		<div ref={rootRef} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="relative perspective-near max-w-sm">
// 			<div ref={cardRef} className="relative w-full h-full aspect-3/4 rounded-2xl border-3 transform-3d">
// 				<div className="w-full h-full rounded-2xl pointer-events-none [clip-path:inset(0_round_1rem)] transform-flat">
// 					<img ref={imageRef} src={image} alt="" className="w-full h-full object-cover" />
// 				</div>
	
// 				<div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-0 from-black to-none z-0" />
	
// 				<div className="absolute bottom-0 left-0 w-full h-1/3 flex flex-col justify-end gap-4 p-4">
// 					<p className="text-5xl font-bold">
// 						{name}
// 					</p>
	
// 					<p className="flex-1">
// 						{summary}
// 					</p>
	
// 					<a href={url} className="transition-all border-2 px-3 py-2 rounded-2xl hover:bg-root-fg hover:text-root-bg hover:border-root-bg active:scale-95">
// 						Check it out
// 					</a>
// 				</div>

// 				<div style={{"--z" : isHovering ? "20px" : "0", "--opacity" : isHovering ? "0.5" : "0"} as React.CSSProperties} className="absolute top-0 left-0 w-full h-full border-3 rounded-2xl transition-all translate-z-(--z) pointer-events-none opacity-(--opacity)" />

// 				<div style={{"--z" : isHovering ? "10px" : "0", "--opacity" : isHovering ? "0.25" : "0"} as React.CSSProperties} className="absolute top-0 left-0 w-full h-full border-3 rounded-2xl transition-all translate-z-(--z) pointer-events-none opacity-(--opacity)" />
// 			</div>
// 		</div>
// 	)
// }