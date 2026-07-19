import { animate } from "animejs"
import { useEffect, useState, useRef, type Ref, type RefObject, type SetStateAction, useSyncExternalStore } from "react"
import { createPortal } from "react-dom"

export interface timelineEventProps {
    title : string
    date : Date
    summary : string
    description : string
    image : string | string[]
}

const timelineData : timelineEventProps[] = [
    {
        title : "3D Era",
        date : new Date("12 September 2022"),
        summary : "The start of 3D journey",
        description : "I remember creating animations on Mine Imator when i was like 13 years old",
        image : ""
    },
    {
        title : "Blender",
        date : new Date ("06 May 2024"),
        summary : "That time I switched to Blender",
        description : "ef;ekrhkg",
        image : ""
    },
    {
        title : "Coding era",
        date : new Date("12 October 2024"),
        summary : "Python",
        description : "e;fhwel",
        image : ""
    },
    {
        title : "Fullstack",
        date : new Date("25 June 2026"),
        summary : "actual progress",
        description : "This is the time where I start to actually learn frameworks like React",
        image : ""
    }
]

interface timelinePinProps extends timelineEventProps {
    isFirstChild? : boolean
    isLastChild? : boolean
    onClick? : () => void
}

function TimelinePin({ title, date, summary, description, image, isFirstChild, isLastChild, onClick } : timelinePinProps) {
    const [isHovering, setIsHovering] = useState(false)
    const summaryRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isHovering) {
            animate(summaryRef.current!, {
                opacity : ["0", "1"],
                y : ["-50%", "0"],
                duration : 600,
            })
        } else {
            animate(summaryRef.current!, {
                opacity : ["1", "0"],
                y : ["0", "-50%"],
                duration : 600,
            })
        }   
    }, [isHovering])

    const onClickHandle = () => {
        onClick?.()
    }

    return (
        <>
        <div className="relative p-3 bg-gray-400 aspect-square rounded-full" onClick={onClickHandle}>
            <div
                className={"absolute top-0 w-56 h-32 border 2xl:left-[-6rem] " +
                    (isFirstChild ? "left-0" :
                    isLastChild ? "right-0" : 
                    "left-[-6rem]")
                }

                onMouseEnter={() => setIsHovering(true)}

                onMouseLeave={() => setIsHovering(false)}
            >
                <div ref={summaryRef} className={"absolute top-0 left-0 pt-5 w-full flex flex-col 2xl:items-center pointer-events-none " + (isFirstChild ? "items-start" : isLastChild ? "items-end" : "items-center")}>
                    <h1 className="text-2xl font-bold">
                        {title}
                    </h1>

                    <p>
                        {date.toLocaleDateString()}
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
                    {timelineList.map((item, index) => ( <TimelinePin key={item.date.toISOString()} title={item.title} date={item.date} summary={item.summary} description={item.description} image={item.image} isFirstChild={index == 0 ? true : false} isLastChild={index == (timelineList.length - 1) ? true : false} onClick={() => {setCurrentTimeline(item.title)}} /> ))}
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

    useEffect(() => {
        animate(divRef.current!, {
            opacity : ["0", "1"],
            y: ["-100%", "0"],
            duration : 600
        })
    }, [])

    return createPortal(
        <div ref={divRef} className="flex flex-col items-center gap-4 border-2 rounded-2xl w-fit p-8 px-16">
            <h1 className="text-5xl font-bold">
                {props.title}
            </h1>

            <p className="self-start">
                {props.date.toLocaleDateString()}
            </p>

            <div className="p-0.5 bg-foreground w-full rounded-2xl" />

            <p className="self-start">
                {props.description}
            </p>
        </div>,
        document.querySelector(".timeline-detail")!
    )
}

export default function TimelineSection() {
    return (
        <section className="min-h-64">
            <h1 className="text-5xl font-black text-center mb-16">
                Timeline
            </h1>

            <Timeline />

            <div className="timeline-detail flex justify-center items-center min-h-64" />
        </section>
    )
}