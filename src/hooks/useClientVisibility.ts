import { type RefObject } from "react"

import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import useVisibility from "@/hooks/useVisibilityChange"

export default function useClientVisibility(ref : RefObject<Element | null>, options? : IntersectionObserverInit) {
	const isVisible = useVisibility()
	const isIntersecting = useIntersectionObserver(ref, options)

	return isIntersecting && isVisible
}