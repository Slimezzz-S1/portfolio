export default function getImages(folderName : string | string[]) {
    const modules : Record<string, unknown> = import.meta.glob(
        "/src/assets/gallery/**",
        {
            eager : true,
            query : "?url",
            import : "default"
        }
    )

    const getImagesFromFolder = (folderName : string) => {
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
            images.push(...getImagesFromFolder(name))
        })

        return images
    }

    return getImagesFromFolder(folderName)
}