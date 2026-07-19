// @ts-ignore
import Flickity from 'flickity'
import 'flickity/css/flickity.css'
import { useEffect, useRef } from 'react'

const modules : Record<string, unknown> = import.meta.glob("../assets/images/gallery/**", {eager : true, query : "?url", import : "default"})

const getImages : (folderName : string) => string[] = (folderName) => {
    const images : string[] = []

    for (const module in modules) {
        // const p = new URL(module, import.meta.url).href
        // if (p.includes(folderName)) images.push(p)
        if (module.includes(folderName)) images.push(modules[module] as string)
    }

    return images
}

const zylImages : string[] = getImages("zyl")

export default function Carousel({ images = zylImages } : {images? : string[]}) {
    const carouselfRef = useRef<HTMLDivElement>(null)
    const flickityRef = useRef<Flickity | null>(null)

    useEffect(() => {
        if (!carouselfRef.current) return
        flickityRef.current = new Flickity(carouselfRef.current, {
            autoPlay : true,
            imagesLoaded : true,
            percentPosition : false,

        })

        

        return () => flickityRef.current?.destroy()

    }, [])

    return (
        <div ref={carouselfRef} className="h-128 overflow-hidden">
            {images.map((image, index) => (
                <div key={index} className='aspect-square h-full overflow-hidden p-2'>
                    <img src={image} alt="" className="w-full h-full object-cover rounded-2xl" />
                </div>
            ))}
        </div>
    )
}