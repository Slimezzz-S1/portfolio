import imageLit from "@/assets/images/epicSection/lit.png"
import imageDark from "@/assets/images/epicSection/dark.png"
import imageEyes from "@/assets/images/epicSection/eyes.png"
import { useEffect, useRef, useState } from "react"
import { animate } from "animejs"
import useClientVisibility from "@/hooks/useClientVisibility"

export default function EpicSection() {
    
    const sectRef = useRef< HTMLDivElement | null >( null )
    const imageLitRef = useRef< HTMLImageElement | null >( null )
    const imageDarkRef = useRef< HTMLImageElement | null >( null )
    const imageEyesRef = useRef< HTMLImageElement | null >( null )
    
    const isVisible = useClientVisibility(imageDarkRef, { threshold : 0.8, rootMargin : "-5% 0px -5% 0px"})
    const [ isActivated, setIsActivated ] = useState< boolean >( false )

    const timersRef = useRef<ReturnType< typeof setTimeout >[] >( [] )

    const clearTimers = () => {
        timersRef.current.forEach((id) => {
            clearTimeout(id)
            // clearInterval(id)
        })

        timersRef.current = []
    }

    useEffect(() => {
        if (!isActivated || !imageLitRef.current || !imageDarkRef.current || !imageEyesRef.current) return 
        const imageLit = imageLitRef.current
        // const imageDark = imageDarkRef.current
        // const imageEyes = imageEyesRef.current
        

        const onActive = () => {
            animate(imageLit, {
                opacity : ["0", "1"],
                duration : 400,
                ease : "outBounce"
            })
        }

        const onInActive = () => {
            animate(imageLit, {
                opacity : ["1", "0"],
                duration : 400,
                ease : "outBounce"
            })
        }

        onActive()

        return () => {
            onInActive()
        }

    }, [ isActivated ])

    useEffect(() => {
        setIsActivated(isVisible)
    }, [ isVisible ])

    return (
        <section ref={sectRef}>
            <div className="relative max-w-2xl mx-auto">
                <div className="absolute top-15 md:top-0 left-0 w-full h-1/2 flex items-center justify-center z-[-1] pointer-events-none">
                    <div className="flex flex-col gap-2">
                        {Array.from({ length : 3 }).map(( _, index ) => (
                            <p className="text-8xl md:text-9xl whitespace-nowrap font-black pointer-events-auto text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white]">
                                3D Artist
                            </p>
                        ))}
                    </div>
                </div>

                <div className="relative w-full aspect-square">
                    <img ref={imageDarkRef} src={imageDark} alt="" className="w-full h-full object-cover" />

                    <img ref={imageLitRef} src={imageLit} alt="" style={{"opacity" : "0"} as React.CSSProperties} className="absolute top-0 left-0 w-full h-full z-10 object-cover" />

                    <img ref={imageEyesRef} src={imageEyes} alt="" className="absolute top-0 left-0 w-full h-full z-20 animate-pulse object-cover" />
                </div>

                <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none flex items-end z-30 p-8">
                    <div className="flex flex-col items-center justify-center w-full h-1/2 pointer-events-auto">
                        <p className="text-8xl sm:text-9xl font-black">
                            Blender
                        </p>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-linear-0 from-root-bg to-none z-20" />
            </div>
        </section>
    )
}