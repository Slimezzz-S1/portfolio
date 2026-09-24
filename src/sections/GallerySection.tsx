import useClientVisibility from "@/hooks/useClientVisibility"
import { animate, stagger } from "animejs"
import { useEffect, useRef, useState } from "react"

export function images( folderName : string | string[]) {
    const modules : Record<string, unknown> = import.meta.glob(
        "../assets/images/Gallery/**",
        {
            eager : true,
            query : "?url",
            import : "default"
        }
    )

    const getImages = (folderName : string) => {
        const images : string[] = []

        for (const module in modules) {
            if (module.includes(folderName)) {
                images.push(modules[module] as string)
            }
        }

        return images
    }

	if (typeof folderName === "object") {
		const images : string[] = []

		folderName.forEach((name) => {
			images.push(...getImages(name))
		})

		return images
	}

    return getImages(folderName)
}

export default function GallerySection() {
    const cardRef = useRef< HTMLDivElement | null >( null )
    const isVisible = useClientVisibility(cardRef, { threshold : 0.3 })
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
            <h1 className="py-4 mb-4 text-7xl font-black border-b border-dashed">
                Gallery    
            </h1>

			<div ref={cardRef} className="columns-1 sm:columns-2 md:columns-3 lg:columns-4">
				{images(["Zyl"]).map(( item, index ) => (
					<img style={{ "opacity" : "0" } as React.CSSProperties} key={index} src={item} alt="" className="mb-4 rounded-lg w-full" />
				))}
			</div>
        </section>
    )
}