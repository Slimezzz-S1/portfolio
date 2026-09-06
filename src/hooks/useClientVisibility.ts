import type { RefObject } from "react"

import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import UseVisibility from "@/hooks/useVisibilityChange"

export default function useClientVisibility(ref : RefObject<Element | null>, options : {threshold : number} = {threshold : 0}) {
    const visibility = UseVisibility()    
    const intersectionObserver = useIntersectionObserver(ref, options)

    return visibility && intersectionObserver
}