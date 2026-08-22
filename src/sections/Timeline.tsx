import { animate } from "animejs"
import { useEffect, useState, useRef, type Ref, type RefObject, type SetStateAction, useSyncExternalStore } from "react"
import { createPortal } from "react-dom"

export interface timelineEventProps {
    title : string
    date : Date
    summary : string
    description : string
    image : string | string[]
    color : string
}

const timelineData : timelineEventProps[] = [
    {
        title : "3D Era",
        date : new Date("12 September 2022"),
        summary : "The start of 3D journey",
        description : "I started learning 3D animation when i was 11 years old*, I used MineImator at the time. Yes, it sucked, but at least I learned the basic of 3D animation",
        image : "",
        color : "#ea4c1d"
    },
    {
        title : "Blender",
        date : new Date ("06 May 2024"),
        summary : "That time I switched to Blender",
        description : "After years of not animating, a sudden rush of motivation rained me, so I tried Blender for the first time, specifically 2.93. At first, I was frustrated because I was overwhelmed by the amount of UI buttons scattered everywhere. I ragequitted once, but I simply tried it again after weeks of rehab.",
        image : "",
        color : "#e1790d"
    },
    {
        title : "Coding era",
        date : new Date("12 October 2024"),
        summary : "Python",
        description : "Right before I graduated from middle school, I became curios of programming because of the rigify script in blender. I asked AI to do some simple stuff and learned from it. But since AI also sucked at it, I simply watched a tutorial on programming 101, I chose python because I thought it was easy to learn.",
        image : "",
        color : "#356c99"
    },
    {
        title : "Fullstack",
        date : new Date("25 June 2026"),
        summary : "actual progress",
        description : "This is the time where I start to actually learn React, NextJS, and Tailwind.",
        image : "",
        color : "#975bf7"
    }
]

interface timelinePinProps extends timelineEventProps {
    isFirstChild? : boolean
    isLastChild? : boolean
    onClick? : () => void
    isClicked : boolean
}

function TimelinePin({ title, date, summary, description, image, isFirstChild, isLastChild, onClick, color, isClicked } : timelinePinProps) {
    const [isHovering, setIsHovering] = useState(false)
    const summaryRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isHovering) {
            animate(summaryRef.current!, {
                opacity : ["0", "1"],
                y : ["0"],
                duration : 600,
            })

        } else {
            animate(summaryRef.current!, {
                opacity : ["1", "0"],
                y : ["-50%"],
                duration : 600,
            })

        }   
    }, [isHovering])

    const onClickHandle = () => {
        onClick?.()
    }

    return (
        <>
        <div style={{"--pin-color" : color ?? "#333"} as React.CSSProperties} className={"relative p-3 hover:bg-(--pin-color) transition-colors aspect-square rounded-full " + (isClicked ? "bg-(--pin-color)" : "bg-gray-600")} onClick={onClickHandle}>
            <div
                className={"absolute top-0 w-56 h-32 2xl:left-[-6rem] " + (
                    isFirstChild ? "left-0" :
                    isLastChild ? "right-0" : 
                    "left-[-6rem]"
                )}

                onMouseEnter={() => setIsHovering(true)}

                onMouseLeave={() => setIsHovering(false)}
            >
                <div ref={summaryRef} className={"absolute top-0 left-0 pt-7 w-full flex flex-col 2xl:items-center pointer-events-none " + (isFirstChild ? "items-start" : isLastChild ? "items-end" : "items-center")}>
                    <h1 className="text-3xl font-bold">
                        {title}
                    </h1>

                    <p>
                        {date.toLocaleDateString()}
                    </p>

                    <p className="text-xl whitespace-nowrap">
                        {summary}
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}

export function Timeline({ timelineList = timelineData, className } : { timelineList? : timelineEventProps[], className? : string }) {
    const [currentTimeline, setCurrentTimeline] = useState("")
    const [currentTimelineData, setCurrentTimelineData] = useState<timelineEventProps | null>(null)

    useEffect(() => {
        if (!currentTimeline) return

        timelineList.forEach((item) => {
            if (item.title == currentTimeline) {
                setCurrentTimelineData(item)
            }
        })

    }, [
        currentTimeline
    ])

    return (
        <>
        <div className={"mb-32 " + (className ?? "")}>
            <div className="relative p-1 bg-gray-800 rounded-2xl w-full">
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between gap-8">
                    {timelineList.map((item, index) => ( <TimelinePin key={item.date.toISOString()} title={item.title} date={item.date} summary={item.summary} description={item.description} image={item.image} isFirstChild={index == 0 ? true : false} isLastChild={index == (timelineList.length - 1) ? true : false} onClick={() => {setCurrentTimeline(item.title)}} color={item.color} isClicked={currentTimelineData?.date.toISOString() == item.date.toISOString() ? true : false} /> ))}
                </div>
            </div>
        </div>
        {currentTimeline && currentTimelineData && (
            <TimelineDetail props={currentTimelineData!} />
        )}
        </>
    )
}

function TimelineDetail({ props } : { props : timelineEventProps }) {
    const divRef = useRef<HTMLDivElement>(null)
    const [isTransition, setIsTransition] = useState(true)

    useEffect(() => {
        animate(divRef.current!, {
            opacity : [
                "0", 
                "1"
            ],
            y: [
                "-50%",
                "0"
            ],
            duration : 600,
            onBegin : () => {setIsTransition(true)},
            onComplete : () => {setIsTransition(false)}
        })
    }, [props.title])

    return createPortal(
        <div style={{"--pin-color" : props.color ?? "white", "pointerEvents" : isTransition ? "none" : "all"} as React.CSSProperties} ref={divRef} className="flex flex-col items-center gap-4 border-4 border-(--pin-color) rounded-2xl w-full min-h-96 p-8 px-16 bg-background">
            <h1 className="text-8xl 2xl:self-start font-bold">
                {props.title}
            </h1>

            <div className="flex justify-between w-full">
                <p>
                    {props.date.toLocaleDateString()}
                </p>

                <p>
                    {props.summary}
                </p>
            </div>

            <div className="p-0.5 bg-(--pin-color) w-full rounded-2xl" />

            <p className="self-start">
                {props.description}
            </p>
        </div>,
        document.querySelector(".timeline-detail")!
    )
}

export default function TimelineSection() {
    return (
        <section className="min-h-180">
            <h1 className="text-8xl font-black text-center mb-16">
                Timeline
            </h1>

            <Timeline />

            <div className="timeline-detail flex justify-center items-center min-h-64" />
        </section>
    )
}