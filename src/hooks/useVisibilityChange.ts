import { useEffect, useState } from "react";

export default function useVisibilityChange() {
	const [isVisible, setIsVisible] = useState<boolean>(
		document.visibilityState === "visible"
	)

	useEffect(() => {
		const handleVisibilityChange = () => {
			setIsVisible(document.visibilityState === "visible")
		}

		document.addEventListener("visibilitychange", handleVisibilityChange)

		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange)

			return
		}
	}, [])

	// console.log(isVisible)

	return isVisible
}