import { animate, random, stagger } from "animejs";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function Background() {
    const amount : number = 20
    const circleRefs = useRef<HTMLDivElement[] | []>([])
    const rootRef = useRef<HTMLDivElement | null>(null)
    const [boundingRoot, setBoundingRoot] = useState<DOMRect | null>(null)
    const [isActivated, setIsActivated] = useState<boolean>(true)
    const timersRef = useRef<ReturnType<typeof setTimeout | typeof setInterval>[]>([])

	const clearAllTimeouts = () => {
		timersRef.current.forEach(( id ) => {
			clearTimeout(id)

			return
		})
		timersRef.current = []
	}

    useEffect(() => {
        if (!rootRef.current) return

        setBoundingRoot(rootRef.current.getBoundingClientRect())

    }, [rootRef])

    useEffect(() => {
        if (!isActivated || !boundingRoot || !rootRef.current) {
            clearAllTimeouts()
            return
        }

        const width = boundingRoot?.width
        const height = boundingRoot?.height

        animate(circleRefs.current, {
            x : random(0, width),
            y : (_, index) => [`${100 * index!}%`,"0"],
            delay : stagger(200)
        })

        return () => {
            clearAllTimeouts()
        }
    }, [isActivated, boundingRoot])

    return createPortal(
        <div ref={rootRef} className="fixed top-0 left-0 w-full h-full z-[-1] border-4">
            {Array.from({ length : amount }).map((_, index) => (
                <div
                    ref={(element) => {
                        if (element) {
                            circleRefs.current[index] = element
                        }
                    }}
                    key={index}
                    className="absolute top-0 left-0 w-10 h-10 bg-root-fg rounded-full"
                />
            ))}
        </div>,
        document.querySelector("#root")!
    )
}