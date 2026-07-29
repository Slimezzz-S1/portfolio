import SocialLinks from "@/components/SocialLink"
import profileImage from "@/assets/images/hero.jpg"

import { useEffect, useRef, useState } from "react"
import { animate } from "animejs"

export default function Hero() {
    const roles = [
        "Fullstack Developer",
        "3D Artist",
        "masukkan teks"
    ]
    const [currentRoleIndex, setCurrentRoleIndex] = useState<number>(0)
    const [currentRole, setCurrentRole] = useState<string>("")

    const delayEachLetter : number = 25
    const textIdleAmount : number = 2000

    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [isVisibleOnce, setIsVisibleOnce] = useState<boolean>(false)

    const [isCursorBlinked, setIsCursorBlinked] = useState<boolean>(false)

    const sectRef = useRef<HTMLDivElement>(null)

    const changeText = (currentText : string, nextText : string, onComplete? : () => void, onBegin? : () => void, onHalfWay? : () => void) => {
        const currentTextLength : number = currentText.length
        const nextTextLength : number = nextText.length

        onBegin?.()

        for (let i : number = currentTextLength; i > -1; i--) {
            setTimeout(() => {
                setCurrentRole(currentText.slice(0, i))
            }, delayEachLetter * (currentTextLength - i))
        }

        setTimeout(() => {
            onHalfWay?.()

            for (let i : number = 0; i < nextTextLength + 1; i++) {
                setTimeout(() => {
                    setCurrentRole(nextText.slice(0, i))
                }, delayEachLetter * i)
            }
        }, delayEachLetter * currentTextLength)

        setTimeout(() => {
            onComplete?.()
        }, delayEachLetter * currentTextLength + (delayEachLetter * nextTextLength))
    }

    useEffect(() => {
        if (!sectRef) return

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisibleOnce(true)

                    setIsVisible(true)
                } else {
                    setIsVisible(false)
                }
            })
        })

        observer.observe(sectRef.current!)

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (isVisible) {
            console.log("yes")
        } else {
            console.log("no")
        }
    }, [isVisible])

    useEffect(() => {
        if (!isVisible) return

        const interval = setInterval(() => {
            setIsCursorBlinked(prev => !prev)
            // console.log("blink")
        }, 650)

        return () => clearInterval(interval)
    }, [isVisible])

    useEffect(() => {
        changeText(currentRole, roles[currentRoleIndex])
        console.log(currentRoleIndex)

        return () => {}
    }, [currentRoleIndex])

    return (
        <section ref={sectRef} className="flex flex-col-reverse lg:flex-row items-stretch justify-between min-h-200">
            <div className="flex flex-col gap-4 items-start lg:justify-center justify-start flex-1 pl-10 lg:max-w-1/2">
                <h3 className="text-lg">
                    Hi, I'm
                </h3>

                <h1 className="text-7xl font-black min-h-[2em] whitespace-break-spaces max-w-full">
                    {currentRole}
                    <span style={{"color" : isCursorBlinked ? "black" : "white"}}>
                        _
                    </span>
                </h1>

                <p>
                    Just a silly slime trying to enjoy life the human way
                </p>

                <SocialLinks />
            </div>

            <div className='flex lg:justify-end justify-center items-center rounded;r-2xl p-10 lg:p-0 lg:pr-10 flex-1'>
                <div className='lg:h-128 h-full overflow-hidden rounded-2xl aspect-3/4'>
                    <img src={profileImage} className='w-full h-full object-cover' />
                </div>
            </div>
        </section>
    )
}

export function Herotmp() {
    const sectRef = useRef<HTMLDivElement>(null)
    const roles = [
        "Fullstack Developer",
        "3D Artist",
        "Masukkan teks"
    ]
    const delayEachLetter : number = 25
    const textIdleAmount : number = 2000
    const [currentRole, setCurrentRole] = useState<string>("")
    const [isAnimating, setIsAnimating] = useState<boolean>(false)
    const [roleIndex, setRoleIndex] = useState<number>(0)

    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [isVisibleFirstTime, setIsVisibleFirstTime] = useState<boolean>(false)

    const [isBlinked, setIsBlinked] = useState<boolean>(false)
    const [isBlinking, setIsBlinking] = useState<boolean>(false)

    const changeText = (currentText : string, nextText : string, onComplete? : () => void, onBegin? : () => void, onHalfWay? : () => void) => {
        const currentTextLength = currentText.length
        const nextTextLength = nextText.length

        onBegin?.()

        for (let i : number = currentTextLength; i > -1; i--) {
            setTimeout(() => {
                // console.log(currentText.slice(0, i))
                setCurrentRole(currentText.slice(0, i))
            }, delayEachLetter * (currentTextLength - i))
        }

        setTimeout(() => {
            onHalfWay?.()

            for (let i : number = 0; i < nextTextLength + 1; i++) {
                setTimeout(() => {
                    setCurrentRole(nextText.slice(0, i))
                    // console.log(nextText.slice(0, i))
                }, delayEachLetter * i)
            }
        }, delayEachLetter * currentTextLength)

        setTimeout(() => {
            onComplete?.()
        }, delayEachLetter * currentTextLength + (delayEachLetter * nextTextLength))
    }

    useEffect(() => {
        if (!sectRef) return

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisibleFirstTime(true)

                    setIsVisible(true)
                } else {
                    setIsVisible(false)
                }
            })
        })

        observer.observe(sectRef.current!)

        // changeText(currentRole, roles[1])

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!isBlinking) return

        const interval = setInterval(() => {
            setIsBlinked(prev => !prev)
            // console.log("blink")
        }, 700)


        return () => clearInterval(interval)
    }, [isBlinking])

    useEffect(() => {
        if (isVisible) {
            setIsBlinking(true)
            setIsAnimating(true)
        } else {
            setIsBlinking(false)
        }
    }, [isVisible])

    useEffect(() => {
        if (!isAnimating) return
        changeText(currentRole, roles[roleIndex], () => {setIsAnimating(false); setRoleIndex(prev => (prev + 1) % roles.length)}), () => {setIsAnimating(true)}
    }, [roleIndex])

    useEffect(() => {
        setIsAnimating(true)
    }, [isVisibleFirstTime])

    return (
        <section ref={sectRef} className="flex flex-col-reverse lg:flex-row items-stretch justify-between min-h-200">
            <div className="flex flex-col gap-4 items-start lg:justify-center justify-start flex-1 pl-10 lg:max-w-1/2">
                <h3 className="text-lg">
                    Hi, I'm
                </h3>

                <h1 className="text-7xl font-black min-h-[2em] whitespace-break-spaces max-w-full">
                    {currentRole}
                    <span style={{"color" : isBlinked ? "black" : "white"}}>
                        _
                    </span>
                </h1>

                <p>
                    Just a silly slime trying to enjoy life the human way
                </p>

                <SocialLinks />
            </div>

            <div className='flex lg:justify-end justify-center items-center rounded;r-2xl p-10 lg:p-0 lg:pr-10 flex-1'>
                <div className='lg:h-128 h-full overflow-hidden rounded-2xl aspect-3/4'>
                    <img src={profileImage} className='w-full h-full object-cover' />
                </div>
            </div>
        </section>
    )
}