import { animate, stagger } from "animejs"
import { useEffect, useRef } from "react"

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

    useEffect(() => {
        if (!cardRef.current) return

        animate(cardRef.current.children, {
            opacity : ["0", "1"],
            y : ["-100%", "0"],
            duration : 800,
            delay : stagger(100)
        })
    }, [])

    return (
        <section className="p-8">
			<div ref={cardRef} className="columns-1 sm:columns-2 md:columns-3 lg:columns-4">
				{images(["Zyl"]).map(( item, index ) => (
					<img style={{ "opacity" : "0" } as React.CSSProperties} key={index} src={item} alt="" className="mb-4 rounded-lg w-full" />
				))}
			</div>
        </section>
    )
}