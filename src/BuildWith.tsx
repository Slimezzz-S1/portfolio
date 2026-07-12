import ZylPicture from './assets/images/zyl_holding.png'
import ZylHandPicture from './assets/images/zyl_holding_hand.png'
import ReactIcon from './assets/icons/language/uil--react.svg?react'
import { useEffect, useRef } from 'react'
import { animate } from 'animejs'

export default function BuildWith() {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        animate(sectionRef.current?.children!, {
                            x: (_el, i) => [i == 0 ? "-100vw" : "100vw", 0],                            
                            duration : 900,
                            ease : "outQuint"
                        })
                        observer.unobserve(sectionRef.current!)
                    }
                })
            },
            {
                root : null,
                rootMargin : "0px",
                scrollMargin : "0px",
                threshold : .75
            }
        )

        observer.observe(sectionRef.current!)
    }, [])

    return (
        <section ref={sectionRef} className='relative overflow-hidden h-196 flex flex-col lg:flex-row-reverse lg:justify-center items-center gap-12 p-10'>
            <div style={{"transform" : "translateX(-100vw)"}}>
                <h1 className='text-8xl lg:text-9xl text-center font-bold lg:font-black'>
                    Built with
                </h1>

                <p className='font-mono'>
                    Along with : TypeScript + Tailwind + AnimeJS
                </p>
            </div>

            <div className='max-w-3xl h-full' style={{"transform" : "translateX(100vw)"}}>
            <div className='relative'>
                <img src={ZylPicture} alt="" className='w-full object-contain' />
                <img src={ZylHandPicture} alt="" className='absolute top-0 left-0 w-full object-contain z-20' />

                <div className='absolute top-[18%] left-[1%] w-[40%] aspect-square z-10'>
                    <ReactIcon className='animate-[spinControl_3s_linear_infinite] text-[#00c8ff] drop-shadow-[0px_0px_20px_#7be2ff,0px_0px_50px_#00f]' />
                </div>
            </div>
            </div>

            <div className='absolute bottom-0 left-0 bg-linear-to-t from-black to-none w-full h-[20%] z-20' />
        </section>
    )
}