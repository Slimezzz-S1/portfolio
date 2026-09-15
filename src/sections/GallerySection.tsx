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
    return (
        <section className="px-8">
			<div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4">
				{images(["Zyl", "Test"]).map(( item, index ) => (
					<img key={index} src={item} alt="" className="mb-4 rounded-lg w-full" />
				))}
			</div>
        </section>
    )
}