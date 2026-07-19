import { animate, stagger } from "animejs"
import { useEffect, useRef } from "react"

export default function Gallery() {
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
//    const images = Object.values(import.meta.glob(`../assets/images/gallery/zyl/*.{png,jpg,jpeg,PNG,JPEG}`, { eager: true, as: 'url' }))
 
    const zylImages : string[] = getImages("zyl")
    
    // const photoshopImages : string[] = getImages("photoshop")

    return (
        <section>
            <div className="mb-8 flex gap-8">
                <div className="flex-1 p-0.5 bg-foreground my-auto rounded-l-lg" />

                <h1 className="text-7xl font-bold">
                    Gallery
                </h1>

                <div className="flex-1 p-0.5 bg-foreground my-auto rounded-r-lg" />
            </div>

            <div className="gap-4 columns-2 md:columns-3 xl:columns-4">
                <Images images={zylImages} className="mb-4 rounded-2xl " isAnimateOnVisible={true} />

                {/* <Images images={photoshopImages} className="mb-4" /> */}
            </div>
        </section>
    )
}

export function Images({ images, className, isAnimateOnVisible } : { images : string[], className? : string, isAnimateOnVisible? : boolean }) {
    const divRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isAnimateOnVisible) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animate(divRef.current?.children!, {
                            opacity: ["0", "1"],
                            y : ["-100%", "0"],
                            delay : stagger(50)
                        })

                        observer.unobserve(divRef.current!)
                    }
                })
            },
            {
                threshold : 0.1
            }
        )

        observer.observe(divRef.current!)

        return () => observer.disconnect()
    }, [])
    return (
        <div ref={divRef}>
            {images.map((image, index) => (
                <img key={index} src={image} alt="" className={className} style={isAnimateOnVisible ? {"opacity" : "0"} : {}} />
            ))}
        </div>
    )
}