import imageLit from "@/assets/images/epicSection/lit.png"
import imageDark from "@/assets/images/epicSection/dark.png"

import imageEyes from "@/assets/images/epicSection/eyes.png"
import imageEyesDark from "@/assets/images/epicSection/eyesDark.png"
import { useEffect, useRef, useState } from "react"
import { animate, random, stagger } from "animejs"
import useClientVisibility from "@/hooks/useClientVisibility"

export default function EpicSection() {
    
    const sectRef = useRef< HTMLDivElement | null >( null )

    const rootImageRef = useRef< HTMLDivElement | null >( null )

    const imageLitRef = useRef< HTMLImageElement | null >( null )
    const imageDarkRef = useRef< HTMLImageElement | null >( null )
    const imageEyesRef = useRef< HTMLImageElement | null >( null )

    const intersectRef = useRef< HTMLDivElement | null >( null )
    const rootMainRef = useRef< HTMLHeadingElement | null >( null )
    const backTextsRef = useRef< HTMLDivElement | null >( null )
    
    const isVisible = useClientVisibility(imageDarkRef, { threshold : 0.8, rootMargin : "-5% 0px -5% 0px"})
    const [ isVisibleOnce, setIsVisibleOnce ] = useState< boolean >( false )
    const [ isActivated, setIsActivated ] = useState< boolean >( false )
    const [ isFinishedTransition, setIsFinishedTransition ] = useState< boolean >( false )

    const timersRef = useRef<ReturnType< typeof setTimeout >[] >( [] )

    const clearTimers = () => {
        timersRef.current.forEach((id) => {
            clearTimeout(id)
            // clearInterval(id)
        })

        timersRef.current = []
    }

    useEffect(() => {
        if (!isActivated || !imageLitRef.current || !imageDarkRef.current || !imageEyesRef.current) return  () => {
            clearTimers()
        }

        const imageLit = imageLitRef.current
        // const imageDark = imageDarkRef.current
        // const imageEyes = imageEyesRef.current

        const onInterval = () => {
            const number : number = Number(Math.random().toFixed(1))

            // console.log(number)

            switch ( true ) {

                case number >= 0.8:
                    animate(imageLit, {
                        opacity : ["1", "0", "1"],
                        duration : 700,
                        ease : "inElastic"
                    })
                    break
                
                case number >= 0.5:
                    animate(imageLit, {
                        opacity : ["1", "0", "1"],
                        duration : random(400, 800),
                        ease : "outBounce"
                    })
                    break
                    
                case number === 0.2:
                    animate(imageLit, {
                        opacity : ["1", "0"],
                        duration : 400,
                        ease : "outBack"
                    })
                    break

                case number === 0.1:
                    animate(imageLit, {
                        opacity : ["0", "1", "0"],
                        duration : random(300, 500),
                        ease : "outBack(4)"
                    })
                    break
                
                default:
                    return
            }
        }
        

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

        const interval = setInterval(onInterval, 1000)
        timersRef.current.push(interval)

        return () => {
            onInActive()
            clearTimers()
        }
    }, [ isActivated ])

    useEffect(() => {
        if ( isVisible ) {
            setIsVisibleOnce(true)
        }

        setIsActivated(isVisible && isFinishedTransition)
    }, [ isVisible, isFinishedTransition ])

    useEffect(() => {
        if (!isVisibleOnce) return
        if (!backTextsRef.current || !rootMainRef.current || !rootImageRef.current) return

        animate(rootImageRef.current, {
            opacity : ["0", "1"],
            duration : 1200,
            ease : "outSine"
        })

        animate(backTextsRef.current.children, {
            y : (_, index) => [ `-${90 * ( index! + 1 )}%` , "0"],
            opacity : ["0", "1"],
            duration : 800,
            ease : "outCubic",
            delay : stagger(200)
        })

        animate(rootMainRef.current, {
            y : ["50%", "0"],
            opacity : ["0", "1"],
            delay : 800 + 200,
            duration : 800,
            ease : "outCubic",
            onComplete : () => {
                setIsFinishedTransition(true)
            }
        })

        return
    }, [ isVisibleOnce ])

    return (
        <section ref={sectRef}>
            <div className="relative max-w-2xl mx-auto">
                <div className="absolute top-15 md:top-0 left-0 w-full h-1/2 flex items-center justify-center z-0 pointer-events-none">
                    <div ref={backTextsRef} className="flex flex-col gap-2">
                        {["3D Artist", "Developer", "Video Editor"].map(( item, index ) => (
                            <p key={index} style={{"opacity" : "0", "transform" : `translateY(-${90 * ( index + 1)}%)`} as React.CSSProperties} className="text-7xl sm:text-8xl md:text-8xl whitespace-nowrap font-black pointer-events-auto text-center text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white]">
                                {item}
                            </p>
                        ))}
                    </div>
                </div>

                <div style={{"opacity" : "0"} as React.CSSProperties} ref={rootImageRef} className="relative w-full aspect-square overflow-hidden pointer-events-none select-none">
                    <img ref={imageDarkRef} src={imageDark} alt="" className="w-full h-full object-cover" />

                    <img ref={imageLitRef} src={imageLit} alt="" style={{"opacity" : "0"} as React.CSSProperties} className="absolute top-0 left-0 w-full h-full z-10 object-cover" />

                    <img ref={imageEyesRef} src={imageEyes} alt="" className="absolute top-0 left-0 w-full h-full z-20 animate-pulse object-cover" />

                    <img src={imageEyesDark} alt="" className="absolute top-0 left-0 w-full h-full z-10" />

                    <div className="absolute bottom-0 left-0 w-full h-full">
                        <div style={{"--y" : "50%"} as React.CSSProperties} className="absolute bottom-1 left-0 w-full h-3/5 bg-linear-0 from-blue-400 to-none z-[-2] animate-bob" />

                        <div className="absolute bottom-0 left-0 w-full h-full bg-linear-90 from-root-bg via-transparent to-root-bg" />
                    </div>

                    <div ref={intersectRef} className="absolute top-1/2 left-0 w-full h-[15px] z-40" />
                </div>

                <div ref={rootMainRef} style={{"opacity" : "0", "transform" : "translateY(50%)"} as React.CSSProperties} className="absolute bottom-0 left-0 z-40 flex flex-col items-center justify-center gap-3 w-full h-1/2 pointer-events-auto">
                    <p className="text-8xl sm:text-9xl font-black text-center">
                        Zyl
                    </p>
                </div>


                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-linear-0 from-root-bg to-none z-20" />
            </div>
        </section>
    )
}

// interface backTextProps {
//     isActivatedManually? : boolean
//     isActivatedManuallyValue? : boolean

//     items? : string[]
//     useDefaultWrapper? : boolean
//     ref? : RefObject< HTMLDivElement | null>
// }

// function BackTexts({ items = [ "3D Artist", "Developer", "Video Editor" ], useDefaultWrapper = true, ref, isActivatedManually, isActivatedManuallyValue } : backTextProps) {
//     const rootRef = useRef< HTMLDivElement | null >( null )
//     const [ isActivated, setIsActivated ] = useState< boolean >( false )
//     const isVisible = useClientVisibility(rootRef, { threshold : 0.5 })

//     if ( useDefaultWrapper ) {
//         return (
//             <div>
//                 {items.map(( item, index ) => (
//                     <p key={item} style={{"opacity" : "0", "transform" : `translateY(-${90 * ( index + 1)}%)`} as React.CSSProperties} className="text-7xl sm:text-8xl md:text-8xl whitespace-nowrap font-black pointer-events-auto text-center text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white]" >
//                         {item}
//                     </p>
//                 ))}
//             </div>
//         )
//     }
// }