import { useEffect, useState } from "react";

export default function UseVisibilityChange() {
	const [isVisible, setIsVisible] = useState<boolean>(false)

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

	return isVisible
}