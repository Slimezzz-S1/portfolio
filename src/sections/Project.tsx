import { createPortal } from 'react-dom'
import { useState, useRef, useEffect } from 'react'
import { animate } from 'animejs'

import posterZZZ from '../assets/images/PosterZZZ.png'
import contactImage from '../assets/images/Contact Form.png'
import image3 from '../assets/images/son/StQ5quvf-odqJWOa22NCHDtfBXDaQeGAbAwGXIZUVK0.jpg'
import image4 from '../assets/images/son/my-collection-of-son-memes-so-far-v0-d5qtfrwjatzg1.webp'

const projectCardData : projectCardProps[] = [
    {
        title : "PosterZZZ",
        bannerImage : posterZZZ,
        summary : "Twitter/X knockoff made in NextJS",
        description : "I made this in hopes of learning the basics of fullstack web development. I chose NextJS because I love it."
    },
    {
        title : "Contact Form",
        bannerImage : contactImage,
        summary : "Small challenges in Front End Mentor",
        description : "This is my first ever challenges I ever took in Front End Mentor"
    },
    {
        title : "PosterZZZ",
        bannerImage : image3,
        summary : "4chan-like website",
        description : "a"
    },
    {
        title : "Hello Studio",
        bannerImage : image4,
        summary : "A school finals project",
        description : "as"
    }
]

export interface projectCardProps {
    title : string
    bannerImage : string
    summary : string
    description : string
}

export function ProjectCard({title, bannerImage, summary, description} : projectCardProps) {
    const [isDetailed, setIsDetailed] = useState(false)

    return (
        <>
            <div className='bg-background border-3 rounded-2xl overflow-hidden'>
                <div className='h-64'>
                    <img src={bannerImage} alt="" className='w-full h-full object-cover' />
                </div>

                <div className='p-4 border-t flex flex-col'>
                    <h2 className='text-4xl font-bold'>
                        {title}
                    </h2>

                    <p className='min-h-12'>
                        {summary}
                    </p>

                    <button className='p-2 w-3xs max-w-full self-center border rounded-2xl hover:bg-foreground hover:text-background hover:border-background transition-colors' children="Check it out" onClick={() => setIsDetailed(true)} />
                </div>
            </div>
            {isDetailed && <ProjectDetailed onClose={() => setIsDetailed(false)} props={{title, bannerImage, summary, description}} />}
        </>
    )
}

function ProjectDetailed({ onClose, props } : { onClose : () => void, props : projectCardProps}) {
    const [isClosing, setIsClosing] = useState(false)
    const overlayRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isClosing) {
            animate(overlayRef.current!, {
                opacity : ["1", "0"],
                duration : 400
            })

            setTimeout(() => onClose(), 600)
            return
        }

        animate(overlayRef.current!, {
            opacity : ["0", "1"],
            duration : 400
        })
    }, [isClosing])

    return createPortal(
        <div ref={overlayRef} className='bg-[#000a] fixed top-0 left-0 w-screen h-screen z-50 opacity-0 flex justify-center items-center p-10'>
            <div className='bg-background text-foreground border-3 p-10 max-w-full max-h-full w-6xl h-256 flex gap-5 rounded-4xl flex-col lg:flex-row'>
                <div className='flex-1 max-h-64 lg:max-h-full'>
                    <img src={props.bannerImage} alt="" className='w-full h-full object-cover rounded-2xl' />
                </div>

                <div className='bg-white p-0.5' />

                <div className='flex-1 flex flex-col'>
                    <h1 className='text-7xl lg:text-8xl font-black wrap-break-word'>
                        {props.title}
                    </h1>

                    <p className='text-3xl'>
                        {props.summary}
                    </p>

                    <p className='flex-1'>
                        {props.description}
                    </p>

                    <button onClick={() => setIsClosing(true)} className='border p-2 w-2xs rounded-2xl self-center hover:border-background hover:bg-foreground hover:text-background transition-colors'>
                        Close
                    </button>
                </div>
            </div>
        </div>,
        document.body
    )
}

export function ProjectCards({projectCardList = projectCardData} : {projectCardList? : projectCardProps[]}) {
    return (
        <div className='grid gap-10 grid-cols-[repeat(auto-fit,minmax(24rem,1fr))]'>
            {projectCardList.map((project, index) => (
                <ProjectCard
                    key={index}
                    title={project.title}
                    bannerImage={project.bannerImage}
                    summary={project.summary}
                    description={project.description}
                />
            ))}
        </div>
    )
}


export default function Projects() {
    return (
        <section>
            <h1 className="text-6xl font-bold text-center mb-12">
                My Project
            </h1>

            <ProjectCards />
        </section>
    )
}
