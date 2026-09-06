import { useState } from "react"

interface appBurgerProps {
    onClick? : () => void
    onToggled? : (isClicked : boolean) => void
}

export default function AppBurger({ onClick, onToggled } : appBurgerProps) {
    const [isToggled, setIsToggled] = useState<boolean>(false)

    const handleOnClick = () => {
        setIsToggled(!isToggled)
        
        onClick?.()

        onToggled?.(isToggled)
    }

    return (
        <div style={{"--rotation" : isToggled ? "90deg" : "0deg"} as React.CSSProperties} className="flex flex-col justify-around w-12 px-1 aspect-square group h-12 transition-transform rotate-(--rotation)" onClick={handleOnClick}>
            {Array.from({ length : 3 }).map((_, index) => (
                <div style={{"--y" : index == 0 ? "-100%" : index == 2 ? "100%" : "0"} as React.CSSProperties} key={index} className="p-0.5 bg-root-fg rounded-2xl transition-transform group-hover:translate-y-(--y)" />
            ))}
        </div>
    )
}