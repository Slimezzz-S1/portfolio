// DATA
import { projectData } from "@/libs/data"

// ASSETS
import unknownImage from "@/assets/images/projects/Unknown.png"

// COMPONENTS
import { useEffect, useRef, useState } from "react"
import { animate } from "animejs"
import useClientVisibility from "@/hooks/useClientVisibility"
import { SectionTitle } from "@/components/main/Section"

export type ProjectCardMode = "image-only" | "video-only" | "hybrid"
export type ProjectStatus = "finished" | "unfinished" | "scrapped" | "work-in-progress" | "prototype" | "abandoned"

export interface ProjectProps {
	name : string
	summary : string
	url : string
	image? : string
	video? : string
	mode? : ProjectCardMode
	currentStatus? : ProjectStatus
	currestStatusReason? : string
}

interface ProjectCardProps extends ProjectProps {
	isActivatedManually? : boolean
	isActivatedManuallyValue? : boolean
	ref? : React.Ref< HTMLDivElement >
	onComplete? : () => void
	onBegin? : () => void
	className? : string
	style? : React.CSSProperties
}
interface ProjectSectionProps {
	projectData? : ProjectProps[]
}

const resolveCardType : (image? : string, video? : string, mode? : ProjectCardMode) => ProjectCardMode | null = (image?, video?, mode?) => {
	return mode ? mode :
	image && video ? "hybrid" :
	!video ? "image-only" :
	!image ? "video-only" : 
	null
}

const projects = projectData

export default function ProjectSection({ projectData = projects } : ProjectSectionProps) {
	return (
		<section className="p-8">
			<SectionTitle text="Projects" direction="end" />

			<div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 flex-col gap-4">
				{projectData.map((item, index) => {
					return (
						<ProjectCard
							key={index}
							name={item.name}
							summary={item.summary}
							className="transition-transform duration-500"
							url={item.url}
							image={item.image}
							video={item.video}
							mode={item.mode}
							currentStatus={item.currentStatus}
							currestStatusReason={item.currestStatusReason}
						/>
					)
				})}
			</div>
		</section>
	)
}

export function ProjectSectionLive({ projectData = projects } : ProjectSectionProps) {
	const sectRef = useRef< HTMLDivElement | null >( null )
	const isVisible = useClientVisibility(sectRef, { threshold : 0.1 })
	const [ currentIndex, setCurrentIndex ] = useState< number >( 0 )
	const cardRefs = useRef< HTMLDivElement[]>( [] )
	const cardModeRefs = useRef< (ProjectCardMode | null)[] >( [] )

	// console.log(cardModeRefs)

	const onComplete = () => {
		if (!cardModeRefs.current) return

		setCurrentIndex((prev) => nextIndex(cardModeRefs.current, prev))
		// setCurrentIndex((prev) => ( prev + 1 ) % cardRefs.current.length)
	}

	const nextIndex : (modes : (ProjectCardMode | null)[], current : number) => number  = (modes, current) => {
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
							currentStatus={item.currentStatus}
							currestStatusReason={item.currestStatusReason}
						/>
					)
				})}
			</div>
		</section>
	)
}

export function ProjectCard({ name, summary, url, image, video, mode, isActivatedManually, isActivatedManuallyValue = false, onComplete, onBegin, currentStatus, currestStatusReason, className, style, ref } : ProjectCardProps) {
	const currentMode = resolveCardType(image, video, mode)!
	const rootRef = useRef< HTMLDivElement | null >( null )
	const imageRef = useRef< HTMLImageElement | null >( null )
	const videoRef = useRef< HTMLVideoElement | null >( null )
	const titleRef = useRef< HTMLHeadingElement | null>( null )

	const isVisible = useClientVisibility(rootRef, { threshold : 0.5 })
	const [ isActivated, setIsActivated ] = useState< boolean >( false )

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
		// console.log(isActivated, isVisible)
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

	return (
		<div ref={setRootRef} className="group">
			<div style={style as React.CSSProperties} className={"relative w-full h-full max-h-160 aspect-3/4 border-3 rounded-2xl overflow-hidden" + " " + className}>
				<div className="w-full h-full overflow-hidden">
					<div className="relative w-full h-full group-hover:scale-110 transition-transform duration-600">
						<img ref={imageRef} src={image ?? unknownImage} alt="" className="w-full h-full object-cover" />

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

					{( !currentStatus || currentStatus === "finished" ) && (
						<div className="flex gap-3">
							<a href={url} className="px-3 py-2 border-3 rounded-3xl flex-1 transition-all active:scale-95 hover:bg-root-fg hover:text-root-bg hover:border-root-bg active:bg-root-fg/80">
								Check it out
							</a>
						</div>
					)}

				</div>

				{currentStatus && currentStatus !== "finished" && (
					<div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center transition-transform group-hover:scale-115 duration-500">
						<div className="flex flex-col items-center justify-centerp pointer-events-auto">
							<h2 className="text-3xl font-bold">
								{currentStatus.toUpperCase()}
							</h2>

							<p>
								{currestStatusReason}
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}