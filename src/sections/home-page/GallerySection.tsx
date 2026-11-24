// COMPONENTS
import useClientVisibility from "@/hooks/useClientVisibility"
import getImages from "@/lib/getImages"
import { SectionTitle } from "@/components/main/Section"
import { animate, stagger } from "animejs"
import { useEffect, useRef, useState } from "react"

export default function GallerySection() {
    const cardRef = useRef<HTMLDivElement | null>(null)
    const titleRef = useRef<HTMLDivElement | null>(null)
    const isVisible = useClientVisibility(titleRef, { threshold : 0.3 })
    const [isVisibleOnce, setIsVisibleOnce] = useState<boolean>(false)

    useEffect(() => {
        if (isVisible) setIsVisibleOnce(true)
    }, [isVisible])
        
    useEffect(() => {
        if (!cardRef.current || !isVisibleOnce) return

        animate(cardRef.current.children, {
            opacity : ["0", "1"],
            y : ["-100%", "0"],
            duration : 800,
            delay : stagger(100)
        })
    }, [isVisibleOnce])

    return (
        <section className="p-8">
            <div ref={titleRef}>
                <SectionTitle text="Gallery" direction="end" />
            </div>

			<div ref={cardRef} className="columns-1 sm:columns-2 md:columns-3 lg:columns-4">
				{getImages(["zyl"]).map(( item, index ) => (
					<img style={{ "opacity" : "0" } as React.CSSProperties} key={index} src={item} alt="" className="mb-4 rounded-lg w-full" />
				))}
			</div>
        </section>
    )
}